import { memoize } from 'cerebro-tools'

// Expire geoip information in 30 minutes
const EXPIRATION = 30 * 60 * 1000

const getUserLocation = () => (
  fetch('http://freegeoip.net/json/')
    .then(response => response.json())
    .then(json => `${json.latitude},${json.longitude}`)
)

export default memoize(getUserLocation, {
  maxAge: EXPIRATION
})
