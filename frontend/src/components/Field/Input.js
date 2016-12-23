import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Input extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <div className="Input">
        Input
      </div>
    )
  }
}

const mapStateToProps = ({ errorMessage }, ownProps) => {
  return {
    errorMessage
  };
}

export default connect(mapStateToProps, {})(Input);
