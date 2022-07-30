import { createReducer } from '@reduxjs/toolkit';
import { ReviewState } from '../../../types/types';
import { clearPostReviewError, clearPostReviewStatus, loadReviews, postReviewAction, postReviewError } from '../../actions/actions';


export const initialState: ReviewState = {
  reviews: undefined,
  postSuccess: false,
  postError: false,
};

export const reviewsData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload.reviews;
    })
    .addCase(postReviewAction, (state, action) => {
      state.reviews = action.payload.reviews;
      state.postSuccess = true;
    })
    .addCase(postReviewError, (state) => {
      state.postError = true;
    })
    .addCase(clearPostReviewStatus, (state) => {
      state.postSuccess = initialState.postSuccess;
    })
    .addCase(clearPostReviewError, (state) => {
      state.postError = initialState.postError;
    });
});

