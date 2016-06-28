import parseUnitName from './parseUnitName';

const SYNONIMS = {
  'pound*': 'lb',
  'фунт*': 'lb',

  'ounce': 'oz',
  'унци*': 'oz',

  'килогра*': 'kg',
  'грам*': 'g',
  'г': 'g',
  'гр': 'g',

  'миллигр*': 'mg',

  'карат*': 'ct',
  'carat*': 'ct',
}

const UNITS = {
  'kg': 1,
  'g': 1000,
  'mg': 1000000,
  'lb': 2.2,
  'oz': 35.27,
  'ct': 5000,
};

const toUnit = parseUnitName.bind(null, SYNONIMS, UNITS);

function defaultTarget(unit) {
  return unit === 'kg' ? 'lb' : 'kg';
}

function getRates() {
  return Promise.resolve(UNITS);
}

function toUnitStruct(unit) {
  return {
    unit,
    displayName: unit,
    rate: UNITS[unit],
  }
}

function extract(match) {
  const from = toUnit(match[2]);
  const to = match[3] ? toUnit(match[3]) : defaultTarget(from);
  if (!from || !to) {
    return false;
  }
  return [
    toUnitStruct(from),
    toUnitStruct(to)
  ]
}


export default {
  getRates,
  extract,
}
