import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './matchList.scss';
import Loader from 'Src/modules/Loader';

class MatchList extends Component {
  static propTypes = {
    matches: PropTypes.array,
    approveMatch: PropTypes.func.isRequired,
    disapproveMatch: PropTypes.func.isRequired,
    listMatches: PropTypes.func.isRequired,
    clearMatches: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  componentDidMount() {
    this.props.listMatches();
  }

  componentWillUnmount() {
    this.props.clearMatches();
  }

  render() {
    const { matches, approveMatch, disapproveMatch } = this.props;
    return (
      <div className="match-list">
        {this.props.isLoading ? (
          <Loader />
        ) : (
          matches.map((match, i) => (
            <div className="match-item" key={`match_${i}`}>
              <div>
                <Link
                  className="project-title"
                  to={`/project/${match.project.id}`}
                >
                  {match.project.title}
                </Link>
                <div>
                  <Link to={`/user/${match.author.id}`}>
                    {match.author.firstName} {match.author.lastName}
                  </Link>
                  &nbsp;and&nbsp;
                  <Link to={`/user/${match.chosen.id}`}>
                    {match.chosen.firstName} {match.chosen.lastName}
                  </Link>
                </div>
              </div>
              <div>
                {match.project.approved ? (
                  <button onClick={() => disapproveMatch(match.project.id)}>
                    Disapprove
                  </button>
                ) : (
                  <button onClick={() => approveMatch(match.project.id)}>
                    Approve
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default MatchList;
