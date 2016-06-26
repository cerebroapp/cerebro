import React, { Component, PropTypes } from 'react';
import styles from './styles.css';

export default class MainInput extends Component {
  propTypes = {
    value: PropTypes.string,
    onKeyDown: PropTypes.func,
    onChange: PropTypes.func,
  }
  componentDidMount() {
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
        onKeyDown={this.props.onKeyDown}
        onChange={(e) => this.props.onChange(e.target.value)}
      />
    );
  }
}
