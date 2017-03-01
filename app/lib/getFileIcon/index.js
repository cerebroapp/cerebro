const empty = () => Promise.reject()
const getFileIcon = process.platform === 'darwin' ? require('./mac') : (
	process.platform === 'win32' ? require('./windows') : empty
)

export default getFileIcon
