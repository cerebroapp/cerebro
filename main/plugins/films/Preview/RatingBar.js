import React from 'react';
import styles from './styles.css';

export default ({percentage}) => {
  const width = `${percentage}%`;
  return (
    <div className={styles.ratingBar}>
      <div className={styles.ratingBarInner} style={{width}} />
      <div className={styles.ratingBarValue}>{percentage}%</div>
    </div>
  );
}
