import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import { AuthorizationStatus } from '../../const/const';
import { makeFakeMovie } from '../../utils/mocks';

import { render, screen } from '@testing-library/react';
import MovieCard from './movie-card';

const mockStore = configureMockStore();
const movie = makeFakeMovie();
const history = createMemoryHistory();

const store = mockStore({
  MOVIES: {moviesLoaded: true, movies: [movie], selectedGenre: 'All', isPromoLoaded: true, promo: movie, favoriteMovies: [movie] },
  USER: {authorizationStatus: AuthorizationStatus.NoAuth},
});

describe('Component: Movie Card', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MovieCard movie={movie} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(movie.name)).toBeInTheDocument();
  });

});
