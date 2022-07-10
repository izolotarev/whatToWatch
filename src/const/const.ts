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
