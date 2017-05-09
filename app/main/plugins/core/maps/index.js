/* eslint camelcase:0 */
import React from 'react'
import Preview from './Preview'
import geocode from './geocode'
import getPlaces from './getPlaces'
import getUserLocation from './getUserLocation'

import icon from './icon.png'

const toResultFn = (address, openUrl) => ({ name, geometry, formatted_address, place_id }) => ({
  icon,
  id: place_id,
  title: name,
  subtitle: formatted_address,
  term: formatted_address,
  onSelect: () => {
    const q = encodeURIComponent(address)
    openUrl(`https://maps.google.com/?q=${q}`)
  },
  getPreview: () => <Preview geometry={geometry} name={formatted_address} />
})

/**
 * Plugin to search & display google maps
 *
 * @param  {String} options.term
 * @param  {Object} options.actions
 * @param  {Function} options.display
 */
const fn = ({ term, actions, display, config }) => {
  let match = term.match(/^(?:maps?|карт(?:а|ы))\s+(.+)/i)
  match = match || term.match(/(.+)\s(?:maps?|карт(?:а|ы))$/i)
  if (!match) return
  const address = match[1]
  const lang = config.get('lang')
  const toResult = toResultFn(address, actions.open)
  getUserLocation().then(location => (
    getPlaces({
      location,
      lang,
      keyword: address
    })
  )).then((points) => {
    const result = points.map(toResult)
    display(result)
  })
  geocode(address, lang).then((points) => {
    const result = points.map(toResult)
    display(result)
  })
}

export default {
  icon,
  fn,
  name: 'Search on google maps',
  keyword: 'map',
}
