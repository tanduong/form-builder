import { CHANGE_FIELD } from 'src/actions';
import { ADD_FIELD, ADD_OPTION, REMOVE_OPTION } from 'src/actions';

const TEXT_INPUT = 'Text';
const DROPDOWN = 'Dropdown';

const defaultConfigs = {
  [TEXT_INPUT]: {
    configs: {}
  },
  [DROPDOWN]: {
    configs: {
      options: [
      ]
    },
  }
}

const defaultField = {
  type: TEXT_INPUT,
  ...defaultConfigs[TEXT_INPUT]
};

const handleAction = {
  [CHANGE_FIELD]: ({
    records,
    ids
  }, {
    fieldId,
    updatedData
  }) => {
    let newRecord = {};
    if(updatedData.type) {
      newRecord = defaultConfigs[updatedData.type];
    }

    newRecord = {
      ...newRecord,
      ...records[fieldId],
      ...updatedData
    };

    return {
      records: {
        ...records,
        [fieldId]: newRecord
      },
      ids
    }
  },
  [ADD_FIELD]: ({
    records,
    ids
  }, {
    id,
    settings
  }) => {
    return {
      records: {
        ...records,
        [id]: {
          ...defaultField,
          ...settings,
          id
        }
      },
      ids: [].concat(ids, [id])
    };
  },

  [ADD_OPTION]: ({
    records,
    ids
  }, {
    fieldId,
    id
  }) => {
    const record = records[fieldId];

    if(record.type !== DROPDOWN) {
      return {
        records,
        ids
      };
    }

    const updatedRecord = {
      ...record,
      configs: {
        options: [...record.configs.options, id]
      }
    };

    return {
      records: {
        ...records,
        [fieldId]: updatedRecord
      },
      ids
    }
  },

  [REMOVE_OPTION]: ({
    records,
    ids
  }, {
    fieldId,
    id
  }) => {
    const record = records[fieldId];

    if(record.type !== DROPDOWN) {
      return {
        records,
        ids
      };
    }

    const updatedRecord = {
      ...record,
      configs: {
        options: record.configs.options.filter(optionId => optionId !== id)
      }
    };

    return {
      records: {
        ...records,
        [fieldId]: updatedRecord
      },
      ids
    }
  }
};

export default (state = {}, action) => (
  (handleAction[action.type] || (state => state))(state, action)
);
