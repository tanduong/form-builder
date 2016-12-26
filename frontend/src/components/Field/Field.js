import 'react-select/dist/react-select.css';
import './field.scss';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { fieldSelector } from 'src/selectors';
import { changeFieldType } from 'src/actions';
import OptionList from 'src/components/OptionList';
import { removeField } from 'src/actions';

class Field extends Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);

    const {
      field: {
        id,
        type,
        label,
        configs,
        isRequired,
        defaultValue: value,
      }
    } = props;

    this.state = {
      id,
      type,
      label,
      configs: configs || {},
      value,
      isRequired,
    };
  }

  getInput({ id, type, value, configs }) {
    console.log(type);
    switch(type) {
      case 'Text':
        return <input type="text"/>;
      case 'Dropdown':

        return (
          <Select
            name={`field-value-${id}`}
            options={configs.options}
            value={value}
            onChange={({value: value}) => {
              this.setState({value});
            }}
          />
        );
      default:
        return null;
    }
  }

  showOptions(type) {
    return type === 'Dropdown';
  }

  componentWillReceiveProps(newProps) {
    const {
      field: {
        id,
        type,
        label,
        configs,
        isRequired,
        defaultValue: value,
      }
    } = newProps;

    this.setState({
      id,
      type,
      label,
      configs,
      isRequired,
      value,
    });
  }

  render() {
    const {
      id,
      type,
      label,
      configs,
      value,
      isRequired,
    } = this.state;

    const {
      changeFieldType,
      sectionId
    } = this.props;

    return (
      <div className="Field">
        <div className="row">
          <label htmlFor="">{label}</label>
          <div className="field-sample">
            { this.getInput({ id, type, value, configs }) }
          </div>
          <div className="field-type">
            <Select
              name={`field-type-${id}`}
              options={[
                { value: "Text", label: 'Text Input' },
                { value: "Dropdown", label: 'Dropdown' }
              ]}
              value={type}
              onChange={({value: type}) => {
                changeFieldType(id, type)
              }}
            />
          </div>
          <div className="field-is-required">
            <Select
              name={`filed-is-required-${id}`}
              options={[
                { value: true, label: 'True' },
                { value: false, label: 'False' }
              ]}
              value={isRequired}
              onChange={({value: isRequired}) => {
                this.setState({isRequired});
              }}
            />
          </div>
          <button onClick={() => this.props.removeField(id, sectionId) }>&times;</button>
        </div>

        {this.showOptions(type) &&
          <div className="field-options">
            <OptionList options={configs.options} fieldId={id}/>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, { fieldId }) => {
  return {
    field: fieldSelector(state, fieldId)
  };
}

export default connect(mapStateToProps, {
  changeFieldType,
  removeField
})(Field);
