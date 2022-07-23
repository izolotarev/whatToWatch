import { createReducer } from '@reduxjs/toolkit';
import { ReviewState } from '../../../types/types';
import { adaptReviewToClient } from '../../../utils/utils';
import { loadReviews } from '../../actions/actions';


export const initialState: ReviewState = {
  reviews: undefined,
  postSuccess: false,
  postError: false,
};

export const reviewsData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload.reviews?.map((review) => adaptReviewToClient(review));
    });
});

