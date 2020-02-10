import { rejectMessage } from '../utils/promise';
import k from '../constants';
import schedule from 'node-schedule';
import sendMail from './send-mail';
import setPasswordMail from './setPasswordMail';
import verificationMail from './verificationMail';
import contactUsMail from './contactUsMail';
import adminUpdateMail from './adminUpdateMail';
import applicationMail from './applicationMail';
import projectCreationMail from './projectCreationMail';
import { Email, User } from '../models';

const from = `MiCM Project Match <${process.env.FROM_EMAIL}>`;
const contactEmail = process.env.CONTACT_EMAIL;

export async function sendScheduledEmail(email) {

  const users = await getUsersForTarget(email.target);

  return Promise.all(users.map((user, i) =>
    wait(i)
    .then(() =>
      sendMail({
        from,
        to: user.email,
        subject: email.title,
        html: interpolateUser(email.content, user),
      })
    )
  ));
}

async function getUsersForTarget(target) {
  switch(target) {
    case k.EMAIL_TARGET.INCOMPLETE_USERS: return await User.listIncompleteUsers();
  }
  throw new Error('unreachable');
}

function interpolateUser(content, user) {
  return content.replace(/\{\{\s*([^}\s]+)\s*}}/g, (match, value, index, input) => user[value])
}

export function sendSetPasswordMail({ email, token, firstName, lastName }) {
  if (!token) return rejectMessage('Password already set', k.TOKEN_NOT_FOUND);

  const html = setPasswordMail(email, token, firstName, lastName);

  return sendMail({
      from,
      to: email,
      subject: 'Set your Password',
      html
    })
    .then(() => Promise.resolve({ email }));
}

export function sendVerificationMail(user) {
  const { email, token, firstName, lastName } = user;
  const html = verificationMail(email, token, firstName, lastName);

  return sendMail({
      from,
      to: email,
      subject: 'Verify your email',
      html
    })
    .then(() => Promise.resolve(user));
}

export function sendContactUsMail(data) {
  const { name, email, message } = data;
  const html = contactUsMail(name, email, message);

  return sendMail({
    from,
    to: contactEmail,
    subject: 'Contact Form Submitted',
    html
  });
}

export function sendApplicationSubmissionMail(application, student) {
  User.listAdmins()
  .then(admins => {
    return Promise.all(
      admins.map((admin, i) =>
        wait(i).then(() => {
          return sendMail({
            from,
            to: admin.email,
            subject: 'Application submitted',
            html: applicationMail.admin(admin, application, student),
          })
        })
      )
    )
  })
  .then(() => {
    return sendMail({
      from,
      to: student.email,
      subject: 'Application submitted',
      html: applicationMail.student(application, student),
    })
  });
}

export function sendProjectCreationMail(project, author) {
  User.listAdmins()
  .then(admins => {
    return Promise.all(
      admins.map((admin, i) =>
        wait(i).then(() => {
          return sendMail({
            from,
            to: admin.email,
            subject: 'Project created',
            html: projectCreationMail.admin(admin, project, author),
          })
        })
      )
    )
  })
  .then(() => {
    return sendMail({
      from,
      to: author.email,
      subject: 'Project created',
      html: projectCreationMail.author(project, author),
    })
  });
}

function sendAdminUpdateMail(count, admin) {
  const html = adminUpdateMail(admin, count.count);

  return sendMail({
    from,
    to: admin.email,
    subject: 'Professors waiting approval',
    html
  });
}


export function scheduledEmailUpdates() {

  /* everyday at 8am */
  const interval = '0 8 * * *'

  schedule.scheduleJob(interval, sendEmailTick);

  sendEmailTick()
}

function sendEmailTick() {
  console.log('[email tick] start')

  // Pending-approval professors
  Promise.resolve()
  .then(() => {
    const count = User.unapprovedProfessorCount();
    const admins = User.listAdmins();
    return Promise.all([count, admins]);
  })
  .then(([countResult, admins]) => {
    const count = +countResult.count
    if (count === 0)
      return Promise.resolve()

    return Promise.all(
      admins.map((admin, i) =>
        wait(i).then(() => sendAdminUpdateMail(count, admin))
      )
    )
  })
  .catch(err => { console.error(err) });

  // Scheduled emails
  Promise.resolve()
  .then(async () => {
    const emails = await Email.listOverdue();
    console.log(`[email tick] ${emails.length} pending emails`)

    for (let email of emails) {
      await sendScheduledEmail(email)
      await Email.markAsSent(email)
    }
  })
  .catch(err => { console.error(err) });
}


// Helpers

function wait(n) {
  return new Promise(res => setTimeout(() => res(), 1500 * n));
}

