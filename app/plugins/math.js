import React from 'react';
import fs from 'fs';
import fuzzySearch from '../lib/fuzzySearch';
import shellCommand from '../lib/shellCommand';

const MATH_REGEXP = /^[-+/*\d\s\(\ )]+$/;

/**
 * Plugin to show result of math calculation
 * @param  {String} term
 */
export default (term, callback) => {
  const match = term.match(MATH_REGEXP)
  if (match) {
    try {
      callback(term, {
        title: `= ${eval(term)}`,
      });
    } catch (err) {
      // Do nothing when eval failed
    }
  }
}
