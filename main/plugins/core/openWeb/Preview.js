import React, { Component } from 'react';
import Loading from 'main/components/Loading';
import parseMeta from './parseMeta';
import styles from './styles.css'

export default class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      meta: {},
    }
  }
  componentDidMount() {
    this.updateMeta(this.props.url)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ loaded: false });
    this.updateMeta(nextProps.url)
  }
  updateMeta(url) {
    parseMeta(url).then(meta => {
      this.setState({
        meta,
        loaded: true,
      })
    })
  }
  renderMeta() {
    const { meta } = this.state;
    return (
      <div className={styles.meta}>
        {meta.image &&
          <div className={styles.imageWrapper}>
            <img src={meta.image} className={styles.image}/>
          </div>
        }
        <div className={styles.details}>
          {meta.title && <div className={styles.title}>{meta.title}</div> }
          {meta.description && <p className={styles.description}>{meta.description}</p>}
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className={styles.preview}>
        <div className={styles.explanation}><span className={styles.return}>↩</span> to open URL in default browser</div>
        {this.state.loaded ? this.renderMeta() : <Loading />}
      </div>
    );
  }
}
