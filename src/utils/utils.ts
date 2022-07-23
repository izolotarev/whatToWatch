import { ReviewType } from '../types/types';

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

//WIP
export const adaptReviewToClient = (data: ReviewType): ReviewType => {
  const adaptedItem = Object.assign(
    {},
    data,
    {
      user: {
        // avatarUrl: data.user['avatar_url'],
        id: data.user.id,
        // isPro: data.user['is_pro'],
        name: data.user.name,
      },
    },
  );
  // delete adaptedItem.user['avatar_url'];
  // delete adaptedItem.user['is_pro'];
  return adaptedItem;
};
