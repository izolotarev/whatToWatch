import { makeFakeMovie } from '../../../utils/mocks';
import { adaptMovieToClient } from '../../../utils/utils';
import { loadMovies } from '../../actions/actions';
import { initialState, moviesData } from './movies-reducer';


const movies = [makeFakeMovie()];
const adaptedMovies = movies.map((movie) => adaptMovieToClient(movie));

describe('Function: moviesData', () => {

  it('without additional parameters should return initial state', () => {
    expect(moviesData(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update movies on data load', () => {
    const state = {
      selectedGenre: 'All',
      movies: [],
      moviesLoaded: false,
      promo: undefined,
      isPromoLoaded: false,
      movie: undefined,
      isMovieLoaded: false,
      favoriteMovies: [],
      favoriteMoviesLoaded: false,
    };
    expect(moviesData(state, loadMovies(movies)))
      .toEqual({
        selectedGenre: 'All',
        movies: adaptedMovies,
        moviesLoaded: true,
        promo: undefined,
        isPromoLoaded: false,
        movie: undefined,
        isMovieLoaded: false,
        favoriteMovies: [],
        favoriteMoviesLoaded: false,
      });
  });

});
