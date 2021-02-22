import {Link} from 'react-router-dom';
import {Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {resetGame} from '../../store/action';
import {State} from '../../types/state';
import {Actions} from '../../types/action';

type WinScreenProps = {
  onReplayButtonClick: () => void;
};

const mapStateToProps = ({step, mistakes}: State) => ({
  questionsCount: step,
  mistakesCount: mistakes,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onResetGame() {
    dispatch(resetGame());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & WinScreenProps;

function WinScreen(props: ConnectedComponentProps): JSX.Element {
  const {questionsCount, mistakesCount, onReplayButtonClick, onResetGame} = props;
  const correctlyQuestionsCount = questionsCount - mistakesCount;

  return (
    <section className="result">
      <div className="result-logout__wrapper">
        <Link className="result-logout__link" to="/">Выход</Link>
      </div>
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">Вы ответили правильно на {correctlyQuestionsCount} вопросов и совершили {mistakesCount} ошибки</p>
      <button
        onClick={() => {
          onResetGame();
          onReplayButtonClick();
        }}
        className="replay"
        type="button"
      >
        Сыграть ещё раз
      </button>
    </section>
  );
}

export {WinScreen};
export default connector(WinScreen);
