import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../../const/const';
import { UserState } from '../../../types/types';
import { requireAuthorization, requireLogout } from '../../actions/actions';


export const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: undefined,
  avatarUrl: undefined,
};

export const userProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload.authStatus;
      state.userEmail = action.payload.email;
      state.avatarUrl = action.payload.avatarUrl;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.userEmail = initialState.userEmail;
      state.avatarUrl = initialState.avatarUrl;
    });
});
