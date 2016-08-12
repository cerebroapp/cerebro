import React from 'react';
import icon from './icon.png';
import translate from './translate';
import toLanguageCode from './toLanguageCode';
import getTargetLanguage from './getTargetLanguage';
import Preview from './Preview';
import { id, order, REGEXP } from './constants.js';

const translatePlugin = (term, callback) => {
  const match = term.match(REGEXP);
  if (match) {
    // Show translation in results list
    // TODO: check why using const here throws undefined variable text in production build
    var text = match[1];
    const lang = toLanguageCode(match[2]);
    translate(text, lang).then(result => {
      const translation = result.text[0];
      callback({
        id,
        icon,
        title: `${translation}`,
        getPreview: () => <Preview text={text} to={lang}  />
      });
    });
    return;
  }

  // Fallback result with lower priority for every request
  callback({
    id,
    icon,
    // Low priority for fallback result
    order: 3,
    title: `Translate ${term}`,
    getPreview: () => <Preview text={term} to={getTargetLanguage(term)} />
  });
};

export default {
  fn: translatePlugin,
};
