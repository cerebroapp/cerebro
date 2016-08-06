import React, { Component } from 'react';

import WithFetchedFile from './WithFetchedFile';
import Highlight from 'react-highlight';
import styles from './styles.css';

export default ({path}) => {
  const language = path.match(/\.(.+)$/)[1];
  return (
    <WithFetchedFile path={path}>
      {
        (source) => (
          <div className={styles.previewCode}>
            <Highlight className={language}>
              {source}
            </Highlight>
          </div>
        )
      }
    </WithFetchedFile>
  )
};
