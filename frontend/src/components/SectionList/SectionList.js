import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SectionListItem from './SectionListItem';
import { formSelector } from 'src/selectors';

class SectionList extends Component {
  static propTypes = {
  };

  render() {
    const {
      form: {
        sections
      }
    } = this.props;

    return (
      <ol className="SectionList">
        <header>Sections</header>
        {sections.map(sectionId => (
          <SectionListItem sectionId={sectionId} key={`section-list-item-${sectionId}`}/>
        ))}
      </ol>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    form: formSelector(state)
  };
}

export default connect(mapStateToProps, {})(SectionList);
