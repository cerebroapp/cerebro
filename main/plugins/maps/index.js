import React from 'react';
import Preview from './Preview';
import geocode from './geocode';
import { shell } from 'electron';

import icon from './icon.png'

const mapsPlugin = (term, callback) => {
  let match = term.match(/^(?:show\s)?(?:on\s)?maps?\s+(.+)/i);
  match = match || term.match(/(.+)\s(?:show\s)?(?:on\s)?maps?$/i);
  if (!match) return;
  const address = match[1];
  geocode(address).then(points => {
    const result = points.map(point => {
      const { geometry, formatted_address, place_id } = point;
      return {
        icon,
        id: `maps${place_id}`,
        title: formatted_address,
        term: formatted_address,
        onSelect: () => {
          const q = encodeURIComponent(address);
          shell.openExternal(`https://maps.google.com/?q=${q}`);
        },
        getPreview: () => <Preview geometry={geometry} name={formatted_address} />
      };
    });
    callback(result);
  });
};

export default {
  fn: mapsPlugin,
};
