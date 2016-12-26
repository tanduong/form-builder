export const formSelector = ({ entities: { form }}) => form;

export const sectionSelector = ({ entities: { sections } }, sectionId) => (
  sections.records[sectionId]
);

export const fieldSelector = ({ entities: { fields } }, fieldId) => (
  fields.records[fieldId]
);

export const optionSelector = ({ entities: { options } }, optionId) => (
  options.records[optionId]
);

export const prebuiltFieldSelector = (
  {
    entities: {
      prebuiltFields
    }
  },
  prebuiltFieldId
) => (
  prebuiltFields.records[prebuiltFieldId]
);

export const prebuiltFieldsAvailableSelector = ({
  entities: {
    prebuiltFields: {
      ids
    }
  }
}) => (
  ids
);

export const sectionsAvailableSelector = ({
  entities: {
    sections
  }
}) => (
  sections
);

export const sectionIdsAvailableSelector = ({
  entities: {
    sections: {
      ids
    }
  }
}) => (
  ids
);
