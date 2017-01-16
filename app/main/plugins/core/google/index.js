import React from 'react'

import Preview from './Preview'
import icon from './icon.png'

const id = 'search-web'
const order = 11

/**
 * Search term in google
 *
 * @param  {String} options.term
 * @param  {Object} options.actions
 * @param  {Function} options.display
 */
const googlePlugin = ({ term, actions, display }) => {
  /**
   * Open browser with google search of term
   * @param  {String} searchTerm
   */
  const search = (searchTerm) => {
    const q = encodeURIComponent(searchTerm)
    actions.open(`https://google.com/?q=${q}#newwindow=1&q=${q}`)
    actions.hideWindow()
  }

  display({
    id,
    icon,
    order,
    title: `Search web for ${term}`,
    onSelect: () => search(term),
    getPreview: () => <Preview query={term} key={term} search={search} />
  })
}

export default {
  fn: googlePlugin,
}
