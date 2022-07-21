import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

const StatusBar = ({ value }) => (
  <div className={styles.statusBar}>{value}</div>
)

StatusBar.propTypes = {
  value: PropTypes.string
}

export default StatusBar
