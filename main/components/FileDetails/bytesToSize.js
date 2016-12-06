const sizes = ['B', 'KB', 'MB', 'GB', 'TB']

/**
 * Convert bytes to human readable string
 * @param  {Integer} bytes
 * @return {String}
 */
export default function bytesToSize(bytes) {
  if (bytes === 0) return '0B'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  return [
    Math.round(bytes / Math.pow(1024, i), 2),
    sizes[i]
  ].join(' ')
}
