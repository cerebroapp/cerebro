import React from 'react';
import styles from './styles.css';

export default ({title, onSelect, selected, subtitle}) => {
  const classNames = [
    styles.lineResponse,
    selected ? styles.selected : null
  ].join(' ');
  return (
    <div className={classNames} onClick={onSelect}>
      <h2>{title}</h2>
      <span className={styles.subtitle}>{subtitle}</span>
    </div>
  )
}
