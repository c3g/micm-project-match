import logo from './logo';

export const getUserName = ({ firstName, lastName }) =>
  firstName && lastName
    ? ` ${firstName} ${lastName}`
    : firstName
    ? ` ${firstName}`
    : lastName
    ? ` ${lastName}`
    : '';

export const getHTMLContainer = content =>
  `
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
          ${content}
        </td>
      </tr>
      <tr>
        <td style="padding: 20px 0;">
          Regards,<br />
          MiCM Project Match
        </td>
      </tr>
    </table>
  `;
