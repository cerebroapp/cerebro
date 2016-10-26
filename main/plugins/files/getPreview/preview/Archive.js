import React, { Component } from 'react';
import listArchive from 'lib/listArchive';
import FileIcon from 'main/components/FileIcon';
import FileDetails from 'main/components/FileDetails';
import Loading from 'main/components/Loading';
import Preload from 'main/components/Preload';
import styles from './styles.css'

export default ({path}) => {
  const renderer = (list, error) => {
    if (error) return <div>Error fetching archive</div>;
    return (
      <div className={styles.previewArchive}>
        <div className={styles.previewIcon}>
          <FileIcon path={path} />
        </div>
        <div className={styles.filesListText}>Files:</div>
        <ul key={path}>{list.map(file => <li>{file}</li>)}</ul>
        <FileDetails path={path} />
      </div>
    );
  }
  return (
    <Preload promise={listArchive(path)} loader={<Loading />}>
      {renderer}
    </Preload>
  );
}
