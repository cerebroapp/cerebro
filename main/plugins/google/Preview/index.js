import React, { Component, PropTypes } from 'react';
import Loading from 'main/components/Loading';
import Preload from 'main/components/Preload';
import shellCommand from 'lib/shellCommand';
import getSuggestions from '../getSuggestions';
import search from '../search';
import styles from './styles.css';
import icon from '../icon.png';

export default ({query}) => {
  const renderSuggestion = (query) => {
    return <li className={styles.item} onClick={() => search(query)}>{query}</li>
  }
  const renderer = (suggestions) => {
    return (
      <div className={styles.wrapper}>
        <ul className={styles.list}>
          { suggestions.map(s => renderSuggestion(s))}
        </ul>
      </div>
    );
  }
  return (
    <Preload promise={getSuggestions(query)} loader={<Loading />}>
      { renderer }
    </Preload>
  );
}
