import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Heading from 'Src/modules/Heading';
import { withRouter, Link } from 'react-router-dom';
import Loader from 'Src/modules/Loader';
import * as k from 'Src/constants/values';
import './userProfile.scss';

class UserProfile extends Component {
  static propTypes = {
    public: PropTypes.bool,
    user: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      tel: PropTypes.string,
      type: PropTypes.string.isRequired,
      cvUploaded: PropTypes.bool.isRequired,
      professor: PropTypes.shape({
        department: PropTypes.string.isRequired,
        position: PropTypes.string.isRequired
      })
    }),
    publicUser: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      tel: PropTypes.string,
      type: PropTypes.string.isRequired,
      cvUploaded: PropTypes.bool.isRequired,
      professor: PropTypes.shape({
        department: PropTypes.string.isRequired,
        position: PropTypes.string.isRequired
      })
    }),
    application: PropTypes.object,
    id: PropTypes.string,
    history: PropTypes.object.isRequired,
    fetchUser: PropTypes.func.isRequired,
    clearUser: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  componentDidMount() {
    if (this.props.public)
      this.props.fetchUser({
        id: this.props.id,
        push: this.props.history.push
      });
  }

  componentWillUnmount() {
    this.props.clearUser();
  }

  render() {
    const user = this.props.public ? this.props.publicUser : this.props.user;
    const isApplicationSubmitted = Boolean(this.props.application);

    return this.props.isLoading ? (
      <Loader />
    ) : (
      <div className="user-profile">
        <Heading hideUnderline>{`${user.firstName} ${user.lastName}`}</Heading>
        <div className="type">{user.type.toLowerCase()}</div>
        <div className="details">
          <div>
            <span>Email</span>
            <span>{user.email}</span>
          </div>
          {user.tel && (
            <div>
              <span>Contact Number</span>
              <span>{user.tel}</span>
            </div>
          )}
          {user.professor && (
            <>
              <div>
                <span>Department</span>
                <span>{user.professor.department}</span>
              </div>
              <div>
                <span>Position</span>
                <span>{user.professor.position}</span>
              </div>
            </>
          )}
          {(!this.props.public || user.cvUploaded) && user.type !== k.ADMIN && (
            <div>
              <span>Resume</span>
              {user.cvUploaded ? (
                <>
                  <a
                    href={`/api/cv/${user.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-cv"
                  >
                    View
                  </a>
                  {!this.props.public && (
                    <Link to="/cv-setup" className="blue">
                      Update
                    </Link>
                  )}
                </>
              ) : (
                <Link to="/cv-setup" className="blue">
                  Upload
                </Link>
              )}
            </div>
          )}
          {!this.props.public && user.type === k.STUDENT && (
            <div>
              <span>Application</span>
              {isApplicationSubmitted ? (
                <span className="text-success">Submitted</span>
              ) : (
                <span className="text-muted">Not submitted</span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(UserProfile);
