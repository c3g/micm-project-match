import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './checkbox.scss';

class Checkbox extends Component {
  state = { checked: false };

  render() {
    return (
      <div
        onClick={() =>
          this.setState({ checked: !this.state.checked }, () =>
            this.props.onChange(this.state.checked)
          )
        }
        className={`checkbox`}
      >
        <div className={`fake-checkbox checked-${this.state.checked}`}>
          <div />
          <div />
        </div>
        <input {...this.props.input} type="checkbox" />
        <div>{this.props.text}</div>
      </div>
    );
  }
}

Checkbox.propTypes = {
  input: PropTypes.object,
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Checkbox;
