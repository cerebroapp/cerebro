import React from 'react';

import FileDetails from '../../../../components/FileDetails';
import styles from './styles.css'

export default ({ path }) => (
  <div>
    <video src={path} className={styles.previewVideo} controls='true' />
    <FileDetails path={path} />
  </div>
)
