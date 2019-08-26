import UserList from './userList.container';
import reducer from './userList.reducer';
import saga from './userList.sagas';

export const userListReducer = reducer;
export const userListSaga = saga;

export default UserList;
