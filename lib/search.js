/**
 * Search term in array
 * @param  {Array} items Array of items
 * @param  {String} term Search term
 * @param  {Function} toString Function that converts item from array to string
 * @return {Array}
 */
export default (items, term, toString = (item) => item) => {
  const searchTerm = term.toLowerCase();
  return items.filter(item =>
    // TODO: fuzzy-search instead of simple search here
    toString(item).toLowerCase().indexOf(searchTerm) !== -1
  );
};
