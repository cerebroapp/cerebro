import memoize from 'lodash/memoize';

/**
 * Get key and content of meta tag
 *
 * @param  {String} tag
 * @return {Object}
 */
function parseMetaTag(tag) {
  const key = tag.match(/(:?property|name)=["'](.+?)["']/)[1];
  const content = tag.match(/content=["'](.+?)["']/)[1];
  return { key, content };
}

function parseTitle(html) {
  const match = html.match(/<title>(.+?)<\/title>/i);
  if (match) {
    return match[1];
  }
}

/**
 * Hash with all metas found on the page
 *
 * @param  {String} html HTML code of page
 * @return {Object}
 */
function getAllMetas(html) {
  const result = {
    title: parseTitle(html)
  };
  const match = html.match(/<meta(.*)property=["'](.+?)["'](.*)>/gi);
  if (!match) {
    return result;
  }
  return match.reduce((acc, meta) => {
    const { key, content } = parseMetaTag(meta);
    return {
      ...acc,
      [key]: content
    };
  }, {});
}

/**
 * Process all found meta tags to three keys: title, description and image
 *
 * @param  {Object} metas
 * @return {Object}
 */
function processMetaTags(metas) {
  return {
    title: metas['og:title'] || metas['twitter:title'] || metas.title,
    description: metas['og:description'] || metas['twitter:description'] || metas.description,
    image: metas['og:image'] || metas['twitter:image'],
  }
}

/**
 * Parse html page and get hash with meta information
 *
 * @param  {String} url Url to parse meta data
 * @return {Promise}
 */
function parseMeta(url) {
  return fetch(url)
    .then(response => response.text())
    .then(response => processMetaTags(getAllMetas(response)));
}

export default memoize(parseMeta);
