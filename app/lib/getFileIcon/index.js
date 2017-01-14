const empty = () => Promise.reject()
const getFileIcon = process.platform === 'darwin' ? require('./mac') : empty
export default getFileIcon
