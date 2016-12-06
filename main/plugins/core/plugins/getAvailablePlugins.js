/**
 * API endpoint to search all cerebro plugins
 * @type {String}
 */
const URL = 'https://api.npms.io/v2/search?from=0&q=keywords%3Acerebro-plugin'

/**
 * Get all available plugins for Cerebro
 * @return {Promise<Object>}
 */
export default () => (
  fetch(URL)
    .then(response => response.json())
    .then(json => json.results.map(p => ({
      name: p.package.name,
      version: p.package.version,
      description: p.package.description,
      homepage: p.package.links.homepage,
      repo: p.package.links.repository
    })))
)
