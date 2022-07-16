import { useCallback, useState } from 'react';
import { MovieType } from '../../types/movie';
import MovieCard from '../movie-card/movie-card';


type MovieListProps = {
  movies: MovieType[];
}

function MovieList({movies}: MovieListProps): JSX.Element {

  const listItemHoverHandler = useCallback((id?: number) => {
    setSelectedMovie(id);
  }, []);

  const [selectedMovie, setSelectedMovie] = useState<number | undefined>(undefined);

  return (
    <div className="catalog__movies-list">
      {
        movies.map((movie) => <MovieCard movie={movie} key={movie.id} listItemHoverHandler={listItemHoverHandler}/>)
      }
    </div>
  );
}

export default MovieList;
