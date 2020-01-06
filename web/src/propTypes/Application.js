import PropTypes from 'prop-types';

const Application = PropTypes.shape({
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
});

export default Application;
