import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PrebuiltFieldListItem from './PrebuiltFieldListItem';
import { prebuiltFieldsAvailableSelector } from 'src/selectors';

class PrebuiltFieldList extends Component {
  static propTypes = {
  };

  render() {
    const {
      prebuiltFieldIds
    } = this.props;

    return (
      <ol className="PrebuiltFieldList">
        <header>Prebuilt Fields</header>
        {prebuiltFieldIds.map(prebuiltFieldId => (
          <PrebuiltFieldListItem prebuiltFieldId={prebuiltFieldId} key={`prebuilt-item-${prebuiltFieldId}`}/>
        ))}
      </ol>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    prebuiltFieldIds: prebuiltFieldsAvailableSelector(state)
  };
}

export default connect(mapStateToProps, {})(PrebuiltFieldList);
