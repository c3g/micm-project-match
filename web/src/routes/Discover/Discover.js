import React, { Component } from 'react';
import './discover.scss';
import Heading from 'Src/modules/Heading';
import ProjectSearchbar from 'Src/modules/ProjectSearchbar';
import ProjectList from 'Src/modules/ProjectList';
import KeywordSelector from 'Src/modules/KeywordSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

class ProfessorSetup extends Component {
  state = { filterOpen: false };

  render() {
    return (
      <div className="discover-page">
        <Heading hideUnderline>Projects</Heading>
        <ProjectSearchbar />
        {this.state.filterOpen && <KeywordSelector preventAddition />}
        <button
          onClick={() => this.setState({ filterOpen: !this.state.filterOpen })}
        >
          <FontAwesomeIcon icon={faFilter} color="#00a1f8" />
          &nbsp;&nbsp; Filter
        </button>
        <ProjectList />
      </div>
    );
  }
}

export default ProfessorSetup;
