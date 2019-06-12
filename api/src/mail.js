import { rejectMessage } from './utils/promise';
import k from './constants';

export function sendVerificationMail({ email, token }) {
  if (!token) return rejectMessage('Password already set', k.TOKEN_NOT_FOUND);
  console.log(email, `http://localhost:8080/setpassword?token=${token}`); // @TODO: send email
  return Promise.resolve({ email });
}
