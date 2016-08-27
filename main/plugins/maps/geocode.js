const LANG = 'ru';

export default (term) => {
  const url = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(term)}&language=${LANG}`;
  return fetch(url)
    .then(response => response.json())
    .then(json => json.results);
}
