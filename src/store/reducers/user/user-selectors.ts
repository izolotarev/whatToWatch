import { AuthorizationStatus } from '../../../const/const';
import { State } from '../../../types/types';
import { NameSpace } from '../root-reducer';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.user].authorizationStatus;

export const getUserEmail = (state: State): string | undefined => state[NameSpace.user].userEmail;

export const getAvatarUrl = (state: State): string | undefined => state[NameSpace.user].avatarUrl;
