import React, { Component } from 'react';
import PropTypes from 'prop-types';
import csvStringify from 'csv-stringify';
import { saveAs } from 'file-saver';
import ProjectListItem from 'Src/modules/ProjectListItem';
import Loader from 'Src/modules/Loader';
import Button from 'Src/modules/Button';
import './projectList.scss';

class ProjectList extends Component {
  static propTypes = {
    fetchProjects: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired,
    fetchUserProjects: PropTypes.func.isRequired,
    userProjects: PropTypes.bool,
    clearProjects: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  componentDidMount() {
    if (this.props.userProjects) this.props.fetchUserProjects();
    else this.props.fetchProjects();
  }

  componentWillUnmount() {
    this.props.clearProjects();
  }

  render() {
    const projects = this.props.projects;

    return (
      <div>
        {this.props.isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="flex-row">
              <div className="flex-fill" />
              <Button onClick={() => exportAsCSV(projects)}>
                Export as CSV
              </Button>
            </div>
            {projects.map((project, i) => (
              <ProjectListItem key={`project_${i}`} project={project} />
            ))}
          </>
        )}
      </div>
    );
  }
}

function exportAsCSV(projects) {
  const headers = [
    'ID',
    'Title',
    'Start Date',
    'Timeframe',
    'Budget',
    'Axis',
    'Organizations',
    'Open for students',
    'Author',
    'Tags',
    'Approved',
    'Abstract'
  ];

  const options = {
    header: true,
    columns: headers
  };

  const records = projects.map(p => [
    p.id,
    p.title,
    p.startDate,
    p.timeframe,
    p.axis,
    p.organizations.join(', '),
    p.openForStudents ? 'yes' : 'no',
    [p.author.firstName, p.author.lastName].join(' '),
    p.tags.join(', '),
    p.approved ? 'yes' : 'no',
    p.abstract
  ]);

  csvStringify(records, options, (err, content) => {
    if (err) {
      console.log(err);
      return;
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'project-list.csv');
  });
}

export default ProjectList;
