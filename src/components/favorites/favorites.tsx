import { HeaderClass, PageScreen } from '../../const/const';
import { MovieType } from '../../types/types';
import Footer from '../footer/footer';
import Header from '../header/header';
import MovieList from '../movie-list/movie-list';

type FavoritesProps = {
  favoriteMovies: MovieType[];
}

function Favorites({favoriteMovies}:FavoritesProps): JSX.Element {
  return (
    <div className="user-page">
      <Header headerClass={HeaderClass.USER_PAGE} page={PageScreen.Favorites} isWithUserNavigation/>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <MovieList movies={favoriteMovies} />
      </section>

      <Footer/>
    </div>
  );
}

export default Favorites;
