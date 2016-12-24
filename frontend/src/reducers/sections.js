import {
  ADD_SECTION,
  ADD_FIELD,
  REMOVE_FIELD
} from 'src/actions';

const handleAction = {
  [ADD_SECTION]: ({
      records,
      ids
    }, {
      id,
      name
    }) => {
    return {
      records: {
        ...records,
        [id]: {
          id,
          name,
          fields: []
        }
      },
      ids: [].concat(ids, [id])
    }
  },
  [ADD_FIELD]: ({
    records,
    ids
  }, {
    id,
    sectionId
  }) => {
    const updatedSection = {
      ...records[sectionId],
      fields: [].concat(records[sectionId].fields, [id])
    };

    return {
      records: {
        ...records,
        [sectionId]: updatedSection
      },
      ids
    };
  },
  [REMOVE_FIELD]: ({
    records,
    ids
  }, {
    fieldId,
    sectionId
  }) => {
    const updatedSection = {
      ...records[sectionId],
      fields: records[sectionId].fields.filter(id =>  fieldId != id)
    };

    return {
      records: {
        ...records,
        [sectionId]: updatedSection
      },
      ids
    };
  },
};

export default (state = {}, action) => (
  (handleAction[action.type] || (state => state))(state, action)
);
