export function sendConfirmationMail({ email, token }) {
  console.log(email, `http://localhost:8080/setpassword?token=${token}`); // @TODO: send email
  return Promise.resolve({ email });
}
