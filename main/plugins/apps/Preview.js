import React, { PropTypes, Component } from 'react';
import NativeIcon from '../../components/NativeIcon';
import bytesToSize from 'lib/helpers/bytesToSize';
import styles from './styles.css';

export default class Preview extends Component {
  static propTypes = {
    path: PropTypes.string,
    name: PropTypes.string,
    details: PropTypes.shape({
      size: PropTypes.number,
    })
  }
  constructor(props) {
    super(props);
  }
  render() {
    const { path, details, name } = this.props;
    const { size, ctime, mtime, atime } = details;
    // TODO: alignment in details
    return (
      <div>
        <div className={styles.previewIcon}>
          <NativeIcon path={path} />
        </div>
        <div className={styles.previewName}>{name}</div>
        <dl className={styles.previewDetails}>
          <dt>Size:</dt>
          <dd>{bytesToSize(size)}</dd>
          <dt>Last opened:</dt>
          <dd>{atime.toLocaleString()}</dd>
          <dt>Modified:</dt>
          <dd>{mtime.toLocaleString()}</dd>
          <dt>Created:</dt>
          <dd>{ctime.toLocaleString()}</dd>
        </dl>
      </div>
    )
  }
}
