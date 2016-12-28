import {
  ADD_SECTION,
  REMOVE_SECTION,
  ADD_FIELD,
  REMOVE_FIELD,
  DRAG_FIELD_DROP
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

  [REMOVE_SECTION]: ({
      records,
      ids
    }, {
      id
    }) => {
    const newRecords = Object.assign({}, records);
    delete newRecords[id];
    return {
      records: newRecords,
      ids: ids.filter(sectionId => sectionId !== id)
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
    id,
    sectionId
  }) => {
    const updatedSection = {
      ...records[sectionId],
      fields: records[sectionId].fields.filter(fieldId =>  fieldId != id)
    };

    return {
      records: {
        ...records,
        [sectionId]: updatedSection
      },
      ids
    };
  },
    [DRAG_FIELD_DROP]: ({
    records,
    ids
  }, {
    id,
    sectionId,
    dropedFieldId,
    dropedFieldSectionId
  }) => {
    let section;
    let newSection;

    if(sectionId === dropedFieldSectionId) {
      section = records[sectionId];

      newSection = {
        ...section,
        fields: [].concat(...section.fields.map(_id => {
          if(_id === id) {
            return [id, dropedFieldId];
          }

          if(_id === dropedFieldId) {
            return [];
          }

          return _id;
        }))
      };

      return {
        records: {
          ...records,
          [sectionId]: newSection
        },
        ids
      };
    } else {
      section = records[sectionId];
      if(section.fields.indexOf(dropedFieldId) > -1) {
        newSection = {
          ...section,
          fields: [].concat(...section.fields.map(_id =>
            _id === id ? [id, dropedFieldId] : _id
          ))
        };
      } else {
        newSection = {
          ...section,
          fields: [].concat(section.fields, [dropedFieldId])
        };
      }

      let dropedFieldSection = records[dropedFieldSectionId];
      let newDropedFieldSection = {
        ...dropedFieldSection,
        fields: dropedFieldSection.fields.filter(_id => _id !== dropedFieldId)
      }

      return {
        records: {
          ...records,
          [sectionId]: newSection,
          [dropedFieldSectionId]: newDropedFieldSection
        },
        ids
      };
    }
  }
};

export default (state = {}, action) => (
  (handleAction[action.type] || (state => state))(state, action)
);
