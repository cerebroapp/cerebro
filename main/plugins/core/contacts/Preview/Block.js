import React from 'react';
import styles from './styles.css';

/**
 * Render list of user properties of one type, i.e. phones or emails
 *
 * @param  {Array} options.list List of properties
 * @param  {Function} options.rowRenderer Renderer function for list element
 * @return {Component}
 */
export default ({list, rowRenderer}) => {
  if (!list.length) return null;
  return (
    <div className={styles.block}>
      { list.map(rowRenderer) }
    </div>
  );
}
