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
    approveUser: PropTypes.func.isRequired,
    disapproveUser: PropTypes.func.isRequired,
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
      makeStudent,
      approveUser,
      disapproveUser,
    } = this.props;

    const sortedUsers = users.sort((a, b) => {
      const aa = isUnapprovedProfessor(a)
      const ba = isUnapprovedProfessor(b)
      if (aa && !ba)
        return -1
      if (!aa && ba)
        return +1
      const an = a.lastName + '_' + a.firstName
      const bn = b.lastName + '_' + b.firstName
      return an.localeCompare(bn)
    })

    return (
      <div className="UserList">
        {isLoading && <Loader />}

        <div className="UserList__header flex-row">
          <div className="UserList__name">Name</div>
          <div className="UserList__type">Type</div>
          <div className="UserList__approved">Approved</div>
          <div className="flex-fill" />
        </div>
        {sortedUsers.map((user, i) =>
          user.id === currentUser.id ? null : (
            <div
              key={`user_${i}`}
              className="UserList__item flex-row flex-align-center"
            >
              <Link className="UserList__name" to={`/user/${user.id}`}>
                {user.lastName}, {user.firstName}
              </Link>
              <div className="UserList__type">{user.type}</div>
              <div className="UserList__approved">
                {user.approved ? 'Yes' : 'No'}{' '}
                {isUnapprovedProfessor(user) &&
                  <Icon className='text-warning' name='exclamation-triangle' />
                }
              </div>
              <div className="flex-fill" />
              <div className='UserList__actions flex-row'>
                {user.approved ? (
                  <button className="button" onClick={() => disapproveUser(user.id)}>
                    Disapprove
                  </button>
                ) : (
                  <button className="button" onClick={() => approveUser(user.id)}>
                    Approve
                  </button>
                )
                }
                <div className="button-group">
                  {user.type !== k.PROFESSOR && (
                    <button className="button" onClick={() => makeProfessor(user.id)}>
                      Make Professor
                    </button>
                  )}
                  {user.type !== k.STUDENT && (
                    <button className="button" onClick={() => makeStudent(user.id)}>
                      Make Student
                    </button>
                  )}
                  {user.type !== k.ADMIN && (
                    <button className="button" onClick={() => makeAdmin(user.id)}>
                      Make Admin <Icon name="exclamation-triangle" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    );
  }
}

function isUnapprovedProfessor(u) {
  return u.type === k.PROFESSOR && u.approved === false
}

export default UserList;
