import { AppRoute, AuthorizationStatus } from '../const/const';
import { redirectToRoute } from '../store/actions/actions';
import { addToFavorites, removeFromFavorites } from '../store/actions/api-actions';
import { MovieType, ThunkActionResult } from '../types/types';

export const ratingToText = (rating: number):string => {
  if (rating >= 0 && rating < 3) {
    return 'Bad';
  } else if (rating >= 3 && rating < 5) {
    return 'Normal';
  } else if (rating >= 5 && rating < 8) {
    return 'Good';
  } else if (rating >= 8 && rating < 10) {
    return 'Very good';
  } else if (rating === 10) {
    return 'Awesome';
  }
  return 'rating';
};

export const adaptMovieToClient = (data: MovieType): MovieType => {
  const adaptedItem = Object.assign(
    {},
    data,
    {
      posterImage: data['poster_image'],
      previewImage: data['preview_image'],
      backgroundImage: data['background_image'],
      backgroundColor: data['background_color'],
      videoLink: data['video_link'],
      previewVideoLink: data['preview_video_link'],
      scoresCount: data['scores_count'],
      runTime: data['run_time'],
      isFavorite: data['is_favorite'],
    },
  );
  delete adaptedItem['poster_image'];
  delete adaptedItem['preview_image'];
  delete adaptedItem['background_image'];
  delete adaptedItem['background_color'];
  delete adaptedItem['video_link'];
  delete adaptedItem['preview_video_link'];
  delete adaptedItem['scores_count'];
  delete adaptedItem['run_time'];
  delete adaptedItem['is_favorite'];
  return adaptedItem;
};

const LoginRegexp = {
  EMAIL: /[^@\s]+@[^@\s]+\.[^@\s]+$/,
  // PASSWORD: /^(?=.*\d)(?=.*[a-zA-Z])/,
};

export const validate = (login?: string, password?: string): boolean => {
  const validLoogin = login && LoginRegexp.EMAIL.test(login);
  const validPassword = password && password.length > 4;
  if (validLoogin && validPassword) {
    return true;
  }
  return false;
};

export const handleFavoriteClickAction = (status: AuthorizationStatus, isFavorite: boolean, id: number): ThunkActionResult =>
  async (dispatch, _getState): Promise<void> => {
    if (status !== AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.LOGIN));
    } else if (isFavorite) {
      dispatch(removeFromFavorites(id));
    } else {
      dispatch(addToFavorites(id));
    }
  };


// runTime > 60 ? `${Math.floor(runTime / 60)}h ${runTime % 60}m` : `${runTime}m`

export const formatTime = (sec: number) => {
  let hours: number | string = Math.floor(sec / 3600); // get hours
  let minutes: number | string = Math.floor((sec - (hours * 3600)) / 60); // get minutes
  let seconds: number | string = Math.floor((sec - (hours * 3600) - (minutes * 60))); //  get seconds
  // add 0 if value < 10; Example: 2 => 02
  if (hours < 10) {hours = `0${hours}`; }
  if (minutes < 10) {minutes = `0${minutes}`;}
  if (seconds < 10) {seconds = `0${seconds}`;}
  return `${hours}:${minutes}:${seconds}`; // Return is HH : MM : SS
};
