import React, { Component, PropTypes, findDOMNode } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field } from 'src/components/Field';
import { fieldSelector } from 'src/selectors';
import { DragSource } from 'react-dnd';

const prebuiltFieldSource = {
  beginDrag(props) {
    return {
      item: props.prebuiltField,
    };
  }
};

class PrebuiltFieldListItem extends Component {
  render() {
    const {
      isDragging,
      connectDragSource,
      connectDropTarget,
      prebuiltField
    } = this.props;

    return connectDragSource(
      <li className="PrebuiltFieldListItem">
        {prebuiltField.name}
      </li>
    );
  }
}

const mapStateToProps = (state, { prebuiltFieldId }) => {
  return {
    prebuiltField: fieldSelector(state, prebuiltFieldId)
  };
}

export default compose(
  connect(mapStateToProps, {}),
  DragSource('PrebuiltField', prebuiltFieldSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(PrebuiltFieldListItem);
