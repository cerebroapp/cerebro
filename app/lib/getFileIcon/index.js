const getFileIcon = process.platform === 'darwin' ? require('./mac') : null
export default getFileIcon
