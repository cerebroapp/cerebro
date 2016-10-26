import React, { PropTypes, Component } from 'react';

import bytesToSize from 'lib/helpers/bytesToSize';
import styles from './styles.css';

import { getFileSize, getFileDetails } from 'lib/rpc/functions';

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
    getFileSize(path).then(size => this.setState({ size }));
    getFileDetails(path).then(details => this.setState({ details }));
  }
  render() {
    const { path, skipSize } = this.props;
    const { details, size } = this.state
    const { ctime, mtime, atime } = details;
    const name = path.match(/.*\/([^\/]+)$/i)[1];
    return (
      <div className={styles.fileDetails}>
        <h3 className={styles.fileName}>{name}</h3>
        <dl>
          <dt>Last opened:</dt>
          <dd>{atime && new Date(atime).toLocaleString()}</dd>
          <dt>Modified:</dt>
          <dd>{mtime && new Date(mtime).toLocaleString()}</dd>
          <dt>Created:</dt>
          <dd>{ctime && new Date(ctime).toLocaleString()}</dd>
          {!skipSize && <dt>Size:</dt>}
          {!skipSize && <dd>{size && bytesToSize(size)}</dd>}
        </dl>
      </div>
    );
  }
}
