import PropTypes from 'prop-types';

const User = PropTypes.shape({
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['STUDENT', 'ADMIN', 'PROFESSOR', 'UNSET']),
  email: PropTypes.string,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  tel: PropTypes.string.isRequired,
  professor: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    department: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired
  }),
  strategy: PropTypes.string.isRequired,
  approved: PropTypes.bool.isRequired,
  verified: PropTypes.bool.isRequired,
  cvKey: PropTypes.string,
  cvUploaded: PropTypes.bool
});

export default User;
