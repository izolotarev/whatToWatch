import { ReviewType } from '../../../types/review';
import Review from './review';

type ReviewProps = {
  reviews: ReviewType[];
}

function ReviewList({reviews}:ReviewProps): JSX.Element {
  const middleIndex = Math.ceil(reviews.length / 2);

  const firstHalf = reviews.slice(0, middleIndex);
  const secondHalf = reviews.slice(middleIndex);

  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {
          firstHalf.map((review) =>
            <Review review={review} key={review.id}/>
          )
        }
      </div>
      <div className="movie-card__reviews-col">
        {
          secondHalf.map((review) =>
            <Review review={review} key={review.id}/>
          )
        }
      </div>
    </div>
  );
}
export default ReviewList;
