import React from 'react';
import Preview from './Preview';
import geocode from './geocode';

import icon from './icon.png'

const mapsPlugin = (term, callback) => {
  geocode(term).then(points => {
    const result = points.map(point => {
      const { geometry, formatted_address, place_id } = point;
      return {
        icon,
        id: `maps${place_id}`,
        title: formatted_address,
        term: formatted_address,
        getPreview: () => <Preview geometry={geometry} name={formatted_address} />
      };
    });
    callback(result);
  });
};

export default {
  fn: mapsPlugin,
};
