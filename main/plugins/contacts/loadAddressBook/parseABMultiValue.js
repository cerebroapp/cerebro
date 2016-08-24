import toString from './toString';
import convertMacKey from './convertMacKey'

export default (macOS, abMultiValue, labelsMapping) => {
  const result = {};
  if (!abMultiValue) return result;
  const count = abMultiValue('count');

  for (var i = 0; i < count; i++) {
    const macLabel = toString(abMultiValue('labelAtIndex', i));
    const value = abMultiValue('valueAtIndex', i);
    if (macLabel && value) {
      const label = convertMacKey(macOS, macLabel, labelsMapping);
      result[label] = toString(value);
    }
  }
  return result;
}
