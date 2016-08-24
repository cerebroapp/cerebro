import React from 'react';
import styles from './styles.css';

/**
 * Render label and value for some user property
 *
 * @param  {String} options.label
 * @param  {String} options.content
 * @return {Component}
 */
export default ({label, content}) => (
  <div className={styles.row}>
    <div className={styles.label}>{label}</div>
    <div className={styles.value}>{content}</div>
  </div>
)
