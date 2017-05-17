import React, { PropTypes } from 'react'
import { Preload } from 'cerebro-ui'
import { getFileIcon } from 'lib/rpc/functions'
import { memoize } from 'cerebro-tools'

/**
 * Render icon for provided path.
 * It will render the same icon, that you see in Finder
 *
 * @param  {String} options.className
 * @param  {String} options.path
 * @return {Function}
 */
const FileIcon = ({ className, path }) => (
  <Preload promise={getFileIcon(path)} key={path}>
    {(src) => <img src={src} alt="" className={className} />}
  </Preload>
)

FileIcon.propTypes = {
  className: PropTypes.string,
  path: PropTypes.string.isRequired
}

export default memoize(FileIcon)
