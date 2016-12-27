import "normalize.css";
import "./App.scss";
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { resetErrorMessage } from 'src/actions';
import Form from 'src/components/Form';
import SectionList from 'src/components/SectionList';
import PrebuiltFieldList from 'src/components/PrebuiltFieldList';
import { DragDropContext } from 'react-dnd';
import FieldPreview from 'src/components/FieldPreview';
// import TouchBackend from 'react-dnd-touch-backend';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
    children: PropTypes.node
  };

  handleDismissClick = e => {
    this.props.resetErrorMessage()
    e.preventDefault()
  };

  renderErrorMessage() {
    const { errorMessage } = this.props
    if (typeof errorMessage !== 'string') {
      return null
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href="#"
            onClick={this.handleDismissClick}>
          Dismiss
        </a>)
      </p>
    )
  }

  render() {
    return (
      <div className="App">
        {this.renderErrorMessage()}
        <main>
          <Form/>
        </main>
        <aside>
          <SectionList></SectionList>
          <PrebuiltFieldList></PrebuiltFieldList>
        </aside>
      </div>
    )
  }
}

const mapStateToProps = ({ errorMessage }, ownProps) => {
  return {
    errorMessage
  };
}

export default compose(
  DragDropContext(HTML5Backend),
  connect(mapStateToProps, {resetErrorMessage})
)(App);
