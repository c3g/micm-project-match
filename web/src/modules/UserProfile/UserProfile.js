import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Heading from 'Src/modules/Heading';
import { withRouter } from 'react-router-dom';
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
    id: PropTypes.string,
    history: PropTypes.object.isRequired,
    fetchUser: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (this.props.public)
      this.props.fetchUser({
        id: this.props.id,
        push: this.props.history.push
      });
  }

  render() {
    const user = this.props.public ? this.props.publicUser : this.props.user;
    return (
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
          {(!this.props.public || user.cvUploaded) && (
            <div>
              <span>CV</span>
              <span className="blue">
                {user.cvUploaded ? 'View' : 'Upload'}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(UserProfile);
