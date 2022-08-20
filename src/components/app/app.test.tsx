import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const/const';
import { makeFakeMovie } from '../../utils/mocks';
import App from './app';
import { render, screen } from '@testing-library/react';

const mockStore = configureMockStore();
const movies = [makeFakeMovie()];


const history = createMemoryHistory();

describe('Application Routing', () => {

  it('should render "Main" screen when user navigate to "/"', () => {
    const store = mockStore({
      MOVIES: {moviesLoaded: true, movies: movies, selectedGenre: 'All', isPromoLoaded: true, promo: movies[0], favoriteMovies: [] },
      USER: {authorizationStatus: AuthorizationStatus.NoAuth},
    });

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>
    );
    history.push(AppRoute.ROOT);
    render(fakeApp);
    expect(movies.length).toBe(1);
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/2019 What to watch Ltd/i)).toBeInTheDocument();
  });

  it('should render "LoginScreen" when user navigate to "/login"', () => {
    const store = mockStore({
      MOVIES: {moviesLoaded: true, movies: movies, selectedGenre: 'All', isPromoLoaded: true, promo: movies[0], favoriteMovies: [] },
      USER: {authorizationStatus: AuthorizationStatus.NoAuth},
    });

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>
    );
    history.push(AppRoute.LOGIN);
    render(fakeApp);
    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

});
