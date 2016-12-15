import parseABMultiValue from './parseABMultiValue'
import { emailLabels } from './labelMappings'

/**
 * Get list of user emails
 *
 * @param  {macOS.ABPerson} person
 * @return {Object}
 */
export default function getEmails(macOS, person) {
  const macEmails = person('valueForProperty', macOS.kABEmailProperty)
  return parseABMultiValue(macOS, macEmails, emailLabels)
}
