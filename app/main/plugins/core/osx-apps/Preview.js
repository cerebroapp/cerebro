import React, { PropTypes } from 'react'
import { FileIcon } from 'cerebro-ui'
import FileDetails from 'main/components/FileDetails'
import styles from './styles.css'

const Preview = ({ path, name }) => (
  <div>
    <div className={styles.previewIcon}>
      <FileIcon path={path} />
    </div>
    <div className={styles.previewName}>{name}</div>
    <FileDetails path={path} key={path} skipName />
  </div>
)

Preview.propTypes = {
  path: PropTypes.string,
  name: PropTypes.string,
}

export default Preview
