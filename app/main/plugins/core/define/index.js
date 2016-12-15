import React from 'react'
import Preview from './Preview'

const order = 12

/**
 * Look up term in OSx dictionary
 *
 * @param  {String} options.term
 * @param  {Function} options.display
 */
const definePlugin = ({ term, actions, display }) => {
  display({
    order,
    icon: '/Applications/Dictionary.app',
    title: `Define ${term}`,
    onSelect: () => actions.open(`dict://${term}`),
    getPreview: () => <Preview word={term} />,
  })
}

export default {
  fn: definePlugin,
}
