import { CHANGE_FIELD } from 'src/actions';
import { ADD_FIELD, ADD_OPTION, REMOVE_OPTION, DRAG_OPTION_DROP } from 'src/actions';

const TEXT_INPUT = 'Text';
const DROPDOWN = 'Dropdown';

const defaultConfigs = {
  [TEXT_INPUT]: {
    name: 'Untitled field',
    configs: {}
  },
  [DROPDOWN]: {
    name: 'Untitled field',
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
    if(updatedData.hasOwnProperty('type')) {
      newRecord = defaultConfigs[updatedData.type];
    }

    newRecord = {
      ...records[fieldId],
      ...newRecord,
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
  },
  [DRAG_OPTION_DROP]: ({
    records,
    ids
  }, {
    id,
    fieldId,
    dropedOptionId,
    dropedOptionFieldId
  }) => {
    let field;
    let newField;

    if(fieldId === dropedOptionFieldId) {
      field = records[fieldId];

      newField = {
        ...field,
        configs: {
          ...field.configs,
          options: [].concat(...field.configs.options.map(_id => {
            if(_id === id) {
              return [id, dropedOptionId];
            }

            if(_id === dropedOptionId) {
              return [];
            }

            return _id;
          }))
        }
      }
      return {
        records: {
          ...records,
          [fieldId]: newField
        },
        ids
      };
    } else {
      field = records[fieldId];
      newField = {
        ...field,
        configs: {
          ...field.configs,
          options: [].concat(...field.configs.options.map(_id =>
            _id === id ? [id, dropedOptionId] : _id
          ))
        }
      };
      let dropedOptionField = records[dropedOptionFieldId];
      let newDropedOptionField = {
        ...dropedOptionField,
        configs: {
          ...dropedOptionField.configs,
          options: dropedOptionField.configs.options.filter(_id => _id !== dropedOptionId)
        }
      }

      return {
        records: {
          ...records,
          [fieldId]: newField,
          [dropedOptionFieldId]: newDropedOptionField
        },
        ids
      }
    }
  }
};

export default (state = {}, action) => (
  (handleAction[action.type] || (state => state))(state, action)
);
