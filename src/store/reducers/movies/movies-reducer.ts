import { createReducer } from '@reduxjs/toolkit';
import { MovieState } from '../../../types/types';
import { adaptMovieToClient } from '../../../utils/utils';
import { clearMovieById, loadMovieById, loadMovies, loadPromo, selectGenre } from '../../actions/actions';


export const initialState: MovieState = {
  selectedGenre: 'All',
  movies: [],
  moviesLoaded: false,
  promo: undefined,
  isPromoLoaded: false,
  movie: undefined,
  isMovieLoaded: false,
};

export const moviesData = createReducer(initialState, (builder) => {
  builder
    .addCase(selectGenre, (state, action) => {
      state.selectedGenre = action.payload.genre;
    })
    .addCase(loadMovies, (state, action) => {
      state.movies = action.payload.movies.map((item) => adaptMovieToClient(item));
      state.moviesLoaded = true;
    })
    .addCase(loadPromo, (state, action) => {
      state.promo = adaptMovieToClient(action.payload.promo);
      state.isPromoLoaded = true;
    })
    .addCase(loadMovieById, (state, action) => {
      state.movie = adaptMovieToClient(action.payload.movie);
      state.isMovieLoaded = true;
    })
    .addCase(clearMovieById, (state, action) => {
      state.movie = initialState.movie;
    });
});
