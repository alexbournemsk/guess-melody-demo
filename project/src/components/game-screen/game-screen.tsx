import {Navigate} from 'react-router-dom';
import {Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {checkUserAnswer, incrementStep} from '../../store/action';
import {AppRoute, GameType, MAX_MISTAKE_COUNT} from '../../const';
import {State} from '../../types/state';
import {Actions} from '../../types/action';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import Mistakes from '../mistakes/mistakes';
import {QuestionArtist, QuestionGenre, Question, UserAnswer} from '../../types/question';
import withAudioPlayer from '../../hocs/with-audio-player/with-audio-player';
import {getQuestions} from '../../store/game-data/selectors';
import {getStep, getMistakeCount} from '../../store/game-process/selectors';

const ArtistQuestionScreenWrapped = withAudioPlayer(ArtistQuestionScreen);
const GenreQuestionScreenWrapped = withAudioPlayer(GenreQuestionScreen);

const mapStateToProps = (state: State) => ({
  step: getStep(state),
  mistakes: getMistakeCount(state),
  questions: getQuestions(state),
});

// Без использования bindActionCreators
const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onUserAnswer(question: Question, userAnswer: UserAnswer) {
    dispatch(incrementStep());
    dispatch(checkUserAnswer(question, userAnswer));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function GameScreen(props: PropsFromRedux): JSX.Element {
  const {questions, step, onUserAnswer, mistakes} = props;
  const question = questions[step];

  if (mistakes >= MAX_MISTAKE_COUNT) {
    return (
      <Navigate to={AppRoute.Lose} />
    );
  }

  if (step >= questions.length || !question) {
    return (
      <Navigate to={AppRoute.Result} />
    );
  }

  switch (question.type) {
    case GameType.Artist:
      return (
        <ArtistQuestionScreenWrapped
          key={step}
          question={question as QuestionArtist}
          onAnswer={onUserAnswer}
        >
          <Mistakes count={mistakes} />
        </ArtistQuestionScreenWrapped>
      );
    case GameType.Genre:
      return (
        <GenreQuestionScreenWrapped
          key={step}
          question={question as QuestionGenre}
          onAnswer={onUserAnswer}
        >
          <Mistakes count={mistakes} />
        </GenreQuestionScreenWrapped>
      );
    default:
      return <Navigate to={AppRoute.Root} />;
  }
}

export {GameScreen};
export default connector(GameScreen);
