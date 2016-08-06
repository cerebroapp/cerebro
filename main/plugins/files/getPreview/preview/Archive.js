import React, { Component } from 'react';
import listArchive from 'lib/listArchive';
import FileDetails from '../../../../components/FileDetails';
import Loading from 'main/components/Loading';
import styles from './styles.css'

export default class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loaded: false
    }
  }
  componentDidMount() {
    const { path } = this.props;
    listArchive(path).then(list => {
      this.setState({
        loaded: true,
        list
      });
    }).catch(() => {
      this.setState({ error: true });
    });
  }
  renderList() {
    return this.state.list.map(file => <li>{file}</li>);
  }
  render() {
    const { path } = this.props;
    if (this.state.error) return <div>Error fetching archive</div>;
    if (!this.state.loaded) return <Loading />;
    return (
      <div className={styles.previewArchive}>
        <ul key={path}>{this.renderList()}</ul>
        <FileDetails path={path} />
      </div>)
  }
}
