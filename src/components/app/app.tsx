import { Setting, AppRoute, AuthorizationStatus } from '../../const/const';
import Main from '../main/main';
import Login from '../login/login';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import RequireAuth from '../require-auth/require-auth';
import Favorites from '../favorites/favorites';
import Movie from '../movie/movie';
import AddReview from '../add-review/add-review';
import Player from '../player/player';
import NotFound from '../not-found/not-found';
import { MovieType } from '../../types/types';
import { ReviewType } from '../../types/types';

type AppProps = {
  movies: MovieType[],
  reviews: ReviewType[]
}

function App(props: AppProps): JSX.Element {
  const {movies, reviews} = props;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.ROOT} element={<Main movies={movies} cardsNumber={Setting.CARDS_NUMBER}/>}/>
        <Route path={AppRoute.LOGIN} element={<Login />}/>
        <Route path={AppRoute.FAVORITES} element={
          <RequireAuth authorizationStatus={AuthorizationStatus.Auth}>
            <Favorites favoriteMovies={movies}/>
          </RequireAuth>
        }
        />
        <Route path={`${AppRoute.MOVIES}/:id`} element={<Movie movie={movies[1]} reviews={reviews} movies={movies}/>}/>
        <Route path={`${AppRoute.MOVIES}/:id${AppRoute.ADD_REVIEW}`} element={<AddReview movie={movies[0]}/>}/>
        <Route path={`${AppRoute.PLAYER}/:id`} element={<Player/>}/>
        <Route path={'*'} element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
