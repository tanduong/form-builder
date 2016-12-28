import React, { Component, PropTypes, findDOMNode } from 'react';
import { connect } from 'react-redux';
import { Field } from 'src/components/Field';
import { fieldSelector } from 'src/selectors';
import Select from 'react-select';
import debounce from 'lodash.debounce';

import {
  sectionsAvailableSelector,
  optionSelector
} from 'src/selectors';

import {
  removeOption,
  changeOptionName
} from 'src/actions';

import {
  dragOptionDrop
} from 'src/actions';

import { compose } from 'redux';
import { DragSource } from 'react-dnd';
import { DropTarget } from 'react-dnd';

const optionSource = {
  beginDrag({
    option,
    fieldId,
    index
  }) {
    return {
      item: {
        option,
        fieldId,
        index
      },
    };
  }
};

const optionTarget = {
  drop({
    dragOptionDrop,
    option,
    fieldId
  }, monitor) {
    const item = monitor.getItem().item;
    dragOptionDrop(option.id, fieldId, item.option.id, item.fieldId);
    // props.addField(props.section.id, monitor.getItem().item);
  },

  canDrop(props, monitor) {
    const item = monitor.getItem();
    return item.item.option.id !== props.option.id;
  }
};

class Option extends Component {
  constructor(props) {
    super(props);

    const {
      option: {
        id,
        name,
        triggerSectionId: selected
      },
      sections,
      fieldId
    } = props;

    this.state = {
      id,
      name,
      sections,
      selected,
      fieldId
    };
  }

  componentWillReceiveProps(props) {
    const {
      option: {
        id,
        name,
        triggerSectionId: selected
      },
      sections,
      fieldId
    } = props;

    this.setState({
      id,
      name,
      sections,
      selected,
      fieldId
    });
  }

  render() {
    const {
      id,
      name,
      sections,
      selected,
      fieldId
    } = this.state;
    const {
      connectDropTarget,
      connectDragSource,
      isOver,
      canDrop,
      item
    } = this.props;
    // const itemIndex = (item && item.index) || 0;

    return connectDropTarget(connectDragSource(
      <li className={`
        Option
        ${isOver && canDrop ? "Option--insert" : ""}
      `}>
        <div className="option-item-label">
          <input
            type="text"
            defaultValue={name}
            onChange={ e => this.props.changeOptionName(id, e.target.value)}
          />
        </div>
        <div className="option-item-trigger">
          <Select
            name={`option-item-trigger-${id}`}
            options={sections}
            value={selected}
            onChange={({value: selected}) => {
              console.log(selected);
              this.setState({ selected });
            }}
          />
        </div>
        <button onClick={() => this.props.removeOption(id, fieldId) }>&times;</button>
      </li>
    ));
  }
}

const mapStateToProps = (state, {optionId}) => {
  const { ids, records } = sectionsAvailableSelector(state);

  return {
    option: optionSelector(state, optionId),
    sections:
      [
        {
          value: -1,
          label: 'Add Section: None'
        }
      ].concat(
        ids
          .filter(id => records[id].name !== 'Main')
          .map(id => ({
            value: records[id].id,
            label: `Add Section: ${records[id].name}`,
          }))
      )
  };
}

export default compose(
  connect(mapStateToProps, {
    removeOption,
    changeOptionName,
    dragOptionDrop
  }),
  DropTarget('Option', optionTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  })),
  DragSource('Option', optionSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(Option);
