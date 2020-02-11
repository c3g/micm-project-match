import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from 'Src/modules/Icon';
import { format as formatDate } from 'date-fns';

class EmailList extends Component {
  static propTypes = {
    emails: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        target: PropTypes.string.isRequired,
        authorId: PropTypes.number.isRequired,
        author: PropTypes.object.isRequired,
        sendDate: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        sent: PropTypes.bool.isRequired
      })
    ),
    editEmail: PropTypes.func.isRequired,
    deleteEmail: PropTypes.func.isRequired
  };

  render() {
    const { emails, editEmail, deleteEmail } = this.props;

    return (
      <div className="EmailList">
        <div className="EmailList__header flex-row">
          <div className="EmailList__title">Title</div>
          <div className="EmailList__author">Author</div>
          <div className="EmailList__sendDate">Date</div>
          <div className="EmailList__sent">Sent</div>
          <div className="flex-fill" />
        </div>
        {emails.map((email, i) => (
          <div
            key={`email_${i}`}
            className="EmailList__item flex-row flex-align-center"
          >
            <div className="EmailList__title">{email.title}</div>
            <Link
              className="EmailList__author link"
              to={`/user/${email.author.id}`}
            >
              {email.author.firstName} {email.author.lastName}
            </Link>
            <div className="EmailList__sendDate">
              {formatDate(new Date(email.sendDate), 'yyyy-MMM-dd')}
            </div>
            <div className="EmailList__sent">{email.sent ? 'yes' : 'no'}</div>
            <div className="flex-fill" />
            <div className="button-group">
              <Link className="button" to={`/emails/${email.id}`}>
                Edit
              </Link>
              <button className="button" onClick={() => deleteEmail(email.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default EmailList;
