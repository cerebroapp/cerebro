import React, { Component, PropTypes } from 'react';
import styles from './styles.css';

export default class MainInput extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
  }
  focus() {
    this.refs.input.focus();
  }
  render() {
    return (
      <input
        placeholder="Search..."
        type="text"
        ref="input"
        value={this.props.value}
        className={styles.input}
        onChange={(e) => this.props.onChange(e.target.value)}
      />
    );
  }
}
