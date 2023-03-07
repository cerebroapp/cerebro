import React from 'react'
import SmartIcon from '../../SmartIcon'
import styles from './styles.module.css'

interface RowProps {
  style?: any
  title?: string
  icon?: string
  selected?: boolean
  subtitle?: string
  onSelect?: () => void
  onMouseMove?: () => void
}

function Row({
  selected, icon, title, onSelect, onMouseMove, subtitle, style
}: RowProps) {
  const classNames = [styles.row, selected ? styles.selected : null].join(' ')

  return (
    <div
      style={style}
      className={classNames}
      onClick={onSelect}
      onMouseMove={onMouseMove}
      onKeyDown={() => {}}
    >
      {icon && <SmartIcon path={icon} className={styles.icon} />}

      <div className={styles.details}>
        {title && <div className={styles.title}>{title}</div>}

        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      </div>
    </div>
  )
}

export default Row
