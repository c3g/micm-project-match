import logo from './logo';

export default (name, email, message) => `
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
    <td colspan="2" align="right">
      ${logo}
    </td>
  </tr>

  <tr>
    <td colspan="2" align="left" style="padding: 30px 0; padding-top: 50px;">
      Hey,
      <br />A message has been received from the MiCM project match web page's contact form.
    </td>
  </tr>
  <tr>
    <td>Name</td>
    <td>${name}</td>
  </tr>
  <tr>
    <td>Email</td>
    <td>${email}</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td style="padding-right: 30px;">Message</td>
    <td>${message}</td>
  </tr>
  <tr>
    <td colspan="2" style="padding: 20px 0;">Regards,<br />MiCM Project Match</td>
  </tr>
</table>
`;
