import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SectionListItem from './SectionListItem';
import { sectionIdsAvailableSelector } from 'src/selectors';
import { createSection } from 'src/actions';

class SectionList extends Component {
  static propTypes = {
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const sectionName = this.refs.sectionNameInput.value;
    this.props.createSection(sectionName);
  }

  render() {
    const {
      sections
    } = this.props;

    return (
      <ol className="SectionList">
        <header>Sections</header>
        {sections.map(sectionId => (
          <SectionListItem sectionId={sectionId} key={`section-list-item-${sectionId}`}/>
        ))}
        <li>
          <form onSubmit={this.handleSubmit}>
            <input type="text" ref="sectionNameInput"/>
            <button>ADD</button>
          </form>
        </li>
      </ol>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    sections: sectionIdsAvailableSelector(state)
  };
}

export default connect(mapStateToProps, {
  createSection
})(SectionList);
