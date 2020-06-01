import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Heading from 'Src/modules/Heading';
import Loader from 'Src/modules/Loader';
import EmailEditor from './EmailEditor';
import EmailList from './EmailList';
import './emails.scss';

class Emails extends Component {
  static propTypes = {
    currentUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired
    }),
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
    match: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    message: PropTypes.string,
    listEmails: PropTypes.func.isRequired,
    createEmail: PropTypes.func.isRequired,
    updateEmail: PropTypes.func.isRequired,
    deleteEmail: PropTypes.func.isRequired
  };

  state = {
    confirmDelete: false
  };

  componentDidMount() {
    this.props.listEmails();
  }

  deleteEmail = id => {
    if (!window.confirm('Are you sure you want to delete this email?')) return;

    this.props.deleteEmail({ id });
  };

  createEmail = email => {
    const id = this.props.currentUser.id;
    const data = { ...email, id: undefined, author: undefined, authorId: id };
    this.props.createEmail(data);
  };

  updateEmail = email => {
    const id = this.props.currentUser.id;
    const data = { ...email, id: undefined, author: undefined, authorId: id };
    this.props.createEmail(data);
  };

  render() {
    const {
      isLoading,
      message,
      emails,
      match: {
        params: { subroute }
      }
    } = this.props;

    const view =
      subroute === 'create' ? 'create' : /\d+/.test(subroute) ? 'edit' : 'list';

    return (
      <div className="Emails">
        <Heading>Emails</Heading>

        {isLoading && view === 'list' && <Loader />}

        {!isLoading && view === 'list' && (
          <React.Fragment>
            <div className="flex-row flex-row--vmargin">
              <Link className="button" to="/emails/create">
                Create
              </Link>
            </div>

            <EmailList
              emails={emails}
              editEmail={this.editEmail}
              deleteEmail={this.deleteEmail}
            />

            {}
          </React.Fragment>
        )}

        {view === 'create' && (
          <React.Fragment>
            <EmailEditor
              mode="CREATE"
              isLoading={isLoading}
              done={this.createEmail}
            />
          </React.Fragment>
        )}

        {view === 'edit' && (
          <React.Fragment>
            <EmailEditor
              mode="EDIT"
              isLoading={isLoading}
              email={emails.find(e => e.id === +subroute)}
              done={this.createEmail}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Emails;
