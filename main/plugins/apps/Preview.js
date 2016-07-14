import React, { PropTypes, Component } from 'react';
import NativeIcon from '../../components/NativeIcon';
import FileDetails from '../../components/FileDetails';
import styles from './styles.css';

export default class Preview extends Component {
  static propTypes = {
    path: PropTypes.string,
    name: PropTypes.string,
  }
  render() {
    const { path } = this.props;
    return (
      <div>
        <div className={styles.previewIcon}>
          <NativeIcon path={path} />
        </div>
        <div className={styles.previewName}>{name}</div>
        <FileDetails path={path} />
      </div>
    )
  }
}
