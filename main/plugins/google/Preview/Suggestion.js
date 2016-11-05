import React from 'react';
import search from '../search';
import styles from './styles.css';

export default ({query}) => {
  const onClick = () => search(query);
  const onKeyDown = ({keyCode}) => {
    if (keyCode === 13) {
      search(query);
    }
  }
  return (
    <li
      tabIndex={0}
      className={styles.item}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {query}
    </li>
  )
}
