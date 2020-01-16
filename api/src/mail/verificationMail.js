import logo from './logo';
import { getHTMLTable, getUserName } from './utils';

export default (email, token, firstName, lastName) => 
  getHTMLTable(`
      <tr>
        <td align="left" style="padding: 30px 0; padding-top: 50px;">
          <span style="font-weight: 400;">Hey${getUserName({ firstName, lastName })},</span>
          <br />Click on the continue button to verify your email.
        </td>
      </tr>
      <tr>
        <td align="center">
          <a
            href="${process.env.PUBLIC_URL}/verify?token=${token}"
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
          ${process.env.PUBLIC_URL}/verify?token=${token}
        </td>
      </tr>
  `);
