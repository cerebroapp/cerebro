export default function parseUnitName(synonims, units, unit) {
  let result = unit;
  if (synonims[result]) {
    result = synonims[result];
  }
  else {
    const synonim = Object
      .keys(synonims)
      .filter(key => key.indexOf('*') !== -1)
      .find(key => {
        const regexp = new RegExp(key.replace(/\*/g, '.*'));
        return result.match(regexp);
      });
    result = synonims[synonim] || result;
  }
  return units[result] ? result : null;
}
