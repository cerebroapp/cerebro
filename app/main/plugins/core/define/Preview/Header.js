import React, { PropTypes } from 'react'
import styles from './styles.css'


const Header = ({ header }) => {
  const { word, transcription, rest } = header
  return (
    <div className={styles.header}>
      <span className={styles.word}>{word}</span>
      {transcription && <span className={styles.transcription}>|{transcription}|</span>}
      {rest && <span className={styles.headerRest}>{rest}</span>}
    </div>
  )
}

Header.propTypes = {
  header: PropTypes.shape({
    word: PropTypes.string,
    transcription: PropTypes.string,
    rest: PropTypes.string,
  }).isRequired
}


export default Header
