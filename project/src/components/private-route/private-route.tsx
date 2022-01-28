import {Navigate} from 'react-router-dom';
import {RouteProps} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
// import {History} from 'history';
import {State} from '../../types/state';
import {AppRoute, AuthorizationStatus} from '../../const';
import {getAuthorizationStatus} from '../../store/user-process/selectors';

// type RenderFuncProps = {
//   history: History<unknown>;
// }

type PrivateRouteProps = RouteProps & {
  children: JSX.Element;
  // render: (props: RenderFuncProps) => JSX.Element;
  authorizationStatus: AuthorizationStatus;
}

const mapStateToProps = (state: State) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PrivateRouteProps;

function PrivateRoute(props: ConnectedComponentProps): JSX.Element {
  const {authorizationStatus, children} = props;

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

export {PrivateRoute};
export default connector(PrivateRoute);
