import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom/cjs/react-router-dom.min';

const WelcomeScreen = (props) => {
  const {errorsCount} = props;

  return (
    <section className="welcome">
      <div className="welcome__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
      </div>
      <button className="welcome__button"
        onClick = {()=>{
          console.log('redirect');
          return (
            <Redirect to="/game" />
          );
        }
        }
      >
        <span className="visually-hidden">Начать игру</span></button>
      <h2 className="welcome__rules-title">Правила игры</h2>
      <p className="welcome__text">Правила просты:</p>
      <ul className="welcome__rules-list">
        <li>Нужно ответить на все вопросы.</li>
        <li>Можно допустить {errorsCount} ошибки.</li>
      </ul>
      <p className="welcome__text">Удачи!</p>
    </section>
  );
};

WelcomeScreen.propTypes = {
  errorsCount: PropTypes.number.isRequired,
};

export default WelcomeScreen;
