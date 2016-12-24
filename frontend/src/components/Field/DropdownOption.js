import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DropdownOptionItem from './DropdownOptionItem';
import { prebuiltFieldsAvailableSelector } from 'src/selectors';

class DropdownOption extends Component {
  static propTypes = {
  };

  render() {
    const {
      options,
      fieldId
    } = this.props;

    return (
      <ul className="DropdownOption">
        {options.map(option => (
          <DropdownOptionItem option={option} fieldId={fieldId} key={`option-item-${option.id}`}/>
        ))}
      </ul>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
}

export default connect(mapStateToProps, {})(DropdownOption);
