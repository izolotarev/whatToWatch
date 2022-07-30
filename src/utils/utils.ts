import { MovieType, ReviewType } from '../types/types';

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

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};
