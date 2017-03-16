import React, { PropTypes } from 'react'
import FileDetails from 'main/components/FileDetails'
import styles from './styles.css'

const Preview = ({ path, name, icon }) => (
  <div>
    {icon &&
      <div className={styles.previewIcon}>
        <img src={icon} alt="" />
      </div>
    }
    <div className={styles.previewName}>{name}</div>
    <FileDetails path={path} key={path} skipName />
  </div>
)

Preview.propTypes = {
  path: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.string
}

export default Preview
