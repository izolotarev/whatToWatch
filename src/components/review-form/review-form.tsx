import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { PostReviewType } from '../../types/types';

function ReviewForm():JSX.Element {

  const [review, setReview] = useState<PostReviewType>({
    comment: '',
    rating: 0,
  });

  const {comment, rating} = review;

  const handleStarClick = (evt: ChangeEvent<HTMLInputElement>) => {
    setReview({
      comment,
      rating: parseInt(evt.target.value, 10),
    });
  };

  const handleTextareaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReview({
      comment: evt.target.value,
      rating,
    });
  };

  const handleSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();
    // setDisabledForm(true);
    // dispatch(postReview(id, review));
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleSubmit}>
        <div className="rating">
          <div className="rating__stars">
            <input className="rating__input" id="star-1" type="radio" onChange={handleStarClick} checked={review.rating === 1} name="rating" value="1"/>
            <label className="rating__label" htmlFor="star-1">Rating 1</label>

            <input className="rating__input" id="star-2" type="radio" onChange={handleStarClick} checked={review.rating === 2} name="rating" value="2" />
            <label className="rating__label" htmlFor="star-2">Rating 2</label>

            <input className="rating__input" id="star-3" type="radio" onChange={handleStarClick} checked={review.rating === 3} name="rating" value="3"/>
            <label className="rating__label" htmlFor="star-3">Rating 3</label>

            <input className="rating__input" id="star-4" type="radio" onChange={handleStarClick} checked={review.rating === 4} name="rating" value="4" />
            <label className="rating__label" htmlFor="star-4">Rating 4</label>

            <input className="rating__input" id="star-5" type="radio" onChange={handleStarClick} checked={review.rating === 5} name="rating" value="5" />
            <label className="rating__label" htmlFor="star-5">Rating 5</label>

            <input className="rating__input" id="star-6" type="radio" onChange={handleStarClick} checked={review.rating === 6} name="rating" value="6"/>
            <label className="rating__label" htmlFor="star-6">Rating 6</label>

            <input className="rating__input" id="star-7" type="radio" onChange={handleStarClick} checked={review.rating === 7} name="rating" value="7" />
            <label className="rating__label" htmlFor="star-7">Rating 7</label>

            <input className="rating__input" id="star-8" type="radio" onChange={handleStarClick} checked={review.rating === 8} name="rating" value="8"/>
            <label className="rating__label" htmlFor="star-8">Rating 8</label>

            <input className="rating__input" id="star-9" type="radio" onChange={handleStarClick} checked={review.rating === 9} name="rating" value="9" />
            <label className="rating__label" htmlFor="star-9">Rating 9</label>

            <input className="rating__input" id="star-10" type="radio" onChange={handleStarClick} checked={review.rating === 10} name="rating" value="10" />
            <label className="rating__label" htmlFor="star-10">Rating 10</label>
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text" id="review-text"
            placeholder="Review text"
            onChange={handleTextareaChange}
            value={comment}
          >
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ReviewForm;
