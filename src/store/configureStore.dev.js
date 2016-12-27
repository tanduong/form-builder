import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga'
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import DevTools from '../components/DevTools';
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
        createLogger()
      ),
      DevTools.instrument()
    )
  )

  store.subscribe(() => {
    saveState(store.getState());
  });

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store
}

export default configureStore
