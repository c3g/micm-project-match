import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ApplicationListItem from 'Src/modules/ApplicationListItem';
import Loader from 'Src/modules/Loader';

class ApplicationList extends Component {
  static propTypes = {
    fetchApplications: PropTypes.func.isRequired,
    clearApplications: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    applications: PropTypes.arrayOf(
      PropTypes.shape({
        projectTitle: PropTypes.string.isRequired,
        application: PropTypes.shape({
          id: PropTypes.number.isRequired,
          applicantId: PropTypes.number.isRequired,
          projectId: PropTypes.number.isRequired,
          proposal: PropTypes.string.isRequired,
          approved: PropTypes.bool.isRequired
        }).isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired
      })
    ).isRequired
  };

  componentDidMount() {
    this.props.fetchApplications();
  }

  componentWillUnmount() {
    this.props.clearApplications();
  }

  render() {
    return (
      <div className="application-list">
        {this.props.isLoading ? (
          <Loader />
        ) : (
          this.props.applications.map((application, i) => (
            <div key={`application_${i}`}>
              <ApplicationListItem {...application} />
            </div>
          ))
        )}
      </div>
    );
  }
}
export default ApplicationList;
