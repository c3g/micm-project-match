import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ApplicationPropType from 'Src/propTypes/Application';
import ApplicationListItem from 'Src/modules/ApplicationListItem';
import Loader from 'Src/modules/Loader';

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
    return (
      <div className="application-list">
        {this.props.isLoading ? (
          <Loader />
        ) : (
          this.props.applications.map((application, i) => (
            <div key={`application_${i}`}>
              <ApplicationListItem data={application} />
            </div>
          ))
        )}
      </div>
    );
  }
}
export default ApplicationList;
