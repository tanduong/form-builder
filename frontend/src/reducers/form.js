
const handleAction = {
};

export default (state = {}, action) => (
  (handleAction[action.type] || (state => state))(state, action)
);
