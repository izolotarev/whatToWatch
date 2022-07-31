import { createSelector } from 'reselect';
import { MAX_NUMBER_OF_GENRES, NUMBER_OF_SIMILAR_MOVIES } from '../../../const/const';
import { MovieType, State } from '../../../types/types';
import { NameSpace } from '../root-reducer';

export const getSelectedGenre = (state: State): string => state[NameSpace.movies].selectedGenre;

export const getMovies = (state: State): MovieType[] => state[NameSpace.movies].movies;
export const getMoviesLoadingStatus = (state: State): boolean => state[NameSpace.movies].moviesLoaded;
export const getPromo = (state: State): MovieType | undefined => state[NameSpace.movies].promo;
export const getPromoLoadingStatus = (state: State): boolean => state[NameSpace.movies].isPromoLoaded;
export const getMovieById = (state: State): MovieType | undefined => state[NameSpace.movies].movie;

export const getUniqueGenres = createSelector(getMovies, (movies) => {
  const genres = movies.map((movie) => movie.genre).slice(0, MAX_NUMBER_OF_GENRES - 1);
  const uniqueGenres = [...new Set(genres)];
  uniqueGenres.unshift('All');
  return uniqueGenres;
});

const getMovieGenre = (_state: State, genre:string): string => genre;

export const getSimilarMoviesByGenre = createSelector(getMovies, getMovieGenre,
  (movies, genre) => movies.slice().filter((mov) => mov.genre === genre).slice(0, NUMBER_OF_SIMILAR_MOVIES - 1));

export const getMoviesInSelectedGenre = createSelector(getMovies, getSelectedGenre, (movies, selectedGenre) => {
  let moviesInSelectedGenre;
  if (selectedGenre === 'All') {
    moviesInSelectedGenre = movies.slice();
  } else {
    moviesInSelectedGenre = movies.slice().filter((movie) => movie.genre === selectedGenre);
  }
  return moviesInSelectedGenre;
});

// Reselect. Первые два аргумента - зависимости.
// Если они не меняются, то третья функция не запустится
// и фильтрация не применится, т.к. результат функции мемоизирован.

export const getFavoriteMovies = (state: State): MovieType[] => state[NameSpace.movies].favoriteMovies;

const getMovieId = (_state: State, id: number) => id;

export const getMovieFavoriteStatusById = createSelector(getFavoriteMovies, getMovieId, (favoriteMovies, id) => favoriteMovies.filter((item) => item.id === id).length > 0);
