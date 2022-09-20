import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'

function MainInput({
  value, onChange, onBlur, onFocus, onKeyDown
}) {
  return (
    <div>
      <input
        placeholder="Cerebro Search"
        type="text"
        id="main-input"
        ref="input"
        value={value}
        className={styles.input}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  )
}

MainInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

export default MainInput
