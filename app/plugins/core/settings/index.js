import React from 'react'
import { search } from 'cerebro-tools'
import Settings from './Settings'
import icon from '../icon.png'

// Settings plugin name
const NAME = 'Cerebro Settings'

// Settings plugins in the end of list
const order = 9

// Phrases that used to find settings plugins
const KEYWORDS = [
  NAME,
  'Cerebro Preferences',
  'cfg',
  'config',
  'params'
]

/**
 * Plugin to show app settings in results list
 *
 * @param  {String} options.term
 * @param  {Function} options.display
 */
const settingsPlugin = ({ term, display, config, actions }) => {
  const found = search(KEYWORDS, term).length > 0
  if (found) {
    const results = [{
      order,
      icon,
      title: NAME,
      term: NAME,
      getPreview: () => (
        <Settings
          set={(key, value) => config.set(key, value)}
          get={(key) => config.get(key)}
        />
      ),
      onSelect: (event) => {
        event.preventDefault()
        actions.replaceTerm(NAME)
      }
    }]
    display(results)
  }
}

export default {
  name: NAME,
  fn: settingsPlugin
}
