import React, { PropTypes } from 'react'
import styles from './styles.css'

const StatusBar = ({ value }) => (
  <div className={styles.statusBar}>{value}</div>
)

StatusBar.propTypes = {
  value: PropTypes.string.isRequired
}

export default StatusBar
