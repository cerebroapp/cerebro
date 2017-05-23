import flatten from 'lodash/flatten'
import { spawn } from 'child_process'
import path from 'path'
import { map, split, through } from 'event-stream'

const REAL_KEYS = {
  kMDItemDisplayName: 'name',
  kMDItemLastUsedDate: 'lastUsed',
  kMDItemUseCount: 'useCount'
}

/**
 * Parse mdfind result line to JS object
 *
 * @param  {String} line
 * @return {Object}
 */
function parseLine(line) {
  const attrs = line.split('   ')
  // First attr is always full path to the item
  const filePath = attrs.shift()
  const result = {
    path: filePath,
    filename: path.basename(filePath).replace(/\.app$/, '')
  }
  attrs.forEach(attr => {
    const [key, value] = attr.split(' = ')
    result[REAL_KEYS[key] || key] = getValue(value)
  })
  this.emit('data', result)
}

const getValue = (item) => {
  if (!item || item === '(null)') {
    return null
  } else if (item.startsWith('(\n    "') && item.endsWith('"\n)')) {
    const actual = item.slice(7, -3)
    const lines = actual.split('",\n    "')
    return lines
  }
  return item
}

const filterEmpty = (data, done) => {
  if (data === '') {
    done()
  } else {
    done(null, data)
  }
}

const makeArgs = (array, argName) => (
  flatten(array.map(item => [argName, item]))
)

export default function mdfind({
  query,
  attributes = Object.keys(REAL_KEYS),
  names = [],
  directories = [],
  live = false,
  interpret = false,
  limit
} = {}) {
  const dirArgs = makeArgs(directories, '-onlyin')
  const nameArgs = makeArgs(names, '-name')
  const attrArgs = makeArgs(attributes, '-attr')
  const interpretArgs = interpret ? ['-interpret'] : []
  const queryArgs = query ? [query] : []

  const args = ['-0'].concat(
    dirArgs,
    nameArgs,
    attrArgs,
    interpretArgs,
    live ? ['-live', '-reprint'] : [],
    queryArgs
  )

  const child = spawn('mdfind', args)

  let times = 0

  return {
    output: child.stdout
      .pipe(split('\0'))
      .pipe(map(filterEmpty))
      // eslint-disable-next-line func-names
      .pipe(through(function (data) {
        times += 1
        if (limit && times === limit) child.kill()
        if (limit && times > limit) return
        this.queue(data)
      }))
      .pipe(through(parseLine)),
    terminate: () => child.kill()
  }
}
