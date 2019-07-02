import logo from './logo';

const name = (firstName, lastName) =>
  firstName && lastName
    ? ` ${firstName} ${lastName}`
    : firstName
    ? ` ${firstName}`
    : lastName
    ? ` ${lastName}`
    : '';

export default (email, token, firstName, lastName) => `
<link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400" rel="stylesheet" type="text/css">
<table
  width="600px"
  align="center"
  border="0"
  cellspacing="0"
  cellpadding="0"
  style="font-family: 'Open Sans', sans-serif; font-weight: 300; font-size: 1rem;"
>
  <tr>
    <td align="right">
      ${logo}
    </td>
    <td></td>
  </tr>

  <tr>
    <td align="left" style="padding: 30px 0; padding-top: 50px;">
      <span style="font-weight: 400;">Hey${name(firstName, lastName)},</span>
      <br />Click on the continue button to verify your email and set your
      password.
    </td>
  </tr>
  <tr>
    <td align="center">
      <a
        href="${process.env.PUBLIC_URL}/set-password?token=${token}"
        target="_blank"
      >
        <button
          style="font-family: inherit; border: none; padding: 7px 28px; border-radius: 20px; background: #00a1f8; color: #ffffff; font-size: inherit; cursor: pointer;"
        >
          Continue
        </button></a
      >
    </td>
  </tr>
  <tr>
    <td align="left" style="padding: 30px 0 0; font-size: 0.8rem; color: #333333">
      Alternatively, copy paste the following link into your browser:<br />
      ${process.env.PUBLIC_URL}/set-password?token=${token}
    </td>
  </tr>
  <tr>
    <td style="padding: 20px 0;">Regards,<br />MiCM Project Match</td>
  </tr>
</table>
`;
