import './section.scss';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field } from 'src/components/Field';
import { sectionSelector } from 'src/selectors';

class Section extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    const {
      section
    } = this.props;

    return (
      <div className="Section">
        {section.name}
        {section.fields.map(fieldId => (
          <Field fieldId={fieldId} key={`field-${fieldId}`}/>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state, { sectionId }) => {
  return {
    section: sectionSelector(state, sectionId)
  };
}

export default connect(mapStateToProps, {})(Section);
