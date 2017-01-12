import { memoize } from 'cerebro-tools'

// Expire places cache in 30 minutes
const EXPIRATION = 30 * 60 * 1000

const getPlaces = ({ keyword, location, lang }) => {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyA-O4pwGMszqqnKslBjG1ADC1Ol7HCyBd8&query=${encodeURIComponent(keyword)}&language=${lang}&location=${location}`
  return fetch(url)
    .then(response => response.json())
    .then(json => json.results)
}

export default memoize(getPlaces, {
  maxAge: EXPIRATION
})
