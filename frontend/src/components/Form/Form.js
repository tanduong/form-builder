import './form.scss';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Section from 'src/components/Section';
import {
  formSelector,
  sectionIdsAvailableSelector
} from 'src/selectors';

class Form extends Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);

    const {
      form,
      sections
    } = props;

    this.state = {
      form,
      sections
    };
  }

  componentWillReceiveProps(props) {
    const {
      form,
      sections
    } = props;

    console.log(form === this.state.form);

    this.setState({
      form,
      sections
    });
  }

  render() {
    const {
      form,
      sections
    } = this.state;

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
    form: formSelector(state),
    sections: sectionIdsAvailableSelector(state)
  };
}

export default connect(mapStateToProps, {})(Form);
