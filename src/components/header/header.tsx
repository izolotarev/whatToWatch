import { Link, useLocation } from 'react-router-dom';
import { AppRoute, PageScreen } from '../../const/const';
import { MovieType } from '../../types/types';
import UserNavigation from '../user-navigation/user-navigation';

type HeaderProps = {
  isWithUserNavigation?: boolean;
  headerClass: string;
  page?: PageScreen;
}

function Header({isWithUserNavigation, headerClass, page}:HeaderProps):JSX.Element {
  const location = useLocation() as {state: MovieType};
  const movie = location.state;

  return (
    <header className={`page-header ${headerClass}`}>
      <div className="logo">
        <Link className="logo__link" to={AppRoute.ROOT}>
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>
      { page === PageScreen.Favorites ? <h1 className="page-title user-page__title">My list</h1> : '' }
      { page === PageScreen.Login ? <h1 className="page-title user-page__title">Sign in</h1> : '' }
      {
        page === PageScreen.AddReview
          ?
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="#" className="breadcrumbs__link">{movie?.name}</a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
          :
          ''
      }
      { isWithUserNavigation ? <UserNavigation /> : '' }
    </header>
  );
}

export default Header;
