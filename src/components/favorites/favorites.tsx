import { useSelector } from 'react-redux';
import { HeaderClass, PageScreen } from '../../const/const';
import { getFavoriteMovies } from '../../store/reducers/movies/movies-selectors';
import Footer from '../footer/footer';
import Header from '../header/header';
import MovieList from '../movie-list/movie-list';


function Favorites(): JSX.Element {
  const favoriteMovies = useSelector(getFavoriteMovies);

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
