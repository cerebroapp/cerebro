import React, { PropTypes, Component } from 'react';

import bytesToSize from 'lib/helpers/bytesToSize';
import du from 'du';
import fs from 'fs';
import styles from './styles.css';

export default class FileDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      size: null,
    };
  }
  componentDidMount() {
    const { path } = this.props;
    du(path, (_, size) => this.setState({ size } ));
    fs.stat(path, (_, details) => { this.setState({ details }); })

  }
  render() {
    const { details, size } = this.state
    const { ctime, mtime, atime } = details;
    return (
      <dl className={styles.fileDetails}>
        <dt>Last opened:</dt>
        <dd>{atime && atime.toLocaleString()}</dd>
        <dt>Modified:</dt>
        <dd>{mtime && mtime.toLocaleString()}</dd>
        <dt>Created:</dt>
        <dd>{ctime && ctime.toLocaleString()}</dd>
        <dt>Size:</dt>
        <dd>{size && bytesToSize(size)}</dd>
      </dl>
    );
  }
}
