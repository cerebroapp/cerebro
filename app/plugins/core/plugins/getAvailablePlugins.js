/**
 * API endpoint to search all cerebro plugins
 * @type {String}
 */
const URL = 'https://registry.npmjs.com/-/v1/search?from=0&size=500&text=keywords:cerebro-plugin,cerebro-extracted-plugin'

const sortByPopularity = (a, b) => a.score.detail.popularity > b.score.detail.popularity ? -1 : 1

/**
 * Get all available plugins for Cerebro
 * @return {Promise<Array>}
 */
export default async () => {
  if (!navigator.onLine) return []
  try {
    const { objects: plugins } = await fetch(URL).then((res) => res.json())
    plugins.sort(sortByPopularity)

    return plugins.map((p) => ({
      name: p.package.name,
      version: p.package.version,
      description: p.package.description,
      homepage: p.package.links.homepage,
      repo: p.package.links.repository
    }))
  } catch (err) {
    console.log(err)
    return []
  }
}
