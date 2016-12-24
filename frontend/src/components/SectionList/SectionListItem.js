import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field } from 'src/components/Field';
import { sectionSelector } from 'src/selectors';

class SectionListItem extends Component {
  render() {
    const {
      section
    } = this.props;

    return (
      <li className="SectionListItem">
        {section.name}
      </li>
    )
  }
}

const mapStateToProps = (state, { sectionId }) => {
  return {
    section: sectionSelector(state, sectionId)
  };
}

export default connect(mapStateToProps, {})(SectionListItem);
