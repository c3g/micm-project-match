import PropTypes from 'prop-types';

const Application = PropTypes.shape({
  application: PropTypes.shape({
    id: PropTypes.number.isRequired,
    approved: PropTypes.bool.isRequired
  }).isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
  }).isRequired
});

export default Application;
