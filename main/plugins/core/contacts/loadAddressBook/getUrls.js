import parseABMultiValue from './parseABMultiValue'
import { urlLabels } from './labelMappings'

/**
 * Get list of user urls
 *
 * @param  {macOS.ABPerson} person
 * @return {Object}
 */
export default function getUrls(macOS, person) {
  const macUrls = person('valueForProperty', macOS.kABURLsProperty)
  return parseABMultiValue(macOS, macUrls, urlLabels)
}
