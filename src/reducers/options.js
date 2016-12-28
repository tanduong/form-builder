// REMOVE_OPTION
import { ADD_OPTION, CHANGE_OPTION } from 'src/actions';

const handleAction = {
  [ADD_OPTION]: ({
    records,
    ids
  }, {
    id
  }) => {
    const newOption = {
      id,
      // What value this should be?
      value: 'xxx',
      name: 'Untitled option',
      triggerSectionId: -1
    };

    return {
      records: {
        ...records,
        [id]: newOption
      },
      ids: [...ids, id]
    }
  },

  [CHANGE_OPTION]: ({
    records,
    ids
  }, {
    id,
    updatedData
  }) => {
    let newRecord = {
      ...records[id],
      ...updatedData
    };

    return {
      records: {
        ...records,
        [id]: newRecord
      },
      ids
    }
  },
};

export default (state = {}, action) => (
  (handleAction[action.type] || (state => state))(state, action)
);
