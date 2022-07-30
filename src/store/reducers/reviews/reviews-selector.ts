import { NameSpace } from '../root-reducer';
import { State, ReviewType } from '../../../types/types';

export const getReviews = (state: State): ReviewType[] | undefined => state[NameSpace.reviews].reviews;
export const getReviewPostStatus = (state: State): boolean => state[NameSpace.reviews].postSuccess;
export const getReviewPostError = (state: State): boolean => state[NameSpace.reviews].postError;
