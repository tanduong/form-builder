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
      title: "Hello"
    },
    sections: {
      records: {
        1: {
          id: 1,
          type: "Standard",
          name: "Main",
          fields: [1, 2]
        },
        2: {
          id: 2,
          type: "Conditional",
          name: "Section A",
          fields: [3, 4]
        },
        3: {
          id: 3,
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
          id: 1,
          type: "Text",
          label: "Name",
          isRequired: true,
        },
        2: {
          id: 2,
          type: "Dropdown",
          label: "Trigger",
          isRequired: true,
          configs: {
            optionGroup: 1,
            options: [
              { id: 1, value: 'one', label: 'One', triggerSectionId: 2 },
              { id: 2, value: 'two', label: 'Two', triggerSectionId: 3 }
            ]
          },
          defaultValue: 'one'
        },
        3: {
          id: 3,
          type: "Text",
          label: "Name 3",
          isRequired: true,
        },
        4: {
          id: 4,
          type: "Text",
          label: "Name 4",
          isRequired: true,
        },
        5: {
          id: 5,
          type: "TextInput",
          label: "Name 5",
          isRequired: true,
        },
      },
      ids: [1, 2, 3, 4, 5]
    },
    prebuiltFields: {
      records: {
        1: {
          id: 1,
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
