import * as ActionTypes from '../actions';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import entities from './entities';

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return typeof action.error === 'string' ? action.error : JSON.stringify(action.error);
  }

  return state;
};

const rootReducer = combineReducers({
  entities,
  errorMessage,
  routing
});

export default rootReducer;
