import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loader from 'Src/modules/Loader';
import * as k from 'Src/constants/values';
import './userList.scss';

class UserList extends Component {
  static propTypes = {
    currentUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired
    }),
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired
      })
    ),
    makeAdmin: PropTypes.func.isRequired,
    makeProfessor: PropTypes.func.isRequired,
    makeStudent: PropTypes.func.isRequired,
    listUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  componentDidMount() {
    this.props.listUsers();
  }

  componentWillUnmount() {
    this.props.clearUsers();
  }

  render() {
    const {
      currentUser,
      users,
      makeAdmin,
      makeProfessor,
      makeStudent
    } = this.props;
    return (
      <div className="user-list">
        {this.props.isLoading ? (
          <Loader />
        ) : (
          users.map((user, i) =>
            user.id === currentUser.id ? null : (
              <div className="user" key={`user_${i}`}>
                <div>
                  <Link to={`/user/${user.id}`}>
                    {user.firstName} {user.lastName}
                  </Link>
                  <div className="user-type">{user.type}</div>
                </div>
                <div className="button-group">
                  {user.type !== k.ADMIN && (
                    <button onClick={() => makeAdmin(user.id)}>
                      Make Admin
                    </button>
                  )}
                  {user.type !== k.PROFESSOR && (
                    <button onClick={() => makeProfessor(user.id)}>
                      Make Professor
                    </button>
                  )}
                  {user.type !== k.STUDENT && (
                    <button onClick={() => makeStudent(user.id)}>
                      Make Student
                    </button>
                  )}
                </div>
              </div>
            )
          )
        )}
      </div>
    );
  }
}

export default UserList;
