import { memo, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import { MovieType } from '../../types/movie';

type MovieProps = {
  movie: MovieType;
  listItemHoverHandler?: (id?: number) => void;
}

function MovieCard({movie, listItemHoverHandler}:MovieProps):JSX.Element {
  // console.log(movie);

  const {previewImage, id, name} = movie;

  const handleHover = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    if (listItemHoverHandler) {
      listItemHoverHandler(id);
    }
  };

  const handleBlur = () => {
    if (listItemHoverHandler) {
      listItemHoverHandler(undefined);
    }
  };

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseOver={handleHover} onMouseOut={handleBlur}
    >
      <Link to={{pathname: `${AppRoute.MOVIES}/${id}`}}>
        <div className="small-movie-card__image">
          <img src={previewImage} alt={name} width="280" height="175" />
        </div>
      </Link>
      <h3 className="small-movie-card__title">
        <Link to={{pathname: `${AppRoute.MOVIES}/${id}`}} className="small-movie-card__link" >{name}</Link>
      </h3>
    </article>
  );

}

export default memo(MovieCard);
