import React, { Component } from 'react';
import styles from './styles.css';

/**
 * Render label and value for some user property
 *
 * @param  {String} options.label
 * @param  {String} options.content
 * @return {Component}
 */
export default class Row extends Component {
  onKeyDown(event) {
    const {metaKey, ctrlKey, keyCode} = event;
    if ((metaKey || ctrlKey) && keyCode === 67) {
      // Copy value to clipboard by cmd/ctrl+c
      this.props.copyToClipboard(this.props.content)
      event.preventDefault();
    }
  }
  render() {
    const { label, content } = this.props;
    return (
      <div className={styles.row} tabIndex={0} onKeyDown={this.onKeyDown.bind(this)}>
        <div className={styles.label}>{label}</div>
        <div className={styles.value}>{content}</div>
      </div>
    )
  }
}
