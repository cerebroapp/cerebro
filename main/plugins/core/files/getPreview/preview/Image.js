import React from 'react';
import FileDetails from 'main/components/FileDetails';
import styles from './styles.css';

export default ({ path }) => (
  <div className={styles.previewImage}>
    <img src={path} />
    <FileDetails path={path} />
  </div>
)
