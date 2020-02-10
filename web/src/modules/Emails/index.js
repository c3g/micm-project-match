import Emails from './emails.container';
import reducer from './emails.reducer';
import saga from './emails.sagas';

export const emailsReducer = reducer;
export const emailsSaga = saga;

export default Emails;
