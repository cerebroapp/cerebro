import React from 'react'
import styles from './styles.module.css'

interface StatusBarProps {
  value?: string
}
function StatusBar({ value }: StatusBarProps) {
  return <div className={styles.statusBar}>{value}</div>
}

export default StatusBar
