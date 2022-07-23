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
};

export type ReviewType = {
  id: number,
  user: UserType,
  rating: number,
  comment: string,
  date: string
}

export type UserType = {
  id: number,
  name: string
}

export type PostReviewType = {
  comment: string;
  rating: number;
}

export type MovieState = {
  selectedGenre: string;
  movies: MovieType[];
}

export type ReviewState = {
  reviews?: ReviewType[];
  postSuccess: boolean;
  postError: boolean;
}

export type UserState = {
  authorizationStatus: AuthorizationStatus,
  userEmail?: string
}

export type State = RootState;
