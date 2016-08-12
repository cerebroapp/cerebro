/* eslint no-eval: 0 */

import React from 'react';
import Preview from './Preview';

const MATH_REGEXP = /^[-+/*\d\s,\.\( )]+$/;

/**
 * Plugin to show result of math calculation
 * @param  {String} term
 */
const mathPlugin = (term, callback) => {
  const match = term.match(MATH_REGEXP);
  if (match) {
    try {
      let result = eval(term.replace(',', '.'));
      if (result !== result) {
        // When user tries to devide 0 by 0
        callback({
          title: `= indeterminate`,
          icon: '/Applications/Calculator.app',
          getPreview: () => <Preview />
        });
        return;
      }
      result = result.toLocaleString();
      callback({
        title: `= ${result}`,
        icon: '/Applications/Calculator.app',
        term: `${term} = ${result}`,
        clipboard: result,
      });
    } catch (err) {
      // Do nothing when eval failed
    }
  }
};

export default {
  fn: mathPlugin,
};
