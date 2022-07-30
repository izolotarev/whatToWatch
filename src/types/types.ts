import { Action } from 'redux';
import { ThunkAction} from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { AuthorizationStatus } from '../const/const';
import { RootState } from '../store/reducers/root-reducer';

export type MovieType = {
  id: number,
  name: string,
  posterImage: string,
  previewImage: string,
  backgroundImage: string,
  backgroundColor: string,
  videoLink: string,
  previewVideoLink: string,
  description: string,
  rating: number,
  scoresCount: number,
  director: string,
  starring: string[],
  runTime: number,
  genre: string,
  released: number,
  isFavorite: boolean,
  ['poster_image']?: string,
  ['preview_image']?: string,
  ['background_image']?: string,
  ['background_color']?: string,
  ['video_link']?: string,
  ['preview_video_link']?: string,
  ['scores_count']?: number,
  ['run_time']?: number,
  ['is_favorite']?: boolean,
};

export type ReviewType = {
  id: number,
  user: UserType,
  rating: number,
  comment: string,
  date: string
}

export type PostReviewType = {
  comment: string;
  rating: number;
}

export type UserType = {
  id: number,
  name: string
}

export type MovieState = {
  selectedGenre: string;
  movies: MovieType[];
  moviesLoaded: boolean;
  promo?: MovieType;
  isPromoLoaded: boolean;
  movie?: MovieType;
  isMovieLoaded: boolean;
}

export type ReviewState = {
  reviews?: ReviewType[];
  postSuccess: boolean;
  postError: boolean;
}

export type UserState = {
  authorizationStatus: AuthorizationStatus,
  userEmail?: string,
  avatarUrl?: string,
}

export type State = RootState;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type AuthInfo = {
  id: string,
  email: string,
  name: string,
  avatar_url: string,
};
