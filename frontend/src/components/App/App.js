import "normalize.css";
import "./App.scss";
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { resetErrorMessage } from 'src/actions';
import Form from 'src/components/Form';
import SectionList from 'src/components/SectionList';
import PrebuiltFieldList from 'src/components/PrebuiltFieldList';

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

export default connect(mapStateToProps, {resetErrorMessage})(App);
