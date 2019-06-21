import asyncComponent from 'Src/enhancers/asyncComponent';
import saga from './verifyEmail.sagas';

export const verifyEmailSaga = saga;

export default asyncComponent(() => import('./verifyEmail.container'));
