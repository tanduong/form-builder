import { CHANGE_FIELD_TYPE } from 'src/actions';
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
  [CHANGE_FIELD_TYPE]: ({
    records,
    ids
  }, {
    fieldId,
    newFieldType
  }) => {
    const newRecord = {
      ...defaultConfigs[newFieldType],
      id: fieldId,
      label: records[fieldId].label,
      isRequired: records[fieldId].isRequired,
      type: newFieldType
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
    id
  }) => {
    return {
      records: {
        ...records,
        [id]: {
          ...defaultField,
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
      debugger;
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

    console.log(updatedRecord);
    debugger;

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
