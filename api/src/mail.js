export function sendConfirmationMail({ email, token }) {
  console.log(email, token); // @TODO: send email
  return Promise.resolve({ email });
}
