import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga'
import rootReducer from '../reducers';
import merge from 'lodash/merge';
import {loadState, saveState} from './localStorage';

const configureStore = preloadedState => {
  const persistedState = loadState() || {};
  const initialState = merge({}, persistedState, preloadedState);
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        sagaMiddleware,
      )
    )
  )

  store.subscribe(() => {
    saveState(store.getState());
  });

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store
}

export default configureStore
