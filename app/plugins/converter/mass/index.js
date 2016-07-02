import { SYNONIMS, UNITS } from './constants';
import { buildExtract, getRates, parseUnitName, linearConverter } from '../base';

const toUnit = parseUnitName.bind(null, SYNONIMS, UNITS);

function defaultTarget(unit) {
  return unit === 'kg' ? 'lb' : 'kg';
}

function toUnitStruct(unit) {
  return {
    unit,
    displayName: unit,
  };
}


export default {
  getRates,
  extract: buildExtract(toUnit, toUnitStruct, defaultTarget),
  convert: linearConverter(UNITS),
};
