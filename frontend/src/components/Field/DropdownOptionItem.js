import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field } from 'src/components/Field';
import { fieldSelector } from 'src/selectors';
import Select from 'react-select';
import { sectionsAvailableSelector } from 'src/selectors';

class DropdownOptionItem extends Component {
  constructor(props) {
    super(props);

    const {
      option: {
        id,
        label,
        triggerSectionId: selected
      },
      sections
    } = props;

    this.state = {
      id,
      label,
      sections,
      selected
    };
  }

  render() {
    const {
      id,
      label,
      sections,
      selected
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
      </li>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { ids, records } = sectionsAvailableSelector(state);

  return {
    sections:
      ids
        .map(id => ({
          value: records[id].id,
          label: records[id].name,
        }))
        .filter(({label}) => label !== 'Main')
  };
}

export default connect(mapStateToProps, {})(DropdownOptionItem);
