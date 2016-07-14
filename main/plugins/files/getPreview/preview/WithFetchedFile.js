import React, { Component } from 'react';
import Loading from 'main/components/Loading';
import fs from 'fs';

export default class WithFetchedFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loaded: false
    }
  }
  componentDidMount() {
    const { path, options } = this.props;
    fs.readFile(path, options || 'utf8', (err, source) => {
      if (err) {
        this.setState({ error: true });
      } else {
        this.setState({
          loaded: true,
          source
        });
      }
    })
  }
  render() {
    const { loaded, error, source } = this.state;
    if (error) return <div>Error fetching file</div>;
    if (!loaded) return <Loading />;
    return this.props.children(source);
  }
}
