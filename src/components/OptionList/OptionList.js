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
    console.log(options);

    return (
      <ul className="OptionList">
        {options.map((optionId, index) => {
          console.log(optionId);
          return <Option optionId={optionId} fieldId={fieldId} key={`option-item-${optionId}`} index={index}/>
        }
        )}
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
