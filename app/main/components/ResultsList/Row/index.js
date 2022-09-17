import React from 'react'
import PropTypes from 'prop-types'
import { SmartIcon } from '@cerebroapp/cerebro-ui'
import styles from './styles.module.css'

function Row({
  selected, icon, title, onSelect, onMouseMove, subtitle
}) {
  const classNames = [styles.row, selected ? styles.selected : null].join(' ')

  return (
    <div className={classNames} onClick={onSelect} onMouseMove={onMouseMove}>
      {icon && <SmartIcon path={icon} className={styles.icon} />}

      <div className={styles.details}>
        {title && <div className={styles.title}>{title}</div>}

        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      </div>
    </div>
  )
}

Row.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  selected: PropTypes.bool,
  subtitle: PropTypes.string,
  onSelect: PropTypes.func,
  onMouseMove: PropTypes.func,
}

export default Row
