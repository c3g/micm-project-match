import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProfessorList extends Component {
  static propTypes = {
    professors: PropTypes.arrayOf(
      PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        approved: PropTypes.bool.isRequired
      })
    ),
    approveProfessor: PropTypes.func.isRequired,
    disapproveProfessor: PropTypes.func.isRequired,
    listProfessors: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.listProfessors();
  }

  render() {
    const { professors, approveProfessor, disapproveProfessor } = this.props;
    return (
      <div>
        {professors.map((professor, i) => (
          <div key={`professor_${i}`}>
            {professor.firstName} {professor.lastName}
            {professor.approved ? (
              <button onClick={() => disapproveProfessor(professor.id)}>
                Disapprove
              </button>
            ) : (
              <button onClick={() => approveProfessor(professor.id)}>
                Approve
              </button>
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default ProfessorList;
