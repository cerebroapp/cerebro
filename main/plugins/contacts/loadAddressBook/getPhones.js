import parseABMultiValue from './parseABMultiValue';
import { phoneLabels } from './labelMappings';

/**
 * Get list of user phones
 *
 * @param  {macOS.ABPerson} person
 * @return {Object}
 */
export default function getPhones(macOS, person) {
  const macPhones = person('valueForProperty', macOS.kABPhoneProperty);
  return parseABMultiValue(macOS, macPhones, phoneLabels);
}
