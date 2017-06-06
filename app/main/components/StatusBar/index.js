import React from 'react'
import styles from './styles.css'

const StatusBar = ({ value }) => (
  <div className={styles.statusBar}>{value}</div>
)

StatusBar.propTypes = {
  value: React.PropTypes.string
}

export default StatusBar
