import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './checkbox.scss';

class Checkbox extends Component {
  state = { checked: false };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.checked)
      return { checked: nextProps.value };
    return null;
  }

  render() {
    const { onChange, text, ...rest } = this.props;

    return (
      <div
        onClick={() => onChange(!this.state.checked)}
        role="checkbox"
        className={`checkbox`}
      >
        <div className={`fake-checkbox checked-${this.state.checked}`}>
          <div />
          <div />
        </div>
        <input {...rest} type="checkbox" />
        <div>{text}</div>
      </div>
    );
  }
}

Checkbox.propTypes = {
  input: PropTypes.object,
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

export default Checkbox;
