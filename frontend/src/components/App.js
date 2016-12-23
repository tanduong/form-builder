import "normalize.css";
import "./App.scss";
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { resetErrorMessage } from '../actions';

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
        Hello
      </div>
    )
  }
}

const mapStateToProps = ({ errorMessage }, ownProps) => {
  return {
    errorMessage
  };
}

export default connect(mapStateToProps, {resetErrorMessage})(App)
