import { ReviewType } from '../../../types/review';

type ReviewProps = {
  review: ReviewType;
}

function Review({review}:ReviewProps):JSX.Element {
  const {comment, rating, user} = review;
  const {name} = user;

  const date = new Date(review.date);
  const dateTime = date.toISOString().substring(0,10);
  const monthYear = date.toLocaleString('en-US', { month: 'long', day:'numeric' , year: 'numeric'});

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{name}</cite>
          <time className="review__date" dateTime={dateTime}>{monthYear}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
}

export default Review;
