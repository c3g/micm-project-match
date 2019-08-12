import React, { Component } from 'react';
import AppliedProjectsListItem from 'Src/modules/AppliedProjectsListItem';
import PropTypes from 'prop-types';

class AppliedProjectsList extends Component {
  static propTypes = {
    appliedProjectsList: PropTypes.arrayOf(
      PropTypes.shape({
        application: PropTypes.shape({
          applicantId: PropTypes.number.isRequired,
          approved: PropTypes.bool.isRequired,
          id: PropTypes.number.isRequired,
          projectId: PropTypes.number.isRequired,
          proposal: PropTypes.string.isRequired
        }).isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        projectTitle: PropTypes.string.isRequired,
        chosenId: PropTypes.number.isRequired,
        projectId: PropTypes.number.isRequired,
        authorId: PropTypes.number.isRequired
      }).isRequired
    ).isRequired,
    getAppliedProjects: PropTypes.func.isRequired,
    claimProject: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
  };

  componentDidMount() {
    this.props.getAppliedProjects();
  }

  render() {
    return (
      <div>
        {this.props.appliedProjectsList.map((project, i) => (
          <AppliedProjectsListItem
            {...project}
            userId={this.props.id}
            claimProject={() => this.props.claimProject(project.application.id)}
            key={`project_${i}`}
          />
        ))}
      </div>
    );
  }
}

export default AppliedProjectsList;
