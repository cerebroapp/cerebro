import parseUnitName from './parseUnitName';

const SYNONIMS = {
  'см': 'cm',
  'сантиметр*': 'cm',

  'км': 'km',
  'километр*': 'km',

  'м': 'm',
  'метр*': 'm',

  'mile*': 'mile',
  'миля*': 'mile',
  'мили': 'mile',
  'миль': 'mile',

  'in*': 'in',
  '"': 'in',

  "'": 'ft',
  'фут*': 'ft',

  'yard*': 'yard',
  'ярд*': 'yard',
}
const UNITS = {
  'm': 1,
  'cm': 100,
  'in': 39.37,
  'ft': 3.28,
  'yard': 1.09,
  'km': 0.001,
  'mile': 0.00062,
};

const toUnit = parseUnitName.bind(null, SYNONIMS, UNITS);

function defaultTarget(unit) {
  return unit === 'm' ? 'ft' : 'm';
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
