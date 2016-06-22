export default (items, term, toString = (item) => item) => {
  term = term.toLowerCase();
  return items.filter(item => {
    return toString(item).toLowerCase().indexOf(term) !== -1
  });
}
