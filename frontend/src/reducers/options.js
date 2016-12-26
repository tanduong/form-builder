// REMOVE_OPTION
import { ADD_OPTION } from 'src/actions';

const handleAction = {
  [ADD_OPTION]: ({
    records,
    ids
  }, {
    id
  }) => {
    const newOption = {
      id,
      value: 'two',
      label: 'Two',
      triggerSectionId: null
    };

    return {
      records: {
        ...records,
        [id]: newOption
      },
      ids: [...ids, id]
    }
  }
};

export default (state = {}, action) => (
  (handleAction[action.type] || (state => state))(state, action)
);
