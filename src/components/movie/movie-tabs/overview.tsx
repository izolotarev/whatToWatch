import { Fragment } from 'react';
import { MovieType } from '../../../types/movie';
import { ratingToText } from '../../../utils/utils';

type OverviewProps = {
  movie:MovieType;
}

function Overview({movie}:OverviewProps): JSX.Element {
  const {rating, scoresCount, description, director, starring} = movie;

  return (
    <Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{rating}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{ratingToText(rating)}</span>
          <span className="movie-rating__count">{scoresCount}</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{description}</p>

        <p className="movie-card__director"><strong>Director: {director}</strong></p>

        <p className="movie-card__starring"><strong>Starring: {starring.join(', ')}</strong></p>
      </div>
    </Fragment>
  );
}
export default Overview;