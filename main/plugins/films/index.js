import React from 'react';
import Preview from './Preview';
import * as provider from './providers/kinopoisk';

/**
 * Plugin to look and display local and external IPs
 * @param  {String} options.term
 * @param  {Object} options.actions
 * @param  {Function} options.display
 */
const filmsPlugin = ({term, actions, display}) => {
  let match = term.match(/^(kinopoisk|film|фильм)\s+(.+)/i);
  match = match || term.match(/(.+)\s(kinopoisk|film|фильм)$/i);
  if (!match) return;
  provider.search(term).then(films => {
    const result = films.map(film => ({
      id: `film${film.id}`,
      title: film.title,
      subtitle: film.description,
      icon: provider.icon,
      onSelect: () => actions.open(`https://www.kinopoisk.ru/film/${film.id}`),
      getPreview: () => <Preview key={film.id} filmId={film.id} getFilm={provider.getFilm}/>
    }));
    display(result);
  })
};


export default {
  name: 'Search gif',
  keyword: 'gif',
  fn: filmsPlugin,
};
