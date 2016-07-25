import React, { Component, PropTypes } from 'react';
import Loading from 'main/components/Loading';
import shellCommand from 'lib/shellCommand';
import getSuggestions from '../getSuggestions';
import search from '../search';
import styles from './styles.css';
import icon from '../icon.png';

export default class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      suggestions: [],
    }
  }
  componentDidMount() {
    getSuggestions(this.props.query).then(suggestions => {
      this.setState({
        suggestions,
        loading: false,
      });
    });
  }
  renderSuggestion(query) {
    return <li className={styles.item} onClick={() => search(query)}>{query}</li>
  }
  render() {
    const { loading, suggestions } = this.state;
    if (this.state.loading) return <Loading />
    return (
      <div className={styles.wrapper}>
        <ul className={styles.list}>
          { suggestions.map(s => this.renderSuggestion(s))}
        </ul>
      </div>
    );
  }
}
