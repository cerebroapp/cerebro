/**
 * Get plugin Readme.md content
 *
 * @param  {String} repository Repository field from npm package
 * @return {Promise}
 */
export default (repo) => (
  fetch(`https://api.github.com/repos/${repo}/readme`)
    .then((response) => response.json())
    .then((json) => Buffer.from(json.content, 'base64').toString())
)
