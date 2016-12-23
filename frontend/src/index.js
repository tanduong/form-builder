import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from './components/Root';
import configureStore from './store/configureStore';
import rootSaga from './sagas';

const preloadedState = {
  entities: {
    form: {
      sections: [1, 2, 3]
    },
    sections: {
      records: {
        1: {
          type: "Standard",
          name: "Main",
          fields: [1, 2]
        },
        2: {
          type: "Conditional",
          name: "Section A",
          fields: [3, 4]
        },
        3: {
          type: "Conditional",
          name: "Section B",
          fields: [5]
        },
      },
      ids: [1, 2, 3]
    },
    fields: {
      records: {
        1: {
          type: "TextInput",
          label: "Name",
          isRequired: true,
        },
        2: {
          type: "Dropdown",
          label: "Trigger",
          isRequired: true,
          values: ["trigger A", "trigger B"],
          triggers: {
            "trigger A": 2,
            "trigger B": 3,
          }
        },
        3: {
          type: "TextInput",
          label: "Name 3",
          isRequired: true,
        },
        4: {
          type: "TextInput",
          label: "Name 4",
          isRequired: true,
        },
        5: {
          type: "TextInput",
          label: "Name 5",
          isRequired: true,
        },
      }
    },
    prebuiltFields: {
      records: {
        1: {
          name: "Country",
          type: "TextInput",
          label: "Country",
          isRequired: true,
        }
      },
      ids: [1]
    }
  }
};

const store = configureStore(preloadedState);
store.runSaga(rootSaga);

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);
