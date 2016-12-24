import './section.scss';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field } from 'src/components/Field';
import { sectionSelector } from 'src/selectors';
import { addField } from 'src/actions';

class Section extends Component {
  constructor(props) {
    super(props);

    const {
      section
    } = props;

    this.state = {
      section
    };
  }

  componentWillReceiveProps(props) {
    const {
      section
    } = props;

    this.setState({
      section
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    debugger;
    if (this.props.section.fields !== nextProps.section.fields) {
      return true;
    }
    if (this.state.section.fields !== nextState.section.fields) {
      return true;
    }
    return false;
  }

  render() {
    const {
      section
    } = this.state;

    return (
      <div className="Section">
        {section.name}
        {section.fields.map(fieldId => (
          <Field fieldId={fieldId} sectionId={section.id} key={`field-${fieldId}`}/>
        ))}
        <div className="add-field">
          <button onClick={e => this.props.addField(section.id)}>Add Field</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, { sectionId }) => {
  return {
    section: sectionSelector(state, sectionId)
  };
}

export default connect(mapStateToProps, {
  addField
})(Section);
