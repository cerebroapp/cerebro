const empty = () => Promise.reject()

/* eslint-disable global-require */
/* eslint-disable import/no-mutable-exports */

let getFileIcon = empty

if (process.platform === 'darwin') {
  getFileIcon = require('./mac')
}

if (process.platform === 'win32') {
  getFileIcon = require('./windows')
}

export default getFileIcon

/* eslint-enable global-require */
/* eslint-disable import/no-mutable-exports */
