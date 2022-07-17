import { MovieType } from '../../types/movie';
import MovieCard from '../movie-card/movie-card';

type MovieListProps = {
  movies: MovieType[];
}

function MovieList({movies}: MovieListProps): JSX.Element {
  return (
    <div className="catalog__movies-list">
      {
        movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
      }
    </div>
  );
}

export default MovieList;
