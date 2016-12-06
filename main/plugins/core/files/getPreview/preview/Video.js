import React from 'react'

import FileDetails from 'main/components/FileDetails'
import styles from './styles.css'

const Video = ({ path }) => (
  <div className={styles.previewVideo}>
    <video src={path} controls="true" />
    <FileDetails path={path} />
  </div>
)

Video.propTypes = {
  path: React.PropTypes.string.isRequired
}

export default Video
