import showWindowWithTerm from './showWindowWithTerm'
import { parse } from 'url'

export default (mainWindow, url) => {
  const { host: action, query } = parse(url, { parseQueryString: true })
  // Currently only search action supported.
  // We can extend this handler to support more
  // like `plugins/install` or do something plugin-related
  if (action === 'search') {
    showWindowWithTerm(mainWindow, query.term)
  } else {
    showWindowWithTerm(mainWindow, url)
  }
}
