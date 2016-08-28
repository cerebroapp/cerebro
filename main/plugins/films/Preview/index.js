import React, { PropTypes, Component } from 'react';
import RatingBar from './RatingBar'
import RatingStars from './RatingStars'
import Loading from 'main/components/Loading';
import styles from './styles.css';

export default class Preview extends Component {
  static propTypes = {
    filmId: PropTypes.string.required,
    getFilm: PropTypes.func.required,
  }
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      film: null
    }
  }
  componentDidMount() {
    const { filmId, getFilm } = this.props;
    getFilm(filmId).then(film => {
      this.setState({ loading: false, film });
    })
  }
  renderRow(label, value) {
    if (!value) return null;
    return (
      <li className={styles.detailsRow}>
        <div className={styles.label}>{label}</div>
        <div className={styles.value}>{value}</div>
      </li>
    );
  }
  renderDetails() {
    const { directors, budget, rentData, year, country, length, slogan, genre } = this.state.film;
    return (
      <ul className={styles.specs}>
        {this.renderRow('Год', year)}
        {this.renderRow('Страна', country)}
        {this.renderRow('Слоган', slogan)}
        {this.renderRow('Режиссёр', directors.join(', '))}
        {this.renderRow('Жанр', genre)}
        {this.renderRow('Бюджет', budget.budget)}
        {this.renderRow('Маркетинг', budget.marketing)}
        {this.renderRow('Сборы в США', budget.grossUSA)}
        {this.renderRow('Сборы в России', budget.grossRU)}
        {this.renderRow('Премьера (мир)', rentData.premiereWorld)}
        {this.renderRow('Премьера (РФ)', rentData.premiereRU)}
        {this.renderRow('Время', length)}
      </ul>
    )
  }
  renderTitle() {
    const { title, subtitle } = this.state.film;
    return (
      <div className={styles.titles}>
        <div className={styles.title}>{title}</div>
        { subtitle && <div className={styles.subtitle}>{subtitle}</div> }
      </div>
    )
  }
  renderActors() {
    const { actors } = this.state.film;
    return (
      <div className={styles.roles}>
        <h4>В главных ролях:</h4>
        <ul>
          {actors.map(actor => <li>{actor}</li>)}
        </ul>
      </div>
    );
  }
  renderUsersRating() {
    const { rating } = this.state.film;
    return (
      <div className={styles.rating}>
        <div className={styles.ratingBlock}>
          <RatingStars rating={rating.rating} />
        </div>
        <div className={styles.ratingBlock}>
          <span className={styles.ratingValue}>{rating.rating}</span>
          <span className={styles.voters}>{rating.ratingVoteCount}</span>
          <div className={styles.imdbRating}>
            IMDb: {rating.ratingIMDb} (${rating.ratingIMDbVoteCount})
          </div>
        </div>
      </div>
    );
  }
  renderCriticsRating() {
    const { rating } = this.state.film;
    const { ratingRFCritics, ratingFilmCritics} = rating;
    if (!ratingRFCritics && !ratingFilmCritics) return null;
    return (
      <div className={styles.ratingCritics}>
        {
          ratingFilmCritics &&
          <div className={styles.ratingBlock}>
            <div className={styles.criticsTitle}>в мире</div>
            <RatingBar percentage={parseFloat(ratingFilmCritics)} />
          </div>
        }
        {
          ratingRFCritics &&
          <div className={styles.ratingBlock}>
            <div className={styles.criticsTitle}>в России</div>
            <RatingBar percentage={parseFloat(ratingRFCritics)} />
          </div>
        }
      </div>
    );
  }
  renderTrailer() {
    const { trailer } = this.state.film;
    return <video src={trailer} className={styles.trailer} controls={true} />;
  }
  render() {
    const { film, loading } = this.state;
    if (loading) return <Loading />;
    const { id, poster, description, trailer } = film;
    return (
      <div className={styles.wrapper}>
        { this.renderTitle() }
        <div className={styles.details}>
          { poster && <img src={poster} className={styles.poster}/>}

          {this.renderDetails()}
          {this.renderActors()}
        </div>

        { description && <div className={styles.description}>{description}</div> }

        {this.renderUsersRating()}
        {this.renderCriticsRating()}
        {this.renderTrailer()}
      </div>
    );
  }
}
