import React from 'react';
import styles from './styles.css'

export default ({path}) => (
  <audio src={path} className={styles.previewAudio} controls='true' />
)
