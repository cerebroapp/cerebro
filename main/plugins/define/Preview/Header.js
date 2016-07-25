import React from 'react';
import styles from './styles.css';


export default ({ header }) => {
  const { word, transcription, rest } = header;
  console.log(word, transcription, rest);
  return (
    <div className={styles.header}>
      <span className={styles.word}>{word}</span>
      {transcription && <span className={styles.transcription}>|{transcription}|</span>}
      {rest && <span className={styles.headerRest}>{rest}</span>}
    </div>
  )
}
