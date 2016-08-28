import React from 'react';
import styles from './styles.css';

export default ({rating}) => {
  const width = `${rating / 10 * 100}%`;
  return (
    <div className={styles.ratingStars}>
      <div className={styles.ratingStarsInner} style={{width}}/>
    </div>
  );
}
