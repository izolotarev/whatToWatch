import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, HeaderClass, MOVIE_CARDS_PER_STEP } from '../../const/const';
import { useAppDispatch } from '../../hooks/hooks';
import { getMovieFavoriteStatusById, getMoviesInSelectedGenre, getPromo, getPromoLoadingStatus, getUniqueGenres } from '../../store/reducers/movies/movies-selectors';
import { getAuthorizationStatus } from '../../store/reducers/user/user-selectors';
import { MovieType, State } from '../../types/types';
import { handleFavoriteClickAction } from '../../utils/utils';
import Footer from '../footer/footer';
import GenreList from '../genre-list/genre-list';
import Header from '../header/header';
import LoadingScreen from '../loading-screen/loading-screen';
import MovieList from '../movie-list/movie-list';
import ShowMore from '../show-more/show-more';

type MainProps = {
  movies: MovieType[];
}

function Main({ movies}:MainProps):JSX.Element {
  const promoMovie = useSelector(getPromo);
  const genres = useSelector(getUniqueGenres);
  const moviesInSelectedGenre = useSelector(getMoviesInSelectedGenre);
  const numberOfMovies = moviesInSelectedGenre.length;

  const [numberOfMoviesToShow, setNumberOfMoviesToShow] = useState(MOVIE_CARDS_PER_STEP);

  const increaseNumberOfMoviesToShow = useCallback(() => setNumberOfMoviesToShow((prev) => prev + MOVIE_CARDS_PER_STEP), []);

  const resetNumberOfMoviesToShow = useCallback(() => setNumberOfMoviesToShow(MOVIE_CARDS_PER_STEP), []);

  const authorizationStatus = useSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  const promoId = promoMovie?.id ?? 0;

  const isPromoFavorite = useSelector((state: State) => getMovieFavoriteStatusById(state, promoId));

  const handleFavoriteClick = () => dispatch(handleFavoriteClickAction(authorizationStatus, isPromoFavorite, promoId));

  if (!promoMovie || !movies) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <div className='page'>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={promoMovie.backgroundImage} alt={promoMovie.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header isWithUserNavigation headerClass={HeaderClass.MOVIE_CARD}/>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={promoMovie.posterImage} alt={promoMovie.name} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{promoMovie.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{promoMovie.genre}</span>
                <span className="movie-card__year">{promoMovie.released}</span>
              </p>

              <div className="movie-card__buttons">
                <Link to={{pathname: `${AppRoute.PLAYER}/${promoMovie.id}`}} className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>
                <button className="btn btn--list movie-card__button" type="button" onClick={handleFavoriteClick}>
                  {
                    isPromoFavorite
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList genres={genres} resetNumberOfMoviesToShow={resetNumberOfMoviesToShow}/>
          <MovieList movies={moviesInSelectedGenre} numberOfMoviesToShow={numberOfMoviesToShow}/>

          {
            numberOfMovies > MOVIE_CARDS_PER_STEP && numberOfMoviesToShow < numberOfMovies
              ?
              <ShowMore increaseNumberOfMoviesToShow={increaseNumberOfMoviesToShow}/>
              :
              ''
          }
        </section>
        <Footer/>
      </div>
    </div>
  );
}

export default Main;
