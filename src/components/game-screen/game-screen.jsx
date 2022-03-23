import React from 'react';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import PropTypes from 'prop-types';
import {useState} from 'react';
import {FIRST_GAME_STEP} from '../../const.js';
import {Redirect} from 'react-router-dom';
import {GameType} from '../../const.js';

const GameScreen = (props) => {
  const [step, setStep] = useState(0);
  const {questions} = props;
  const question = questions[step];

  if (step >= questions.length || !question) {
    return (
      <Redirect to="/" />
    );
  }

  switch (question.type) {
    case GameType.ARTIST:
      return (
        <ArtistQuestionScreen
          question={question}
          onAnswer={() => setStep((prevStep) => prevStep + 1)}
        />
      );
    case GameType.GENRE:
      return (
        <GenreQuestionScreen
          question={question}
          onAnswer={() => setStep((prevStep) => prevStep + 1)}
        />
      );
  }

  return <Redirect to="/" />;
};


export default GameScreen;

GameScreen.propTypes = {
  questions: PropTypes.array.isRequired,
};
