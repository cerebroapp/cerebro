import { shell } from 'electron';
import uniq from 'lodash/uniq';

const URL_REGEXP = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

// Cache used urls to autocomplete them
let lastUrls = [];

function matchedUsedUrls(term) {
  return lastUrls.filter(url => url.replace(/^https?:\/\//, '').indexOf(term) === 0);
}

function toResult(url) {
  return {
    title: url,
    id: `url-${url}`,
    subtitle: 'Open url',
    term: url,
    onSelect: () => {
      lastUrls = uniq([url, ...lastUrls]);
      shell.openExternal(url);
    },
  };
}

const openWebPlugin = (term, callback) => {
  const match = term.match(URL_REGEXP);
  if (match) {
    let url = term;
    if (!term.match(/^https?:\/\//)) {
      url = `http://${url}`;
    }
    callback(toResult(url));
  }
  const result = matchedUsedUrls(term).map(toResult);
  callback(result);
};

export default {
  fn: openWebPlugin,
};
