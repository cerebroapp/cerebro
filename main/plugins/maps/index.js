import React from 'react';
import Preview from './Preview';
import geocode from './geocode';

import icon from './icon.png'

const mapsPlugin = (term, callback) => {
  let match = term.match(/^(?:show\s)?(?:on\s)?maps?\s+(.+)/i);
  match = match || term.match(/(.+)\s(?:show\s)?(?:on\s)?maps?$/i);
  if (!match) return;
  geocode(match[1]).then(points => {
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
