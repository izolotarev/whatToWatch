import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const/const';

type RequireAuthProps = {
  children: JSX.Element;
  authorizationStatus: AuthorizationStatus
}

export default function RequireAuth(props: RequireAuthProps) {
  const {children, authorizationStatus} = props;

  if (authorizationStatus === AuthorizationStatus.NoAuth) {
    return <Navigate to={AppRoute.LOGIN} />;
  }

  return children;
}
