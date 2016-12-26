import uuidV4 from 'uuid/v4';

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
});

export const CHANGE_FIELD_TYPE = 'CHANGE_FIELD_TYPE';

export const changeFieldType = (fieldId, newFieldType) => ({
  type: CHANGE_FIELD_TYPE,
  fieldId,
  newFieldType
});

export const ADD_SECTION = 'ADD_SECTION';

export const createSection = (name) => ({
  type: ADD_SECTION,
  name,
  id: uuidV4()
});

export const ADD_FIELD = 'ADD_FIELD';

export const addField = (sectionId) => ({
  type: ADD_FIELD,
  sectionId,
  id: uuidV4()
});

export const REMOVE_FIELD = 'REMOVE_FIELD';

export const removeField = (fieldId, sectionId) => ({
  type: REMOVE_FIELD,
  fieldId,
  sectionId,
});

export const ADD_OPTION = 'ADD_OPTION';

export const addOption = (fieldId) => ({
  type: ADD_OPTION,
  fieldId,
  id: uuidV4()
});

export const REMOVE_OPTION = 'REMOVE_OPTION';

export const removeOption = (id, fieldId) => ({
  type: REMOVE_OPTION,
  id,
  fieldId
});


