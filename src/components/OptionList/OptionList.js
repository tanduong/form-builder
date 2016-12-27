import './option_list.scss';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Option from './Option';
import { prebuiltFieldsAvailableSelector } from 'src/selectors';
import { addOption } from 'src/actions';

class OptionList extends Component {
  static propTypes = {
  };

  render() {
    const {
      options,
      fieldId
    } = this.props;

    return (
      <ul className="OptionList">
        {options.map(optionId => (
          <Option optionId={optionId} fieldId={fieldId} key={`option-item-${optionId}`}/>
        ))}
        <li className="add-field">
          <button onClick={e => this.props.addOption(fieldId)}>Add Option</button>
        </li>
      </ul>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
}

export default connect(mapStateToProps, {
  addOption
})(OptionList);
