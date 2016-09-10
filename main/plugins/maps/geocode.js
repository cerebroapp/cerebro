import { lang } from 'lib/locale';

export default (term) => {
  const url = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(term)}&language=${lang}`;
  return fetch(url)
    .then(response => response.json())
    .then(json => json.results);
}
