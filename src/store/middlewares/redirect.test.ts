import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from '@reduxjs/toolkit';
import { AppRoute } from '../../const/const';
import { State } from '../../types/types';
import { redirectToRoute } from '../actions/actions';
import { redirect } from './redirect';


const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history/browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should redirect to /login', () => {
    store.dispatch(redirectToRoute(AppRoute.LOGIN));
    expect(fakeHistory.location.pathname).toBe(AppRoute.LOGIN);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.LOGIN),
    ]);
  });

  it('should not redirect to / because bad action', () => {
    store.dispatch({type: 'UNKNOWN_ACTION', payload: AppRoute.ROOT});
    expect(fakeHistory.location.pathname).not.toBe(AppRoute.ROOT);
  });

});
