import React, { Component, PropTypes } from 'react';
import styles from './styles.css';

export default class MainInput extends Component {
  render() {
    return (
      <input
        placeholder="Search..."
        type="text"
        autofocus="true"
        value = {this.props.value}
        className={styles.input}
        onKeyDown={this.props.onKeyDown}
        onChange={(e) => this.props.onChange(e.target.value)}
      />
    );
  }
}
