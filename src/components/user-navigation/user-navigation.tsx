import { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import browserHistory from '../../browser-history/browser-history';
import { AppRoute, AuthorizationStatus } from '../../const/const';
import { useAppDispatch } from '../../hooks/hooks';
import { logout } from '../../store/actions/api-actions';
import { getAuthorizationStatus, getAvatarUrl } from '../../store/reducers/user/user-selectors';

function UserNavigation():JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const avatarUrl = useSelector(getAvatarUrl);

  const dispatch = useAppDispatch();

  const handleLogoutClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(logout());
  };

  const handleAvatarClick = (evt: MouseEvent<HTMLElement>) => {
    browserHistory.push(AppRoute.FAVORITES);
  };

  return (
    <div className="user-block">
      {
        authorizationStatus === AuthorizationStatus.Auth
          ?
          <>
            <div className="user-block__avatar" onClick={handleAvatarClick}>
              <img src={avatarUrl} alt="User avatar" width="63" height="63" />
            </div>
            <a href="/" className="user-block__link" onClick={handleLogoutClick}>Sign out</a>
          </>
          :
          <Link to={AppRoute.LOGIN} className="user-block__link">Sign in</Link>
      }
    </div>
  );
}

export default UserNavigation;
