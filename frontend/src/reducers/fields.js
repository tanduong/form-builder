import { CHANGE_FIELD_TYPE } from 'src/actions';

const TEXT_INPUT = 'Text';
const DROPDOWN = 'Dropdown';

const defaultConfigs = {
  [TEXT_INPUT]: {
  },
  [DROPDOWN]: {
    configs: {
      options: [
        { value: 'Trump', label: 'Trump' },
        { value: 'Putin', label: 'Putin' }
      ]
    },
  }
}

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
  }
};

export default (state = {}, action) => (
  (handleAction[action.type] || (state => state))(state, action)
);
