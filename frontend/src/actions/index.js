import uuidV4 from 'uuid/v4';

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';
export const CHANGE_FIELD_TYPE = 'CHANGE_FIELD_TYPE';
export const ADD_SECTION = 'ADD_SECTION';
export const ADD_FIELD = 'ADD_FIELD';

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
});

export const changeFieldType = (fieldId, newFieldType) => ({
  type: CHANGE_FIELD_TYPE,
  fieldId,
  newFieldType
});

export const createSection = (name) => ({
  type: ADD_SECTION,
  name,
  id: uuidV4()
});

export const addField = (sectionId) => ({
  type: ADD_FIELD,
  sectionId,
  id: uuidV4()
});
