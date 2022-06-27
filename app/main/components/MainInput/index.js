import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

class MainInput extends Component {
  focus() {
    this.refs.input.focus()
  }
  render() {
    return (
      <input
        placeholder="Cerebro Search"
        type="text"
        id="main-input"
        ref="input"
        value={this.props.value}
        className={styles.input}
        onChange={e => this.props.onChange(e.target.value)}
        onKeyDown={this.props.onKeyDown}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
      />
    )
  }
}

MainInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

export default MainInput
