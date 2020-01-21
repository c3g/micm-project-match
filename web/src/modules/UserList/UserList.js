import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loader from 'Src/modules/Loader';
import Icon from 'Src/modules/Icon';
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
      isLoading,
      currentUser,
      users,
      makeAdmin,
      makeProfessor,
      makeStudent
    } = this.props;

    return (
      <div className="UserList">
        {isLoading && <Loader />}

        <div className="UserList__header flex-row">
          <div className="UserList__name">Name</div>
          <div className="UserList__type">Type</div>
          <div className="UserList__approved">Approved</div>
          <div className="flex-fill" />
        </div>
        {users.map((user, i) =>
          user.id === currentUser.id ? null : (
            <div
              key={`user_${i}`}
              className="UserList__item flex-row flex-align-center"
            >
              <Link className="UserList__name" to={`/user/${user.id}`}>
                {user.firstName} {user.lastName}
              </Link>
              <div className="UserList__type">{user.type}</div>
              <div className="UserList__approved">
                {user.approved ? 'Yes' : 'No'}
              </div>
              <div className="flex-fill" />
              <div className="button-group">
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
                {user.type !== k.ADMIN && (
                  <button onClick={() => makeAdmin(user.id)}>
                    Make Admin <Icon name="exclamation-triangle" />
                  </button>
                )}
              </div>
            </div>
          )
        )}
      </div>
    );
  }
}

export default UserList;
