import UserProfile from './userProfile.container';
import reducer from './userProfile.reducer';
import saga from './userProfile.sagas';

export const userProfileReducer = reducer;
export const userProfileSaga = saga;

export default UserProfile;
