import React, { Component, PropTypes } from 'react';
import Loading from 'main/components/Loading';
import Preload from 'main/components/Preload';
import KeyboardNav from 'main/components/KeyboardNav';
import Suggestion from './Suggestion';
import shellCommand from 'lib/shellCommand';
import getSuggestions from '../getSuggestions';
import styles from './styles.css';
import icon from '../icon.png';

export default class Preview extends Component {
  renderSuggestions(suggestions) {
    return (
      <div className={styles.wrapper}>
        <KeyboardNav>
          <ul className={styles.list}>
            { suggestions.map(s => <Suggestion query={s}/>)}
          </ul>
        </KeyboardNav>
      </div>
    );
  }
  render() {
    const { query } = this.props;
    return (
      <Preload promise={getSuggestions(query)} loader={<Loading />}>
        { (suggestions) => this.renderSuggestions(suggestions) }
      </Preload>
    );
  }
}
