import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/types';
import { Action } from 'redux';
import { APIRoute, AppRoute, AuthorizationStatus } from '../../const/const';
import { checkAuth } from './api-actions';
import { loadMovies, redirectToRoute, requireAuthorization } from './actions';
import { fetchMovies, fetchMovieById } from './api-actions';
import { makeFakeMovie } from '../../utils/mocks';

describe('Async actions', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('authorization status should be «auth» when server returns 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.LOGIN)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuth());

    expect(store.getActions()).toEqual([
      requireAuthorization(AuthorizationStatus.Auth),
    ]);
  });

  it('should dispatch loadMovies when GET /movies', async () => {
    const mockMovies = [makeFakeMovie()];
    mockAPI
      .onGet(APIRoute.MOVIES)
      .reply(200, mockMovies);

    const store = mockStore();
    await store.dispatch(fetchMovies());

    expect(store.getActions()).toEqual([
      loadMovies(mockMovies),
    ]);
  });

  it('should redirect to page Not Found when GET /movie/:id is rejected', async () => {
    const mockMovie = makeFakeMovie();
    mockAPI
      .onGet(`${APIRoute.MOVIES}/${mockMovie.id}`)
      .reply(400);

    const store = mockStore();
    await store.dispatch(fetchMovieById(mockMovie.id));
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.NOT_FOUND),
    ]);
  });

});
