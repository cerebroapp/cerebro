import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SmartIcon } from '@cerebroapp/cerebro-ui'
import styles from './styles.css'

class Row extends Component {
  classNames() {
    return [
      styles.row,
      this.props.selected ? styles.selected : null
    ].join(' ')
  }

  renderIcon() {
    const { icon } = this.props
    if (!icon) return null
    return <SmartIcon path={icon} className={styles.icon} />
  }

  render() {
    const {
      title,
      onSelect,
      onMouseMove,
      subtitle
    } = this.props

    return (
      <div className={this.classNames()} onClick={onSelect} onMouseMove={onMouseMove}>
        {this.renderIcon()}
        <div className={styles.details}>
          {title && (
          <div className={styles.title}>
            {' '}
            {title}
            {' '}
          </div>
          )}
          {subtitle && (
          <div className={styles.subtitle}>
            {' '}
            {subtitle}
            {' '}
          </div>
          )}
        </div>
      </div>
    )
  }
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
