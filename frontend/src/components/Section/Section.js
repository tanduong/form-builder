import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Input } from 'src/components/Field';

class Section extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <div className="Section">
        Section
        <Input/>
      </div>
    )
  }
}

const mapStateToProps = ({ errorMessage }, ownProps) => {
  return {
    errorMessage
  };
}

export default connect(mapStateToProps, {})(Section);
