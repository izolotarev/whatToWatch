import { MovieType } from '../../types/types';
import MovieListEmpty from '../movie-list-empty/movie-list-empty';
import MovieCard from '../movie-card/movie-card';

type MovieListProps = {
  movies: MovieType[];
  numberOfMoviesToShow?: number;
}

function MovieList({movies, numberOfMoviesToShow}: MovieListProps): JSX.Element {
  if (movies.length === 0) {
    return <MovieListEmpty/>;
  }

  let moviesToShow;
  if (numberOfMoviesToShow) {
    moviesToShow = movies.slice(0, numberOfMoviesToShow);
  } else {
    moviesToShow = movies;
  }

  return (
    <div className="catalog__movies-list">
      {
        moviesToShow.map((movie) => <MovieCard movie={movie} key={movie.id} />)
      }
    </div>
  );
}

export default MovieList;
