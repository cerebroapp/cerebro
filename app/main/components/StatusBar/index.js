import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'

function StatusBar({ value }) {
  return <div className={styles.statusBar}>{value}</div>
}

StatusBar.propTypes = {
  value: PropTypes.string
}

export default StatusBar
