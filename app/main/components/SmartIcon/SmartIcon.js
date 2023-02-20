import React, { memo } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import getFileIcon from './getFileIcon'

/**
 * Check if provided string is an image src
 * It can be a path to png/jpg/svg image or data-uri
 *
 * @param  {String} path
 * @return {Boolean}
 */
const isImage = (path) => !!path.match(/(^data:)|(\.(png|jpe?g|svg|ico)$)/)

/**
  * Check if provided string matches a FontAwesome icon
  */
const isFontAwesome = (path) => path.match(/^fa-(.+)$/)

/**
 * Render icon for provided path.
 * It will render the same icon, that you see in Finder
 *
 * @param  {String} options.className
 * @param  {String} options.path
 * @return {Function}
 */
function FileIcon({ className, path }) {
  const src = getFileIcon(path)

  return src ? <img src={src} alt="" className={className} /> : null
}

FileIcon.propTypes = {
  className: PropTypes.string,
  path: PropTypes.string.isRequired
}

/**
 * This component renders:
 *   – if `options.path` is an image this image will be rendered. Supported formats are:
 *     png, jpg, svg and icns
 *   - otherwise it will render icon for provided path, that you can see in Finder
 * @param  {String} options.className
 * @param  {String} options.path
 * @return {Function}
 */
function SmartIcon({ className, path }) {
  const fontAwesomeMatches = isFontAwesome(path)
  if (fontAwesomeMatches) {
    return (
      <FontAwesome
        name={fontAwesomeMatches[1]}
        size="2x"
        className={className}
      />
    )
  }

  return (
    isImage(path)
      ? <img src={path} alt={path} className={className} />
      : <FileIcon path={path} className={className} />
  )
}

SmartIcon.propTypes = {
  path: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default memo(SmartIcon)
