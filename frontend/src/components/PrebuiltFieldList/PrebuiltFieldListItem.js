import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field } from 'src/components/Field';
import { fieldSelector } from 'src/selectors';

class PrebuiltFieldListItem extends Component {
  render() {
    const {
      prebuiltField
    } = this.props;

    return (
      <li className="PrebuiltFieldListItem">
        {prebuiltField.label}
      </li>
    )
  }
}

const mapStateToProps = (state, { prebuiltFieldId }) => {
  return {
    prebuiltField: fieldSelector(state, prebuiltFieldId)
  };
}

export default connect(mapStateToProps, {})(PrebuiltFieldListItem);
