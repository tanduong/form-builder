import './form.scss';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Section from 'src/components/Section';
import { formSelector } from 'src/selectors';

class Form extends Component {
  static propTypes = {
  };

  render() {
    const {
      form: {
        sections
      }
    } = this.props;

    return (
      <div className="Form">
        {sections.map(sectionId => (
          <Section sectionId={sectionId} key={`section-${sectionId}`}/>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    form: formSelector(state)
  };
}

export default connect(mapStateToProps, {})(Form);
