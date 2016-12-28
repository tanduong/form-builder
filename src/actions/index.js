import uuidV4 from 'uuid/v4';

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
});

export const CHANGE_FIELD = 'CHANGE_FIELD';

export const changeFieldType = (fieldId, type) => ({
  type: CHANGE_FIELD,
  fieldId,
  updatedData: {
    type
  }
});

export const changeFieldName = (fieldId, name) => ({
  type: CHANGE_FIELD,
  fieldId,
  updatedData: {
    name
  }
});

export const changeFieldIsRequired = (fieldId, isRequired) => ({
  type: CHANGE_FIELD,
  fieldId,
  updatedData: {
    isRequired
  }
});

export const ADD_SECTION = 'ADD_SECTION';

export const createSection = (name) => ({
  type: ADD_SECTION,
  name,
  id: uuidV4()
});

export const REMOVE_SECTION = 'REMOVE_SECTION';

export const removeSection = (id) => ({
  type: REMOVE_SECTION,
  id
});

export const ADD_FIELD = 'ADD_FIELD';

export const addField = (sectionId, settings) => ({
  type: ADD_FIELD,
  sectionId,
  settings,
  id: uuidV4()
});

export const REMOVE_FIELD = 'REMOVE_FIELD';

export const removeField = (id, sectionId) => ({
  type: REMOVE_FIELD,
  id,
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

export const CHANGE_OPTION = 'CHANGE_OPTION';

export const changeOptionName = (id, name) => ({
  type: CHANGE_OPTION,
  id,
  updatedData: {
    name
  }
});

export const DRAG_OPTION_DROP = 'DRAG_OPTION_DROP';

export const dragOptionDrop = (id, fieldId, dropedOptionId, dropedOptionFieldId) => ({
  type: DRAG_OPTION_DROP,
  id,
  fieldId,
  dropedOptionId,
  dropedOptionFieldId
});

export const DRAG_FIELD_DROP = 'DRAG_FIELD_DROP';

export const dragFieldDrop = (id, sectionId, dropedFieldId, dropedFieldSectionId) => ({
  type: DRAG_FIELD_DROP,
  id,
  sectionId,
  dropedFieldId,
  dropedFieldSectionId
});
