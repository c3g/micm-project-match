import logo from './logo';
import { getHTMLTable } from './utils';

export default (name, email, message) =>
  getHTMLTable(`
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
  `)
