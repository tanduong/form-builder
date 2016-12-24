import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field } from 'src/components/Field';
import { fieldSelector } from 'src/selectors';
import Select from 'react-select';
import { sectionsAvailableSelector } from 'src/selectors';
import { removeOption } from 'src/actions';

class DropdownOptionItem extends Component {
  constructor(props) {
    super(props);

    const {
      option: {
        id,
        label,
        triggerSectionId: selected
      },
      sections,
      fieldId
    } = props;

    this.state = {
      id,
      label,
      sections,
      selected,
      fieldId
    };
  }

  render() {
    const {
      id,
      label,
      sections,
      selected,
      fieldId
    } = this.state;

    return (
      <li className="DropdownOptionItem">
        <div className="option-item-label">
          {label}
        </div>
        <div className="option-item-trigger">
          <Select
            name={`option-item-trigger-${id}`}
            options={sections}
            value={selected}
            onChange={({value: selected}) => {
              console.log(selected);
              this.setState({ selected });
            }}
          />
        </div>
        <button onClick={() => this.props.removeOption(id, fieldId) }>&times;</button>
      </li>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { ids, records } = sectionsAvailableSelector(state);

  return {
    sections:
      ids
        .filter(id => records[id].name !== 'Main')
        .map(id => ({
          value: records[id].id,
          label: `Add Section: ${records[id].name}`,
        }))
  };
}

export default connect(mapStateToProps, {
  removeOption
})(DropdownOptionItem);
