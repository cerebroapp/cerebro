import React, { Component } from 'react';

import WithFetchedFile from './WithFetchedFile';
import ReactMarkdown from 'react-markdown';
import styles from './styles.css';

export default ({path}) => (
  <WithFetchedFile path={path} key={path}>
    { (source) => <ReactMarkdown source={source} className={styles.previewText}/> }
  </WithFetchedFile>
)
