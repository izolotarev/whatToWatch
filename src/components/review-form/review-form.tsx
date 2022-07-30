import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoute, MovieTabNames } from '../../const/const';
import { useAppDispatch } from '../../hooks/hooks';
import { clearPostReviewError, clearPostReviewStatus } from '../../store/actions/actions';
import { postReview } from '../../store/actions/api-actions';
import { getReviewPostError, getReviewPostStatus } from '../../store/reducers/reviews/reviews-selector';
import { PostReviewType } from '../../types/types';

type AddReviewParams = {
  id: string;
};

const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 300;

function ReviewForm():JSX.Element {
  const params = useParams<AddReviewParams>();
  const id = parseInt(params.id ?? '', 10);

  const isPostSuccessfull = useSelector(getReviewPostStatus);
  const isPostError = useSelector(getReviewPostError);

  const dispatch = useAppDispatch();

  const [review, setReview] = useState<PostReviewType>({
    comment: '',
    rating: 5,
  });

  const [disabledForm, setDisabledForm] = useState(false);

  const {comment, rating} = review;
  const isSubmitDisabled = comment.length < MIN_REVIEW_LENGTH || rating === 0;

  const navigate = useNavigate();

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
    setDisabledForm(true);
    dispatch(postReview(id, review));
  };

  useEffect(() => {
    if (isPostSuccessfull) {
      setReview({
        comment: '',
        rating: 0,
      });
      setDisabledForm(false);
      dispatch(clearPostReviewStatus());
      navigate(`${AppRoute.MOVIES}/${id}`, {state: {tabId: MovieTabNames.REVIEWS}});
    }
    if (isPostError) {
      setDisabledForm(false);
      dispatch(clearPostReviewError());
    }
  }, [isPostError, isPostSuccessfull]);

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleSubmit}>
        <div className="rating">
          <div className="rating__stars">
            <input className="rating__input" id="star-1" type="radio" onChange={handleStarClick} checked={review.rating === 1} name="rating" value="1" disabled={disabledForm}/>
            <label className="rating__label" htmlFor="star-1">Rating 1</label>

            <input className="rating__input" id="star-2" type="radio" onChange={handleStarClick} checked={review.rating === 2} name="rating" value="2" disabled={disabledForm}/>
            <label className="rating__label" htmlFor="star-2">Rating 2</label>

            <input className="rating__input" id="star-3" type="radio" onChange={handleStarClick} checked={review.rating === 3} name="rating" value="3" disabled={disabledForm}/>
            <label className="rating__label" htmlFor="star-3">Rating 3</label>

            <input className="rating__input" id="star-4" type="radio" onChange={handleStarClick} checked={review.rating === 4} name="rating" value="4" disabled={disabledForm}/>
            <label className="rating__label" htmlFor="star-4">Rating 4</label>

            <input className="rating__input" id="star-5" type="radio" onChange={handleStarClick} checked={review.rating === 5} name="rating" value="5" disabled={disabledForm} />
            <label className="rating__label" htmlFor="star-5">Rating 5</label>

            <input className="rating__input" id="star-6" type="radio" onChange={handleStarClick} checked={review.rating === 6} name="rating" value="6" disabled={disabledForm}/>
            <label className="rating__label" htmlFor="star-6">Rating 6</label>

            <input className="rating__input" id="star-7" type="radio" onChange={handleStarClick} checked={review.rating === 7} name="rating" value="7" disabled={disabledForm} />
            <label className="rating__label" htmlFor="star-7">Rating 7</label>

            <input className="rating__input" id="star-8" type="radio" onChange={handleStarClick} checked={review.rating === 8} name="rating" value="8" disabled={disabledForm} />
            <label className="rating__label" htmlFor="star-8">Rating 8</label>

            <input className="rating__input" id="star-9" type="radio" onChange={handleStarClick} checked={review.rating === 9} name="rating" value="9" disabled={disabledForm}/>
            <label className="rating__label" htmlFor="star-9">Rating 9</label>

            <input className="rating__input" id="star-10" type="radio" onChange={handleStarClick} checked={review.rating === 10} name="rating" value="10" disabled={disabledForm}/>
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
            maxLength={MAX_REVIEW_LENGTH}
            disabled={disabledForm}
          >
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" disabled={isSubmitDisabled || disabledForm}>Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ReviewForm;
