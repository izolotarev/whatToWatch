import { createAction } from '@reduxjs/toolkit';
import { ActionType, AuthorizationStatus } from '../../const/const';
import { MovieType, ReviewType } from '../../types/types';


export const selectGenre = createAction(
  ActionType.SelectGenre,
  (genre: string) => ({
    payload: {
      genre,
    },
  }),
);

export const loadMovies = createAction(
  ActionType.LoadMovies,
  (movies: MovieType[]) => ({
    payload: {
      movies,
    },
  }),
);

export const loadPromo = createAction(
  ActionType.LoadPromo,
  (promo: MovieType) => ({
    payload: {
      promo,
    },
  }),
);

export const loadMovieById = createAction(
  ActionType.LoadMovieById,
  (movie: MovieType) => ({
    payload: {
      movie,
    },
  }),
);

export const clearMovieById = createAction(ActionType.ClearMovieById);

export const loadReviews = createAction(
  ActionType.LoadReviews,
  (reviews: ReviewType[]) => ({
    payload: {
      reviews,
    },
  }),
);

export const postReviewAction = createAction(
  ActionType.PostReview,
  (reviews: ReviewType[]) => ({
    payload: {
      reviews,
    },
  }),
);

export const postReviewError = createAction(ActionType.PostError);

export const clearPostReviewStatus = createAction(ActionType.ClearPostReviewStatus);

export const clearPostReviewError = createAction(ActionType.ClearPostReviewError);

export const loadFavoriteMovies = createAction(
  ActionType.GetFavoriteMovies,
  (favoriteMovies: MovieType[]) => ({
    payload: {
      favoriteMovies,
    },
  }),
);

export const clearFavoriteMovies = createAction(ActionType.ClearFavoriteMovies);

export const addToFavoriteMovies = createAction(
  ActionType.AddToFavoriteMovies,
  (favoriteMovie: MovieType) => ({
    payload: {
      favoriteMovie,
    },
  }),
);

export const removeFromFavoriteMovies = createAction(
  ActionType.RemoveFromFavoriteMovies,
  (favoriteMovie: MovieType) => ({
    payload: {
      favoriteMovie,
    },
  }),
);

export const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authStatus: AuthorizationStatus, email?: string, avatarUrl?: string) => ({
    payload: {
      authStatus,
      email,
      avatarUrl,
    },
  }),
);

export const requireLogout = createAction(ActionType.RequireLogout);

export const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (url: string) => ({
    payload: {
      url,
    },
  }),
);
