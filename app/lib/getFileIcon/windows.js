import extractIcon from 'win-icon-extractor';

/**
 * Get system icon for file
 *
 * @param  {String} path File path
 * @param  {Number} options.width
 * @param  {[type]} options.height
 * @return {Promise<String>} Promise resolves base64-encoded source of icon
 */
export default function getFileIcon(path, { width = 128, height = 128 } = {}) {
	return new Promise((resolve, reject) => {
		var icon = null;
		try {
			icon = extractIcon(path);
		} catch(e) {
			reject(e);
		}

		if (icon != null) {
			resolve(icon);
		}
	});
}