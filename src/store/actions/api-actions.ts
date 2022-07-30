import { toast } from 'react-toastify';
import { APIRoute, AppRoute, AuthorizationStatus } from '../../const/const';
import { AuthInfo, MovieType, PostReviewType, ReviewType, ThunkActionResult } from '../../types/types';
import { getErrorMessage } from '../../utils/utils';
import { loadMovieById, loadMovies, loadPromo, loadReviews, postReviewAction, postReviewError, redirectToRoute, requireAuthorization, requireLogout } from './actions';


export const fetchMovies = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<MovieType[]>(APIRoute.MOVIES);
    dispatch(loadMovies(data));
  };

export const fetchPromo = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<MovieType>(APIRoute.PROMO);
    dispatch(loadPromo(data));
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
    const {data} = await api.get<ReviewType[]>(`${APIRoute.REVIEWS}/${id}`);
    dispatch(loadReviews(data));
  };

export const postReview = (id: number, review: PostReviewType): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.post<ReviewType[]>(`${APIRoute.REVIEWS}/${id}`, review);
      dispatch(postReviewAction(data));
    } catch(error) {
      // toast.info(getErrorMessage(error));
      handleError(error);
      dispatch(postReviewError());
    }
  };

export const login = (email: string, password: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.post<AuthInfo>(APIRoute.LOGIN, {email, password});
    dispatch(requireAuthorization(AuthorizationStatus.Auth, email, data.avatar_url));
    // fetchFavoriteOffers();
    dispatch(redirectToRoute(AppRoute.ROOT));
  };

export const checkAuth = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get(APIRoute.LOGIN);
    if (data) {
      dispatch(requireAuthorization(AuthorizationStatus.Auth, data.email, data.avatar_url));
    }
  };


export const logout = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    api.get(APIRoute.LOGOUT);

    dispatch(requireLogout());
    //WIP
    // dispatch(clearFavoriteOffers());
  };

const handleError = (err) => toast.info(err.response.data.error);
