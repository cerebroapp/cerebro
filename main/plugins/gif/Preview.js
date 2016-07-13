import React, { PropTypes, Component } from 'react';
import Loading from 'main/components/Loading';
import styles from './styles.css';
import { bind } from 'lodash-decorators';
import bytesToSize from 'lib/helpers/bytesToSize';

export default class Preview extends Component {
  static propTypes = {
    images: PropTypes.array,
    id: PropTypes.string,
  }
  render() {
    const { images, id } = this.props;
    const { url } = images.downsized;
    const { width, height, size } = images.original;
    return (
      <div key={id}>
        <img src={url} className={styles.preview} />
        {<div className={styles.details}>{width}x{height}px, {bytesToSize(size)}</div>}
      </div>
    )
  }
}
