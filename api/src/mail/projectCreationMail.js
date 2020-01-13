import { getHTMLContainer, getUserName } from './utils'

export const admin = (adminUser, project, author) =>
  getHTMLContainer(`
    <span style="font-weight: 400;">Hey ${getUserName(adminUser)},</span><br />
    <br />
    A new project has been created by ${getUserName(author)}.<br/>
    <br/>
    <a
      href="${process.env.PUBLIC_URL}/projects/${project.id}"
      target="_blank"
    >
      Open project
    </a>
  `);

export const author = (project, user) =>
  getHTMLContainer(`
    <span style="font-weight: 400;">Hey ${getUserName(user)},</span><br />
    <br />
    Thank you for submitting your project. We will get back in touch with you
    for the next steps of the project approval.
  `);


export default { admin, author };
