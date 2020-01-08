import React, { Component } from 'react';
import './discover.scss';
import Heading from 'Src/modules/Heading';
import ProjectSearchbar from 'Src/modules/ProjectSearchbar';
import ProjectList from 'Src/modules/ProjectList';
import KeywordSelector from 'Src/modules/KeywordSelector';
import Icon from 'Src/modules/Icon';

class Discover extends Component {
  state = { filterOpen: false };

  render() {
    return (
      <div className="discover-page">
        <Heading hideUnderline>Projects</Heading>
        <ProjectSearchbar />
        {this.state.filterOpen && <KeywordSelector preventAddition />}
        <button
          className="discover-page__filter"
          onClick={() => this.setState({ filterOpen: !this.state.filterOpen })}
        >
          <Icon name="filter" color="#00a1f8" /> Filter
        </button>
        <ProjectList />
      </div>
    );
  }
}

export default Discover;
