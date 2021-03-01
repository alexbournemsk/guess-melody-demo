import {Navigate} from 'react-router-dom';
import {RouteProps} from 'react-router-dom';
import {useSelector} from 'react-redux';
// import {History} from 'history';
import {AppRoute, AuthorizationStatus} from '../../const';
import {getAuthorizationStatus} from '../../store/user-process/selectors';

// type RenderFuncProps = {
//   history: History<unknown>;
// }

type PrivateRouteProps = RouteProps & {
  children: JSX.Element
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {children} = props;
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />

  // <Route
  //   exact={exact}
  //   path={path}
  //   render={(routeProps) => (
  //     authorizationStatus === AuthorizationStatus.Auth
  //       ? render(routeProps)
  //       : <Redirect to={AppRoute.Login} />
  //   )}
  // />
  );
}

export default PrivateRoute;
