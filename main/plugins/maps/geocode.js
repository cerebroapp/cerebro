import { get } from 'lib/config';
import memoize from 'memoizee';

const geocode = (term) => {
  const url = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(term)}&language=${get('lang')}`;
  return fetch(url)
    .then(response => response.json())
    .then(json => json.results);
}


export default memoize(geocode);
