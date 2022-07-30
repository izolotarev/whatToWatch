import { FormEvent, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AppRoute, AuthorizationStatus, HeaderClass, PageScreen } from '../../const/const';
import { useAppDispatch } from '../../hooks/hooks';
import { login } from '../../store/actions/api-actions';
import { getAuthorizationStatus } from '../../store/reducers/user/user-selectors';
import { validate } from '../../utils/utils';
import Footer from '../footer/footer';
import Header from '../header/header';

export const INVALID_LOGIN_MESSAGE = 'Invalid email or password';

function Login():JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const isValidLogin = validate(loginRef.current?.value, passwordRef.current?.value);
    if (!isValidLogin) {
      toast.info(INVALID_LOGIN_MESSAGE);
      return;
    }
    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(login(
        loginRef.current.value,
        passwordRef.current.value
      ));
    }
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.ROOT} />;
  }

  return (
    <div className="user-page">

      <Header headerClass={HeaderClass.USER_PAGE} page={PageScreen.Login}/>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" method="post" onSubmit={handleSubmit}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                ref={loginRef}
                required
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                ref={passwordRef}
                required
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <Footer/>
    </div>
  );
}

export default Login;
