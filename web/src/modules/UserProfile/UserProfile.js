import React from 'react';
import './userProfile.scss';
import PropTypes from 'prop-types';
import Heading from 'Src/modules/Heading';

const UserProfile = props => (
  <div className="user-profile">
    <Heading hideUnderline>
      {`${props.user.firstName} ${props.user.lastName}`}
    </Heading>
    <div className="type">{props.user.type.toLowerCase()}</div>
    <div className="details">
      <div>
        <span>Email</span>
        <span>{props.user.email}</span>
      </div>
      {props.user.tel && (
        <div>
          <span>Contact Number</span>
          <span>{props.user.tel}</span>
        </div>
      )}
      {props.user.professor && (
        <>
          <div>
            <span>Department</span>
            <span>{props.user.professor.department}</span>
          </div>
          <div>
            <span>Position</span>
            <span>{props.user.professor.position}</span>
          </div>
        </>
      )}
      <div>
        <span>CV</span>
        <span className="blue">
          {props.user.cvUploaded ? 'View' : 'Upload'}
        </span>
      </div>
    </div>
  </div>
);

UserProfile.propTypes = {
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
  }).isRequired
};

export default UserProfile;
