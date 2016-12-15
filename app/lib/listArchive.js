import { shellCommand } from 'cerebro-tools'

/**
 * Fast and simple archive reader. Show only first-level files and directories in archive.
 * Supports zip, tar and tar.gz archives
 *
 * @param  {String} path Archive full path
 * @return {Promise}
 */
export default function (path) {
  let cmd
  if (path.match(/\.(tar|tar.gz|tgz)?$/i)) {
    cmd = `tar tzf ${path} | awk -F/ '{ if($NF != "") print $NF }'`
  } else if (path.match(/\.zip$/i)) {
    cmd = `zipinfo -1 ${path} | grep -v "/."`
  }
  if (!cmd) {
    return Promise.reject()
  }
  return shellCommand(cmd).then(output => output.trim().split('\n'))
}
