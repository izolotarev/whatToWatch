import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../../const/const';
import { UserState } from '../../../types/types';
import { requireAuthorization, requireLogout } from '../../actions/actions';


export const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: undefined,
};

export const userProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload.authStatus;
      state.userEmail = action.payload.email;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.userEmail = initialState.userEmail;
    });
});
