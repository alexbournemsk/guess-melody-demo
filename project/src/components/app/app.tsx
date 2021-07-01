import {connect, ConnectedProps} from 'react-redux';
import {Route, Routes} from 'react-router-dom';
import {AppRoute, MAX_MISTAKE_COUNT} from '../../const';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import AuthScreen from '../auth-screen/auth-screen';
import GameOverScreen from '../game-over-screen/game-over-screen';
import WinScreen from '../win-screen/win-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import GameScreen from '../game-screen/game-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import {isCheckedAuth} from '../../game';
import {State} from '../../types/state';

const mapStateToProps = ({USER, DATA}: State) => ({
  authorizationStatus: USER.authorizationStatus,
  isDataLoaded: DATA.isDataLoaded,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App(props: PropsFromRedux): JSX.Element {
  const {authorizationStatus, isDataLoaded} = props;

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Routes>
      <Route
        path={AppRoute.Root}
        element={<WelcomeScreen errorsCount={MAX_MISTAKE_COUNT} />}
      />
      <Route
        path={AppRoute.Login}
        element={<AuthScreen />}
      />
      <Route
        path={AppRoute.Result}
        element={
          <PrivateRoute>
            <WinScreen />
          </PrivateRoute>
          // onReplayButtonClick={() => history.push(AppRoute.Game)}
        }
      />
      <Route
        path={AppRoute.Lose}
        element={<GameOverScreen />}
        // onReplayButtonClick={() => history.push(AppRoute.Game)}
      />
      <Route
        path={AppRoute.Game}
        element={
          <GameScreen />
        }
      />
      <Route
        path="*"
        element={<NotFoundScreen />}
      />
    </Routes>
  );
}

export {App};
export default connector(App);
