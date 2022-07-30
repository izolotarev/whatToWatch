import { createSelector } from 'reselect';
import { MovieType, State } from '../../../types/types';
import { NameSpace } from '../root-reducer';

export const getSelectedGenre = (state: State): string => state[NameSpace.movies].selectedGenre;

export const getMovies = (state: State): MovieType[] => state[NameSpace.movies].movies;
export const getMoviesLoadingStatus = (state: State): boolean => state[NameSpace.movies].moviesLoaded;
export const getPromo = (state: State): MovieType | undefined => state[NameSpace.movies].promo;
export const getPromoLoadingStatus = (state: State): boolean => state[NameSpace.movies].isPromoLoaded;
export const getMovieById = (state: State): MovieType | undefined => state[NameSpace.movies].movie;

const getMovieGenre = (_state: State, genre:string): string => genre;
export const getSimilarMoviesByGenre = createSelector(getMovies, getMovieGenre,
  (movies, genre) => movies.slice().filter((mov) => mov.genre === genre).slice(0,4));
