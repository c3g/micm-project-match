import { getHTMLContainer, getUserName } from './utils'

export default (user, count) =>
  getHTMLContainer(`
    <span style="font-weight: 400;">Hey${getUserName(user)},</span><br />
    <br />
    There are ${count} professor(s) waiting for approval.
  `);
