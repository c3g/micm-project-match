import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RoundedInputField from 'Src/modules/RoundedInputField';

class KeywordSelector extends Component {
  static propTypes = {
    searchKeyword: PropTypes.func.isRequired,
    selectKeyword: PropTypes.func.isRequired,
    deselectKeyword: PropTypes.func.isRequired,
    keywords: PropTypes.array.isRequired,
    selected: PropTypes.array.isRequired,
    createKeyword: PropTypes.func.isRequired
  };

  state = {
    term: ''
  };

  onChange = e => {
    this.setState({ term: e.target.value });
    this.props.searchKeyword(e.target.value);
  };

  onClick = () => this.props.createKeyword(this.state.term);

  render() {
    return (
      <div>
        <RoundedInputField
          onChange={this.onChange}
          placeholder="Search for keywords to add..."
        />
        <div onClick={this.onClick}>Add</div>
        {this.props.selected.map((keyword, i) => (
          <div
            onClick={() => this.props.deselectKeyword(keyword)}
            key={`selected_keyword_${i}`}
          >
            {keyword.text}
          </div>
        ))}
        {this.props.keywords.map((keyword, i) => (
          <div
            onClick={() => this.props.selectKeyword(keyword)}
            key={`keyword_${i}`}
          >
            {keyword.text}
          </div>
        ))}
      </div>
    );
  }
}

export default KeywordSelector;
