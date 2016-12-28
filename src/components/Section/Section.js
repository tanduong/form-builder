import './section.scss';
import React, { Component, PropTypes, findDOMNode } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Field from 'src/components/Field';
import { sectionSelector } from 'src/selectors';
import { addField, removeSection, dragFieldDrop } from 'src/actions';
import { DropTarget } from 'react-dnd';

const prebuiltFieldTarget = {
  drop({
    dragFieldDrop,
    addField,
    section
  }, monitor) {
    const itemType = monitor.getItemType();
    const item = monitor.getItem().item;
    if(itemType === 'Field') {
      // return monitor.isOver({shallow: true});
      // section.fields
      dragFieldDrop(undefined, section.id, item.field.id, item.sectionId);
    } else {
      addField(section.id, monitor.getItem().item);
    }
  },

  hover(props, monitor, component) {
    const item = monitor.getItem();
    return;
  },

  canDrop(props, monitor) {
    const item = monitor.getItem();
    const itemType = monitor.getItemType();
    if(itemType === 'Field') {
      return monitor.isOver({shallow: true});
    }
    return true;
  }
};

class Section extends Component {
  constructor(props) {
    super(props);

    const {
      section,
      isOver,
      canDrop
    } = props;

    this.state = {
      section,
      isOver,
      canDrop
    };
  }

  componentWillReceiveProps(props) {
    const {
      section,
      isOver,
      canDrop
    } = props;

    this.setState({
      section,
      isOver,
      canDrop
    });
  }

  render() {
    const {
      section,
      isOver,
      canDrop
    } = this.state;

    const {
      connectDropTarget,
    } = this.props;

    return connectDropTarget(
      <div className="Section">
        <header>
          {section.name}
          {section.name != "Main" &&
            <button onClick={e => this.props.removeSection(section.id)}>&times;</button>
          }
        </header>
        {section.fields.map(fieldId => (
          <Field fieldId={fieldId} sectionId={section.id} key={`field-${fieldId}`}/>
        ))}
        {canDrop ?
          <div>Can drop</div>
          :
          <div className="add-field">
            <button onClick={e => this.props.addField(section.id)}>Add Field</button>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, { sectionId }) => {
  return {
    section: sectionSelector(state, sectionId)
  };
}

export default compose(
  connect(mapStateToProps, {
    addField,
    removeSection,
    dragFieldDrop
  }),
  DropTarget(['PrebuiltField', 'Field'], prebuiltFieldTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverShallow: monitor.isOver({shallow: true}),
    item: monitor.getItem(),
    canDrop: monitor.canDrop()
  }))
)(Section);
