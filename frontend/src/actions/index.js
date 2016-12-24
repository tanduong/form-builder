export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';
export const CHANGE_FIELD_TYPE = 'CHANGE_FIELD_TYPE';

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
});

export const changeFieldType = (fieldId, newFieldType) => ({
  type: CHANGE_FIELD_TYPE,
  fieldId,
  newFieldType
});
