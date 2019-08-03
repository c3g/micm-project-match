import React, { Component } from 'react';
import './roundedInputField.scss';

class RoundedInputField extends Component {
  render() {
    return (
      <input
        className="rounded-input-field"
        ref={input => (this.input = input)}
        {...this.props}
      />
    );
  }
}

export default RoundedInputField;
