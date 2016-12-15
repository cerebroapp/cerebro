import React, { PropTypes } from 'react'
import styles from './styles.css'

/**
 * Render list of user properties of one type, i.e. phones or emails
 *
 * @param  {Array} options.list List of properties
 * @param  {Function} options.rowRenderer Renderer function for list element
 * @return {Component}
 */
const Block = ({ list, rowRenderer }) => {
  if (!list.length) return null
  return (
    <div className={styles.block}>
      {list.map(rowRenderer)}
    </div>
  )
}

Block.propTypes = {
  list: PropTypes.array.isRequired,
  rowRenderer: PropTypes.func.isRequired
}

export default Block
