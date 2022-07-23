import { createAction } from '@reduxjs/toolkit';
import { ActionType, AuthorizationStatus } from '../../const/const';
import { ReviewType } from '../../types/types';


export const selectGenre = createAction(
  ActionType.SelectGenre,
  (genre: string) => ({
    payload: {
      genre,
    },
  }),
);


export const loadReviews = createAction(
  ActionType.LoadReviews,
  (reviews: ReviewType[]) => ({
    payload: {
      reviews,
    },
  }),
);

export const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authStatus: AuthorizationStatus, email?: string) => ({
    payload: {
      authStatus,
      email,
    },
  }),
);

export const requireLogout = createAction(ActionType.RequireLogout);
