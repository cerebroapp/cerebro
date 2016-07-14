import React from 'react';
import FileDetails from '../../../../components/FileDetails';
import styles from './styles.css';

export default ({ path }) => (
  <div>
    <img src={path} className={styles.previewImage}/>
    <FileDetails path={path} />
  </div>
)
