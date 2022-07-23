export const Setting = {
  CARDS_NUMBER: 8,
};

export const AppRoute = {
  ROOT: '/',
  LOGIN: '/login',
  FAVORITES: '/mylist',
  MOVIES: '/films',
  ADD_REVIEW: '/review',
  PLAYER:'/player',
  NOT_FOUND: '/not-found',
} as const;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const MovieTabNames = {
  OVERVIEW: 'Overview',
  DETAILS: 'Details',
  REVIEWS: 'Reviews',
} as const;

export enum ActionType {
  SelectGenre = 'MAIN/SELECT_GENRE',
  LoadReviews = 'MOVIES/LOAD_REVIEWS',
  RequireAuthorization = 'USER/REQUIRE_AUTHORIZATION',
  RequireLogout = 'USER/REQUIRE_LOGOUT',
  RedirectToRoute = 'USER/REDIRECT',
}

export const MOVIE_CARDS_PER_STEP = 8;
