import { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch} from '../../hooks/hooks';
import { selectGenre } from '../../store/actions/actions';
import { getSelectedGenre } from '../../store/reducers/movies/movies-selectors';

type GenreListProps = {
  genres: string[];
  resetNumberOfMoviesToShow?: () => void;
}

function GenreList({genres, resetNumberOfMoviesToShow}: GenreListProps):JSX.Element {
  const selectedGenre = useSelector(getSelectedGenre);

  const dispatch = useAppDispatch();

  const handleGenreClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    resetNumberOfMoviesToShow?.();

    const input = evt.target as HTMLElement;
    if (input.textContent) {
      dispatch(selectGenre(input.textContent));
    }
  };

  return (
    <ul className="catalog__genres-list">
      {
        genres.map((genre) => (
          <li className={`catalog__genres-item ${genre === selectedGenre ? 'catalog__genres-item--active' : ''}`} key={genre}>
            <a href="/" className="catalog__genres-link" onClick={handleGenreClick}>{genre}</a>
          </li>
        )
        )
      }
    </ul>
  );
}

export default GenreList;
