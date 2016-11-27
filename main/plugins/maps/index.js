import React from 'react';
import Preview from './Preview';
import geocode from './geocode';

import icon from './icon.png'

/**
 * Plugin to search & display google maps
 *
 * @param  {String} options.term
 * @param  {Object} options.actions
 * @param  {Function} options.display
 */
const mapsPlugin = ({term, actions, display}) => {
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
          actions.open(`https://maps.google.com/?q=${q}`);
        },
        getPreview: () => <Preview geometry={geometry} name={formatted_address} />
      };
    });
    display(result);
  });
};

export default {
  fn: mapsPlugin,
};
