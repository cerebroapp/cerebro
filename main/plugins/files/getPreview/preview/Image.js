import React from 'react';
import styles from './styles.css';

export default ({ path }) => (
  <img src={path} className={styles.previewImage}/>
)
