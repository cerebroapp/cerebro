import React from 'react'
import FileDetails from 'main/components/FileDetails'
import styles from './styles.css'

const Image = ({ path }) => (
  <div className={styles.previewImage}>
    <img src={path} alt={path} />
    <FileDetails path={path} />
  </div>
)

Image.propTypes = {
  path: React.PropTypes.string.isRequired
}

export default Image
