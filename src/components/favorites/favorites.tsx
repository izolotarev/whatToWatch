import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import { MovieType } from '../../types/movie';
import Footer from '../footer/footer';
import MovieList from '../movie-list/movie-list';

type FavoritesProps = {
  favoriteMovies: MovieType[];
}

function Favorites({favoriteMovies}:FavoritesProps): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link className="logo__link" to={AppRoute.ROOT}>
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <div className="user-block">
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </div>
        </div>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <MovieList movies={favoriteMovies} />
      </section>

      <Footer/>
    </div>
  );
}

export default Favorites;
