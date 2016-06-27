/* eslint no-eval: 0 */

const MATH_REGEXP = /^[-+/*\d\s\( )]+$/;

/**
 * Plugin to show result of math calculation
 * @param  {String} term
 */
const mathPlugin = (term, callback) => {
  const match = term.match(MATH_REGEXP);
  if (match) {
    try {
      const result = eval(term);
      callback(term, {
        title: `= ${result}`,
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
