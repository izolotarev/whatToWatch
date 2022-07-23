import { combineReducers } from '@reduxjs/toolkit';
import { moviesData } from './movies/movies-reducer';
import { reviewsData } from './reviews/reviews-reducer';
import { userProcess } from './user/user-reducer';


export enum NameSpace {
  movies = 'MOVIES',
  reviews = 'REVIEWS',
  user = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.movies]: moviesData,
  [NameSpace.reviews]: reviewsData,
  [NameSpace.user]: userProcess,
});

export type RootState = ReturnType<typeof rootReducer>;
