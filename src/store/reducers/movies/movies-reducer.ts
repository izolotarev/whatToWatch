import { createReducer } from '@reduxjs/toolkit';
import { MovieState } from '../../../types/types';
import { selectGenre } from '../../actions/actions';


export const initialState: MovieState = {
  selectedGenre: 'All',
  movies: [],
};

export const moviesData = createReducer(initialState, (builder) => {
  builder
    .addCase(selectGenre, (state, action) => {
      state.selectedGenre = action.payload.genre;
    });
});
