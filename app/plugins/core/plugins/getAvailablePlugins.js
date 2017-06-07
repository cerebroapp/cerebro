import { flow, map, sortBy } from 'lodash/fp'

/**
 * API endpoint to search all cerebro plugins
 * @type {String}
 */
const URL = 'https://registry.npmjs.com/-/v1/search?from=0&size=500&text=keywords:cerebro-plugin,cerebro-extracted-plugin'

/**
 * Get all available plugins for Cerebro
 * @return {Promise<Object>}
 */
export default () => (
  fetch(URL)
    .then(response => response.json())
    .then(json => flow(
        sortBy(p => -p.score.detail.popularity),
        map(p => ({
          name: p.package.name,
          version: p.package.version,
          description: p.package.description,
          homepage: p.package.links.homepage,
          repo: p.package.links.repository
        }))
      )(json.objects)
    )
)
