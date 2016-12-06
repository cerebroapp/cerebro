import toString from './toString'

/**
 * Convert mac label or key to js key
 *
 * @param  {Nodobjc} macOS  Nodobjc object with added AddressBook framework
 * @param  {String} macKey  Key in mac dictionary or multivalue list
 * @param  {Object} mapping Object with js key => mac key mappings
 * @return {String}
 */
export default (macOS, macKey, mapping) => {
  const finder = label => toString(macOS[mapping[label]]) === macKey
  const label = Object
    .keys(mapping)
    .find(finder)
  return label || macKey
}
