import React from 'react'
import Preview from './Preview'
import { memoize, search } from 'cerebro-tools'
import orderBy from 'lodash/orderBy'
import getAppsList from './lib/getAppsList'
import getAbbr from 'lib/getAbbr'
import fs from 'fs'

/**
 * Directories to watch.
 * Updates in these directories lead to force recache of apps
 * @type {Array}
 */
const WATCH_DIRECTORIES = [
  '/Applications/',
]

/**
 * Options for WATCH_DIRECTORIES fs.watch
 * @type {Object}
 */
const WATCH_OPTIONS = {
  recursive: true
}

/**
 * Time for apps list cache
 * @type {Integer}
 */
const CACHE_TIME = 30 * 60 * 1000

/**
 * Cache getAppsList function
 * @type {Function}
 */
const cachedAppsList = memoize(getAppsList, {
  length: false,
  promise: 'then',
  maxAge: CACHE_TIME,
  preFetch: true
})

const toString = (app) => (
  `${app.name} ${app.filename.replace(/\.app$/, '')} ${getAbbr(app.name)}`
)

export const fn = ({ term, actions, display }) => {
  cachedAppsList().then(items => {
    const result = orderBy(
      search(items, term, toString),
      [
        ({ useCount }) => useCount ? parseInt(useCount, 10) : 0,
        ({ lastUsed = '0000' }) => lastUsed,
      ],
      ['desc', 'desc']
    ).map(file => {
      const { path, name } = file
      return {
        id: path,
        title: name,
        term: name,
        icon: path,
        subtitle: path,
        clipboard: path,
        onKeyDown: (event) => {
          if ((event.metaKey || event.ctrlKey) && event.keyCode === 82) {
            // Show application in Finder by cmd+R shortcut
            actions.reveal(path)
            event.preventDefault()
          }
        },
        onSelect: () => actions.open(`file://${path}`),
        getPreview: () => <Preview name={name} path={path} />
      }
    })
    display(result)
  })
}

export const initialize = () => {
  // Cache apps cache and force cache reloading in background
  const recache = () => {
    cachedAppsList.clear()
    cachedAppsList()
  }
  // Force recache before expiration
  setInterval(recache, CACHE_TIME * 0.95)
  recache()

  // recache apps when apps directories changed
  WATCH_DIRECTORIES.forEach(dir => {
    fs.watch(dir, WATCH_OPTIONS, recache)
  })
}
