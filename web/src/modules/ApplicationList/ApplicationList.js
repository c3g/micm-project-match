import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ApplicationPropType from 'Src/propTypes/Application';
import ApplicationListItem from 'Src/modules/ApplicationListItem';
import Button from 'Src/modules/Button';
import Loader from 'Src/modules/Loader';
import csvStringify from 'csv-stringify';
import { saveAs } from 'file-saver';

class ApplicationList extends Component {
  static propTypes = {
    fetchApplications: PropTypes.func.isRequired,
    clearApplications: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    applications: PropTypes.arrayOf(ApplicationPropType).isRequired
  };

  componentDidMount() {
    this.props.fetchApplications();
  }

  render() {
    const { applications } = this.props;

    return (
      <div className="application-list">
        {this.props.isLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <div className="flex-row">
              <div className="flex-fill" />
              <Button onClick={() => exportAsCSV(applications)}>
                Export as CSV
              </Button>
            </div>
            {applications.map((application, i) => (
              <div key={`application_${i}`}>
                <ApplicationListItem data={application} />
              </div>
            ))}
          </React.Fragment>
        )}
      </div>
    );
  }
}

function exportAsCSV(applications) {
  const headers = [
    'Name',
    'Study Program',
    'Study Year',
    'Graduation Year',
    'University',
    'Other internships?'
  ];

  const options = {
    header: true,
    columns: headers
  };

  const records = applications.map(({ application, user }) => [
    `${user.firstName} ${user.lastName}`,
    application.studyProgram,
    application.studyYear,
    application.graduationYear,
    application.university,
    application.otherInternships
      ? `Yes: ${application.otherInternshipsDetails}`
      : 'No'
  ]);

  csvStringify(records, options, (err, content) => {
    if (err) {
      console.log(err);
      return;
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'application-list.csv');
  });
}

export default ApplicationList;
