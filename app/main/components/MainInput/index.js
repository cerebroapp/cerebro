import React, { Component, PropTypes } from 'react'
import styles from './styles.css'

export default class MainInput extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  }
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
        onChange={(e) => this.props.onChange(e.target.value)}
        onKeyDown={this.props.onKeyDown}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
      />
    )
  }
}
