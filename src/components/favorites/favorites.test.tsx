import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const/const';
import { makeFakeMovie } from '../../utils/mocks';
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import Favorites from './favorites';


const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.FAVORITES);

const favoriteMovie = makeFakeMovie();

describe('Component: My list', () => {

  it('should render correctly', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth, userEmail: 'test@test.com'},
      MOVIES: {favoriteMovies: [favoriteMovie]},
    });

    render (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Favorites />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(favoriteMovie.name)).toBeInTheDocument();
    expect(screen.getByRole('article')).toBeInTheDocument();
  });

});
