import React from 'react';
import icon from './icon.png';
import translate from './translate';
import detectLanguage from './detectLanguage';
import toLanguageCode from './toLanguageCode';
import Preview from './Preview';
import { id, order, REGEXP } from './constants.js';

const onKeyDown = ({target}) => {
  if (target && target.getAttribute('role') === 'combobox') {
    event.preventDefault();
  }
}

const translatePlugin = (term, callback) => {
  const match = term.match(REGEXP);
  if (match) {
    // Show translation in results list
    // TODO: check why using const here throws undefined variable text in production build
    var text = match[1];
    const targetLang = toLanguageCode(match[2]);

    detectLanguage(text).then(sourceLang =>
      translate(text, `${sourceLang}-${targetLang}`)
    ).then(({lang, text}) => {
      const translation = text[0];
      const [sourceLang, targetLang] = lang.split('-');
      const options = {
        text,
        sourceLang,
        targetLang,
        translation
      }
      callback({
        id,
        icon,
        onKeyDown,
        title: `${translation}`,
        getPreview: () => <Preview {...options} />
      });
    });
    return;
  }

  // Fallback result with lower priority for every request
  callback({
    id,
    icon,
    onKeyDown,
    // Low priority for fallback result
    order: 3,
    title: `Translate ${term}`,
    getPreview: () => <Preview text={term} />
  });
};

export default {
  fn: translatePlugin,
};
