import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, HeaderClass } from '../../const/const';
import { useAppDispatch } from '../../hooks/hooks';
import { clearMovieById } from '../../store/actions/actions';
import { fetchMovieById, fetchReviews } from '../../store/actions/api-actions';
import { getMovieById, getMovieFavoriteStatusById, getSimilarMoviesByGenre } from '../../store/reducers/movies/movies-selectors';
import { getReviews } from '../../store/reducers/reviews/reviews-selector';
import { getAuthorizationStatus } from '../../store/reducers/user/user-selectors';
import { State } from '../../types/types';
import { handleFavoriteClickAction } from '../../utils/utils';
import Footer from '../footer/footer';
import Header from '../header/header';
import LoadingScreen from '../loading-screen/loading-screen';
import MovieList from '../movie-list/movie-list';
import MovieTabs from './movie-tabs/movie-tabs';

type MovieParams = {
  id: string;
};

function Movie():JSX.Element {
  const params = useParams<MovieParams>();
  const id = parseInt(params.id ?? '', 10);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMovieById(id));
    dispatch(fetchReviews(id));
    window.scrollTo(0,0);
    return () => {dispatch(clearMovieById());};
  }, [id]);

  const movie = useSelector(getMovieById);
  const reviews = useSelector(getReviews);

  const genre = movie?.genre ?? 'All';
  const similarMovies = useSelector((state: State) => getSimilarMoviesByGenre(state, genre));

  const authorizationStatus = useSelector(getAuthorizationStatus);

  const isFavorite = useSelector((state: State) => getMovieFavoriteStatusById(state, id));

  const handleFavoriteClick = () => dispatch(handleFavoriteClickAction(authorizationStatus, isFavorite, id));

  if (!movie) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <div className='page'>
      <section className="movie-card movie-card--full" style={{background: movie.backgroundColor}}>
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={movie.backgroundImage} alt={`${movie.name} poster`} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header headerClass={HeaderClass.MOVIE_CARD} isWithUserNavigation/>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{movie.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{movie.genre}</span>
                <span className="movie-card__year">{movie.released}</span>
              </p>

              <div className="movie-card__buttons">
                <Link to={{pathname: `${AppRoute.PLAYER}/${id}`}} className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>
                <button className="btn btn--list movie-card__button" type="button" onClick={handleFavoriteClick}>
                  {
                    isFavorite
                      ?
                      <svg viewBox="0 0 18 14" width="18" height="14">
                        <use xlinkHref="#in-list"></use>
                      </svg>
                      :
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg>
                  }
                  <span>My list</span>
                </button>
                {
                  authorizationStatus === AuthorizationStatus.Auth
                    ?
                    <Link to={{pathname: `${AppRoute.MOVIES}/${id}${AppRoute.ADD_REVIEW}`}} state={movie} className="btn movie-card__button">Add review</Link>
                    :
                    ''
                }
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={movie.posterImage} alt={movie.name} width="218" height="327" />
            </div>
            <MovieTabs movie={movie} reviews={reviews}></MovieTabs>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <MovieList movies={similarMovies}/>
        </section>

        <Footer/>
      </div>
    </div>
  );
}

export default Movie;
