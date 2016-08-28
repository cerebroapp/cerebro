import React from 'react';
import Preview from './Preview';
import * as provider from './providers/kinopoisk';
import { shell } from 'electron';

/**
 * Plugin to look and display local and external IPs
 * @param  {String} term
 */
const filmsPlugin = (term, callback) => {
  provider.search(term).then(films => {
    const result = films.map(film => ({
      id: `film${film.id}`,
      title: film.title,
      subtitle: film.description,
      icon: provider.icon,
      onSelect: () => shell.openExternal(`https://www.kinopoisk.ru/film/${film.id}`),
      getPreview: () => <Preview key={film.id} filmId={film.id} getFilm={provider.getFilm}/>
    }));
    callback(result);
  })
};


export default {
  name: 'Search gif',
  keyword: 'gif',
  fn: filmsPlugin,
};
