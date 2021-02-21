import {ActionType} from './action';
import questions from '../mocks/questions';
import {FIRST_GAME_STEP, MAX_MISTAKE_COUNT} from '../const';

const initialState = {
  mistakes: 0,
  step: FIRST_GAME_STEP,
  questions,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      let nextStep = state.step + action.payload;

      return {
        ...state,
        step: nextStep,
      };

    case ActionType.INCREMENT_MISTAKES:
      const mistakes = state.mistakes + action.payload;

      if (mistakes >= MAX_MISTAKE_COUNT) {
        return {
          ...initialState
        };
      }

      return {
        ...state,
        mistakes: state.mistakes + action.payload
      };

    case ActionType.RESET_GAME:
      return {
        ...initialState
      };
    case ActionType.LOAD_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };
  }

  return state;
};


export {reducer};
