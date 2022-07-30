import { AppRoute, AuthorizationStatus } from '../../const/const';
import Main from '../main/main';
import Login from '../login/login';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from '../require-auth/require-auth';
import Favorites from '../favorites/favorites';
import Movie from '../movie/movie';
import AddReview from '../add-review/add-review';
import Player from '../player/player';
import NotFound from '../not-found/not-found';
import { useSelector } from 'react-redux';
import { getMoviesLoadingStatus, getMovies, getPromoLoadingStatus } from '../../store/reducers/movies/movies-selectors';
import LoadingScreen from '../loading-screen/loading-screen';

function App(): JSX.Element {
  const movies = useSelector(getMovies);
  const moviesLoaded = useSelector(getMoviesLoadingStatus);
  const isPromoLoaded = useSelector(getPromoLoadingStatus);

  if (!moviesLoaded || !isPromoLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Routes>
      <Route path={AppRoute.ROOT} element={<Main movies={movies} />}/>
      <Route path={AppRoute.LOGIN} element={<Login />}/>
      <Route path={AppRoute.FAVORITES} element={
        <RequireAuth authorizationStatus={AuthorizationStatus.Auth}>
          <Favorites favoriteMovies={movies}/>
        </RequireAuth>
      }
      />
      <Route path={`${AppRoute.MOVIES}/:id`} element={<Movie />}/>
      <Route path={`${AppRoute.MOVIES}/:id${AppRoute.ADD_REVIEW}`} element={<AddReview/>}/>
      <Route path={`${AppRoute.PLAYER}/:id`} element={<Player/>}/>
      <Route path={'*'} element={<NotFound/>}/>
    </Routes>
  );
}

export default App;
