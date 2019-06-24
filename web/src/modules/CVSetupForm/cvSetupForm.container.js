import { connect } from 'react-redux';
import { action } from 'Src/utils';
import cvSetupForm from './CVSetupForm';
import { CV_UPLOAD } from 'Src/constants/actionTypes';
import { pick } from 'ramda';

const mapDispatchToProps = dispatch => ({
  onSubmitCV: data => dispatch(action(CV_UPLOAD.REQUEST, data))
});

const mapStateToProps = state => ({
  ...pick(['isLoading'], state.cvSetup)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(cvSetupForm);
