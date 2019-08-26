import { connect } from 'react-redux';
import UserProfile from './UserProfile';
import { action } from 'Src/utils';
import { pick } from 'ramda';
import { USER } from 'Src/constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  fetchUser: data => dispatch(action(USER.FETCH.REQUEST, data)),
  clearUser: () =>
    dispatch(
      action(USER.FETCH.RECEIVE, {
        firstName: '',
        lastName: '',
        email: '',
        tel: '',
        type: '',
        cvUploaded: false,
        professor: null
      })
    )
});

const mapStateToProps = state => ({
  ...pick(['user'], state.app),
  ...pick(['publicUser', 'isLoading'], state.userProfile)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
