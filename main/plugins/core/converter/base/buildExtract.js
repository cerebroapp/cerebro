/**
 * Build function, that extracts from and to units from regexp match
 * @param  {Function} toUnit convert string to real unit name
 * @param  {Function} toUnitStruct Function that converts unit name to structure:
 * @param  {Function} defaultTarget Function that returns default target unit
 *  ** unit
 *  ** displayName
 *  ** rate
 * @return {Function} extract function that takes regexp match and return from and to structures
 */
export default function (toUnit, toUnitStruct, defaultTarget) {
  return function extract(match) {
    const from = toUnit(match[2]);
    const to = match[3] ? toUnit(match[3]) : defaultTarget(from);
    if (!from || !to) {
      return false;
    }
    return [
      toUnitStruct(from),
      toUnitStruct(to)
    ];
  };
}
