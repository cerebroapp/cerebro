import React from 'react'
import styles from './styles/index.css'

const Audio = ({ path }) => (
  <audio src={path} className={styles.previewAudio} controls="true" />
)

Audio.propTypes = {
  path: React.PropTypes.string.isRequired,
}

export default Audio
