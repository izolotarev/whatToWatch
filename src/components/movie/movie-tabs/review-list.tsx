import { ReviewType } from '../../../types/types';
import Review from './review';

type ReviewProps = {
  reviews: ReviewType[];
}

function ReviewList({reviews}:ReviewProps): JSX.Element {
  return (
    <div className="movie-card__reviews movie-card__row">
      {/* <div className="movie-card__reviews-col"> */}
      {
        reviews.map((review) =>
          <Review review={review} key={review.id}/>
        )
      }
      {/* </div> */}
    </div>
  );
}
export default ReviewList;
