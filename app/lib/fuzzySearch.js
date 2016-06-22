export default (items, term, toString = (item) => item) => {
  const result = [];
  term = term.toLowerCase();
  items.forEach(item => {
    if (toString(item).toLowerCase().indexOf(term) !== -1) {
      result.push(item);
    }
  });
  return result;
}
