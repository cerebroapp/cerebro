import React from 'react';
import icon from './icon.png';
import translate from './translate';
import detectLanguage from './detectLanguage';
import toLanguageCode from './toLanguageCode';
import Preview from './Preview';
import { id, order, REGEXP } from './constants.js';
import { shell } from 'electron';


const translatePlugin = (term, callback) => {
  const match = term.match(REGEXP);
  if (match) {
    // Show translation in results list
    // TODO: check why using const here throws undefined variable text in production build
    var text = match[1];
    const targetLang = toLanguageCode(match[2]);
    if (targetLang) {
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
          title: `${translation}`,
          onSelect: () => {
            const q = encodeURIComponent(text);
            shell.openExternal(`https://translate.yandex.ru/?text=${q}&lang=${lang}`);
          },
          getPreview: () => <Preview {...options} />
        });
      });
      return;
    }
  }

  // Fallback result with lower priority for every request
  callback({
    id,
    icon,
    // Low priority for fallback result
    order: 13,
    title: `Translate ${term}`,
    onSelect: () => {
      const q = encodeURIComponent(term);
      shell.openExternal(`https://translate.yandex.ru/?text=${q}`);
    },
    getPreview: () => <Preview text={term} />
  });
};

export default {
  fn: translatePlugin,
};
