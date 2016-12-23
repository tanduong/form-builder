import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from './components/Root';
import configureStore from './store/configureStore';
import rootSaga from './sagas';

const preloadedState = {
};

const store = configureStore(preloadedState);
store.runSaga(rootSaga);

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);
