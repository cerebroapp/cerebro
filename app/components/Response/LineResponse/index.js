import React from 'react';
import styles from './styles.css';

export default ({title, onSelect, onMouseOver, selected, subtitle, index}) => {
  const classNames = [
    styles.lineResponse,
    selected ? styles.selected : null
  ].join(' ');
  return (
    <div className={classNames} onClick={onSelect} onMouseOver={onMouseOver}>
      <div className={styles.details}>
        {title && <div className={styles.title}> {title} </div> }
        {subtitle && <div className={styles.subtitle}> {subtitle} </div> }
      </div>
      {index && <div className={styles.keycode}>⌘{index}</div>}
    </div>
  )
}

