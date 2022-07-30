import { ReviewType } from '../../../types/types';
import Review from './review';

type ReviewProps = {
  reviews: ReviewType[];
}

function ReviewList({reviews}:ReviewProps): JSX.Element {
  return (
    <div className="movie-card__reviews movie-card__row">
      {
        reviews.map((review) =>
          <Review review={review} key={review.id}/>
        )
      }
    </div>
  );
}
export default ReviewList;
