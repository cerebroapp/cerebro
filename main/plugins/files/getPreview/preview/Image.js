import React from 'react';
import FileDetails from '../../../../components/FileDetails';
import styles from './styles.css';

export default ({ path }) => (
  <div className={styles.previewImage}>
    <img src={path} />
    <FileDetails path={path} />
  </div>
)
