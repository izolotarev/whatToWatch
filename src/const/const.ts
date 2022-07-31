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

export const APIRoute = {
  MOVIES: '/films',
  PROMO: '/films/promo',
  LOGIN: '/login',
  LOGOUT: '/logout',
  REVIEWS: '/comments',
  FAVORITE:  '/favorite',
};

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const MovieTabNames = {
  OVERVIEW: 'Overview',
  DETAILS: 'Details',
  REVIEWS: 'Reviews',
};

export enum ActionType {
  SelectGenre = 'MAIN/SELECT_GENRE',
  LoadMovies = 'MOVIES/LOAD_MOVIES',
  LoadPromo = 'MOVIES/LOAD_PROMO',
  LoadMovieById = 'MOVIES/LOAD_MOVIE_BY_ID',
  ClearMovieById = 'MOVIES/CLEAR_MOVIE',
  LoadReviews = 'MOVIES/LOAD_REVIEWS',
  PostReview = 'MOVIES/POST_REVIEW',
  PostError = 'MOVIES/POST_REVIEW_ERROR',
  ClearPostReviewStatus = 'MOVIES/CLEAR_POST_REVIEW_STATUS',
  ClearPostReviewError = 'MOVIES/CLEAR_POST_REVIEW_ERROR',
  GetFavoriteMovies = 'FAVORITE/LOAD_FAVORITE_MOVIES',
  ClearFavoriteMovies = 'FAVORITE/CLEAR_FAVORITE_MOVIES',
  AddToFavoriteMovies = 'FAVORITE/ADD_TO_FAVORITE',
  RemoveFromFavoriteMovies = 'FAVORITE/REMOVE_FROM_FAVORITE',
  RequireAuthorization = 'USER/REQUIRE_AUTHORIZATION',
  RequireLogout = 'USER/REQUIRE_LOGOUT',
  RedirectToRoute = 'USER/REDIRECT',
}

export const MOVIE_CARDS_PER_STEP = 8;

export const HeaderClass = {
  MOVIE_CARD: 'movie-card__head',
  USER_PAGE: 'user-page__head',
  NO_CLASS: '',
};

export enum PageScreen {
  Main,
  Movie,
  Login,
  Favorites,
  AddReview
}

export const MAX_NUMBER_OF_GENRES = 10;
export const NUMBER_OF_SIMILAR_MOVIES = 4;

export const TypeOfFavoriteAction = {
  ADD_TO_FAVORITE: 1,
  REMOVE_FROM_FAVORITE: 0,
};
