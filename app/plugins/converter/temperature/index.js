import { SYNONIMS, UNITS, KELVIN } from './constants';
import { buildExtract, getRates, parseUnitName } from '../base';

const toUnit = parseUnitName.bind(null, SYNONIMS, UNITS);

function defaultTarget(unit) {
  return unit === '°c' ? '°f' : '°c';
}

function toUnitStruct(unit) {
  return {
    unit,
    displayName: unit.toUpperCase(),
  };
}

function convert(amount, from, to) {
  let result = amount;
  if (from.unit === '°f') {
    result = 5 / 9 * (result - 32);
    if (to.unit === 'k') {
      result = result - KELVIN;
    }
  } else if (from.unit === '°c') {
    if (to.unit === 'k') {
      result = KELVIN + result;
    }
    if (to.unit === '°f') {
      result = 9 / 5 * result + 32;
    }
  } else if (from.unit === 'k') {
    if (to.unit === '°c') {
      result = result + KELVIN;
    }
    if (to.unit === '°f') {
      result = 9 / 5 * (result + KELVIN) + 32;
    }
  }
  return Math.round(result * 100) / 100;
}

export default {
  getRates,
  convert,
  extract: buildExtract(toUnit, toUnitStruct, defaultTarget),
};
