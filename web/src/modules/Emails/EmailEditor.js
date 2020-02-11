import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isObject from 'is-object';
import Icon from 'Src/modules/Icon';
import InputField from 'Src/modules/InputField';
import TextArea from 'Src/modules/TextArea';
import { EMAIL_TARGET } from 'Src/constants/values';

const EMPTY_EMAIL = {
  id: 0,
  target: EMAIL_TARGET.INCOMPLETE_USERS,
  authorId: 0,
  author: {
    firstName: undefined,
    lastName: undefined,
  },
  sendDate: '',
  title: '',
  content: '',
  sent: false
};

class EmailEditor extends Component {
  static propTypes = {
    mode: PropTypes.oneOf(['EDIT', 'CREATE']),
    isLoading: PropTypes.bool.isRequired,
    email: PropTypes.shape({
      id: PropTypes.number.isRequired,
      target: PropTypes.string.isRequired,
      authorId: PropTypes.number.isRequired,
      author: PropTypes.object.isRequired,
      sendDate: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      sent: PropTypes.bool.isRequired
    }),
    done: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired
  };

  static getDerivedStateFromProps = (props, state) => {
    const { email } = props;

    if (email && email.id !== state.email.id)
      return { message: undefined, email };

    if (!email && state.email.id !== 0)
      return { message: undefined, email: EMPTY_EMAIL };

    return null;
  }

  state = {
    message: undefined,
    email: EMPTY_EMAIL
  };

  setField = name => {
    return ev => {
      const value = isObject(ev) ? ev.target.value : ev;
      this.setState({ email: { ...this.state.email, [name]: value } });
    };
  };

  onDone = () => {
    const { email } = this.state

    if (email.title.length === 0) {
      this.setState({ message: 'Invalid title' })
      return;
    }

    if (Number.isNaN(+new Date(email.sendDate))) {
      this.setState({ message: 'Invalid send date' })
      return;
    }

    if (email.content.length === 0) {
      this.setState({ message: 'Empty content' })
      return;
    }

    this.props.done(email)
  }

  render() {
    const { mode, done, cancel } = this.props;
    const { message, email } = this.state

    return (
      <div className="EmailEditor">
        <div>
          <span>Title</span>
          <InputField
            value={email.title}
            onChange={this.setField('title')}
          />
        </div>
        <div>
          <span>Send date</span>
          <InputField
            type="date"
            value={email.sendDate}
            onChange={this.setField('sendDate')}
          />
        </div>
        <div>
          <div>Content</div>
          <TextArea
            rows={5}
            value={email.content}
            onChange={this.setField('content')}
          />
        </div>
        <div className="flex-row flex-row--vmargin">
          <button className="button" onClick={this.onDone}>
            { mode === 'EDIT' ? 'Update' : 'Create' }
          </button>
          <div className="flex-fill" />
          <Link className="button" to="/emails">
            Cancel
          </Link>
        </div>
        { message &&
          <div className="flex-row flex-row--vmargin text-danger">
            {message}
          </div>
        }
      </div>
    );
  }
}

export default EmailEditor;
