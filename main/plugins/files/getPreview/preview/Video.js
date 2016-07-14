import React from 'react';
import styles from './styles.css'

export default ({ path }) => (
  <video src={path} className={styles.previewVideo} controls='true' />
)
