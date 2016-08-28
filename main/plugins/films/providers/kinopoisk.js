import flatten from 'lodash/flatten';

const API_URL = 'http://api.kinopoisk.cf';

function formatFilm(film) {
  const id = film.filmID;
  const poster = film.posterURL ? `https://st.kp.yandex.net/images/film_iphone/iphone360_${id}.jpg` : null;
  const creators = flatten(film.creators);
  const directors = creators
    .filter(c => c.professionKey === 'director')
    .map(director => director.nameRU || director.nameEN);
  const actors = creators
    .filter(c => c.professionKey === 'actor')
    .map(actor => actor.nameRU || actor.nameEN);
  const title = film.nameRU ? film.nameRU : film.nameEN;
  const subtitle = film.nameRU ? film.nameEN : null;
  const budget = film.budgetData || {};
  const rentData = film.rentData || {};
  const rating = film.ratingData || {};
  const { year, country, slogan, description, filmLength, genre, videoURL } = film;
  return {
    id,
    poster,
    directors,
    actors,
    title,
    subtitle,
    year,
    country,
    slogan,
    budget,
    rentData,
    genre,
    description,
    rating,
    length: filmLength,
    trailer: videoURL,
  }
}

export const search = (term) => {
  const url = `${API_URL}/searchFilms?keyword=${term}`;
  return fetch(url)
    .then(result => result.json())
    .then(json => {
      return json.searchFilms.map(film => ({
        id: film.id,
        title: film.nameRU || film.nameEN,
        description: film.description
      }))
    })
}

export const getFilm = (id) => {
  const url = `${API_URL}/getFilm?filmID=${id}`;
  return fetch(url)
    .then(result => result.json())
    .then(formatFilm);
}

export { default as icon } from '../kinopoisk.png';
