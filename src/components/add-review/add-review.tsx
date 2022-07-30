import { useLocation, } from 'react-router-dom';
import { HeaderClass, PageScreen } from '../../const/const';
import { MovieType } from '../../types/types';
import Header from '../header/header';
import NotFound from '../not-found/not-found';
import ReviewForm from '../review-form/review-form';

function AddReview():JSX.Element {
  const location = useLocation() as {state: MovieType};
  const movie = location.state;

  if (!movie) {
    return (
      <NotFound/>
    );
  }

  return (
    <section className="movie-card movie-card--full" style={{background: movie.backgroundColor}}>
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={movie.backgroundImage} alt={movie.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>
        {/* WIP breadcrumbs */}
        <Header page={PageScreen.AddReview} headerClass={HeaderClass.NO_CLASS} isWithUserNavigation/>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={movie.posterImage} alt={movie.name} width="218" height="327" />
        </div>
      </div>

      <ReviewForm/>
    </section>
  );
}

export default AddReview;
