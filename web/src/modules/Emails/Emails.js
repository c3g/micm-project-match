import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Heading from 'Src/modules/Heading';
import Loader from 'Src/modules/Loader';
import Icon from 'Src/modules/Icon';
import EmailList from './EmailList';
import './emails.scss';

class Emails extends Component {
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
    match: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    message: PropTypes.string,
    listEmails: PropTypes.func.isRequired,
    createEmail: PropTypes.func.isRequired,
    updateEmail: PropTypes.func.isRequired,
    deleteEmail: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.listEmails();
  }

  editEmail = id => {};

  deleteEmail = id => {};

  render() {
    const { isLoading, message, emails, match: { params: { subroute } } } = this.props;

    const view = subroute === 'create' ? 'create' :
                 /\d+/.test(subroute) ? 'edit' : 'list'
    return (
      <div className="Emails">
        <Heading>Emails</Heading>

        {isLoading && <Loader />}

        {!isLoading && view === 'list' &&
          <React.Fragment>
          <div className="flex-row flex-row--vmargin">
            <Link className="button" to="/emails/create">Create</Link>
          </div>

            <EmailList
              emails={emails}
              editEmail={this.editEmail}
              deleteEmail={this.deleteEmail}
            />
          </React.Fragment>
        }
      </div>
    );
  }
}

export default Emails;
