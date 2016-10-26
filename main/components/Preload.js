import React, { Component } from 'react';

/**
 * Component that renders child function only after props.promise is resolved or rejected
 * You can provide props.loader that will be rendered before
 */
export default class Preload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      error: null
    }
  }
  componentDidMount() {
    this.props.promise
      .then(result => this.setState({ result }))
      .catch(error => this.setState({ error }));
  }
  render() {
    const { loader, children } = this.props
    const { result, error } = this.state;
    if (result || error) {
      return children(result, error);
    }
    return loader || null;
  }
}
