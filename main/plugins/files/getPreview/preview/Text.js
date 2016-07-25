import React, { Component } from 'react';

import WithFetchedFile from './WithFetchedFile';
import styles from './styles.css';

export default ({ path }) => (
  <WithFetchedFile path={path} key={path}>
    { (source) => <pre className={styles.previewText}>{source}</pre> }
  </WithFetchedFile>
)
