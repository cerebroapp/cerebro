import React, { Component } from 'react';
import listArchive from 'lib/listArchive';
import NativeIcon from 'main/components/NativeIcon';
import FileDetails from 'main/components/FileDetails';
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
    const type = this.props.path.match(/\.(\w+)$/)[1];
    const icon = `/System/Library/CoreServices/Applications/Archive Utility.app/Contents/Resources/bah-${type}.icns`;
    console.log(icon);
    return (
      <div className={styles.previewArchive}>
        <div className={styles.previewIcon}>
          <NativeIcon path={icon} />
        </div>
        <div className={styles.filesListText}>Files:</div>
        <ul key={path}>{this.renderList()}</ul>
        <FileDetails path={path} />
      </div>)
  }
}
