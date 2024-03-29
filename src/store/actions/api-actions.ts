import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { APIRoute, AppRoute, AuthorizationStatus } from '../../const/const';
import { dropToken, saveToken } from '../../services/token';
import { AuthInfo, MovieType, PostReviewType, ReviewType, ThunkActionResult } from '../../types/types';
import { addToFavoriteMovies, clearFavoriteMovies, loadFavoriteMovies, loadMovieById, loadMovies, loadPromo, loadReviews, postReviewAction, postReviewError, redirectToRoute, removeFromFavoriteMovies, requireAuthorization, requireLogout } from './actions';

export const fetchMovies = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<MovieType[]>(`${APIRoute.MOVIES}/?skip=0&limit=100`);
      dispatch(loadMovies(data));
    } catch(error) {
      handleError(error);
    }
  };

export const fetchPromo = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<MovieType>(APIRoute.PROMO);
      dispatch(loadPromo(data));
    } catch (error) {
      handleError(error);
    }
  };

export const fetchMovieById = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<MovieType>(`${APIRoute.MOVIES}/${id}`);
      dispatch(loadMovieById(data));
    } catch {
      dispatch(redirectToRoute(AppRoute.NOT_FOUND));
    }
  };

export const fetchReviews = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<ReviewType[]>(`${APIRoute.REVIEWS}/${id}`);
      dispatch(loadReviews(data));
    } catch (error) {
      handleError(error);
    }
  };

export const postReview = (id: number, review: PostReviewType): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.post<ReviewType[]>(`${APIRoute.REVIEWS}/${id}`, review);
      dispatch(postReviewAction(data));
      // toast.info(POST_REVIEW_SUCCESS_MESSAGE);
    } catch(error) {
      handleError(error);
      dispatch(postReviewError());
    }
  };

export const fetchFavoriteMovies = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<MovieType[]>(`${APIRoute.FAVORITE}/`);
      if (data) {
        dispatch(loadFavoriteMovies(data));
      }
    } catch(error) {
      handleError(error);
    }
  };

export const addToFavorites = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.post<MovieType>(`${APIRoute.FAVORITE}/${id}`);
      dispatch(addToFavoriteMovies(data));
    } catch (error) {
      handleError(error);
    }
  };

export const removeFromFavorites = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.delete<MovieType>(`${APIRoute.FAVORITE}/${id}`);
      dispatch(removeFromFavoriteMovies(data));
    } catch (error) {
      handleError(error);
    }
  };

export const login = (email: string, password: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.post<AuthInfo>(APIRoute.LOGIN, `username=${email}&password=${password}`);
      saveToken(data.access_token);
      dispatch(fetchFavoriteMovies());
      dispatch(requireAuthorization(AuthorizationStatus.Auth, email, data.avatar_url));
      dispatch(redirectToRoute(AppRoute.ROOT));
    } catch (error) {
      handleError(error);
    }
  };

export const checkAuth = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get(APIRoute.LOGIN);
      if (data) {
        dispatch(requireAuthorization(AuthorizationStatus.Auth, data.email, data.avatar_url));
      }
    } catch (error) {
      handleError(error);
    }
  };

export const logout = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      await api.delete(APIRoute.LOGOUT);
      dropToken();
      dispatch(requireLogout());
      dispatch(clearFavoriteMovies());
    } catch (error) {
      handleError(error);
    }
  };

const handleError = (err: unknown) => {
  if (axios.isAxiosError(err)) {
    const error = err as AxiosError<ServerError>;
    toast.info(error.response?.data.error);
  }
};

type ServerError = {
  error: string;
}
