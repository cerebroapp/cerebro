import React from 'react';

import FileDetails from '../../../../components/FileDetails';
import styles from './styles.css'

export default ({ path }) => (
  <div className={styles.previewVideo}>
    <video src={path} controls='true' />
    <FileDetails path={path} />
  </div>
)
