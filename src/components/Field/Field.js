import 'react-select/dist/react-select.css';
import './field.scss';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { fieldSelector } from 'src/selectors';
import { changeFieldType, changeFieldName, changeFieldIsRequired } from 'src/actions';
import OptionList from 'src/components/OptionList';
import { removeField } from 'src/actions';

import {
  dragFieldDrop
} from 'src/actions';

import { compose } from 'redux';
import { DragSource } from 'react-dnd';
import { DropTarget } from 'react-dnd';

const fieldSource = {
  beginDrag({
    field,
    sectionId
  }) {
    return {
      item: {
        field,
        sectionId
      },
    };
  }
};

const fieldTarget = {
  drop({
    dragFieldDrop,
    field,
    sectionId
  }, monitor) {
    const item = monitor.getItem().item;
    dragFieldDrop(field.id, sectionId, item.field.id, item.sectionId);
  },

  canDrop(props, monitor) {
    const item = monitor.getItem().item;
    if(!props.field) {
      return false;
    }

    if(!item.field) {
      return false;
    }
    return item.field.id !== props.field.id;
  }
};

class Field extends Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);

    const {
      field: {
        id,
        type,
        name,
        configs,
        isRequired,
        defaultValue: value,
      }
    } = props;

    this.state = {
      id,
      type,
      name,
      configs: configs || {},
      value,
      isRequired,
    };
  }

  getInput({ id, type, value, configs }) {
    return null;
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
        name,
        configs,
        isRequired,
        defaultValue: value,
      }
    } = newProps;

    this.setState({
      id,
      type,
      name,
      configs,
      isRequired,
      value,
    });
  }

  render() {
    const {
      id,
      type,
      name,
      configs,
      value,
      isRequired,
    } = this.state;

    const {
      changeFieldType,
      sectionId,
      connectDropTarget,
      connectDragSource,
      isOver,
      canDrop,
    } = this.props;

    return connectDropTarget(connectDragSource(
      <div className={`
        Field
        ${ isOver && canDrop ? "Field--insert" : ""}
      `}>
        <div className="row">
          <input type="text" defaultValue={name} onChange={(e) => {
                changeFieldName(id, e.target.value)
              }}/>
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
            <label htmlFor={`filed-is-required-${id}`}>
              <input
                defaultValue={isRequired}
                type="checkbox"
                id={`filed-is-required-${id}`}
                onChange={e => {
                  console.log(!!e.target.checked);
                  this.props.changeFieldIsRequired(id, !!e.target.checked);
                }}
              />
              Required?
            </label>
          </div>
          <button onClick={() => this.props.removeField(id, sectionId) }>&times;</button>
        </div>

        {this.showOptions(type) &&
          <div className="field-options">
            <OptionList options={configs.options} fieldId={id}/>
          </div>
        }
      </div>
    ));
  }
}

const mapStateToProps = (state, { fieldId }) => {
  return {
    field: fieldSelector(state, fieldId)
  };
}

export default compose(
  connect(mapStateToProps, {
    changeFieldName,
    changeFieldType,
    changeFieldIsRequired,
    removeField,
    dragFieldDrop
  }),
  DropTarget('Field', fieldTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  })),
  DragSource('Field', fieldSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(Field);
