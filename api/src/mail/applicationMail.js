import { getHTMLContainer, getUserName } from './utils'

export const admin = (adminUser, application, student) =>
  getHTMLContainer(`
    <span style="font-weight: 400;">Hey${getUserName(adminUser)},</span><br />
    <br />
    A new application has been submitted by${getUserName(student)}.<br/>
    <br/>
    <a
      href="${process.env.PUBLIC_URL}/applications/${application.id}"
      target="_blank"
    >
      Open application
    </a>
  `);

export const student = (application, studentUser) =>
  getHTMLContainer(`
    <span style="font-weight: 400;">Hey${getUserName(studentUser)},</span><br />
    <br />
    Thank you for your interest in the Summer Scholars Program. Only
    one online submission is required. Due to the volume of
    applications, only those candidates being considered for the
    internship will be contacted.
  `);

export default { admin, student };
