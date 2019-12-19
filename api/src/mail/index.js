import { rejectMessage } from '../utils/promise';
import k from '../constants';
import schedule from 'node-schedule';
import aws from 'aws-sdk';
import nodemailer from 'nodemailer';
import inlineBase64 from 'nodemailer-plugin-inline-base64';
import setPasswordMail from './setPasswordMail';
import verificationMail from './verificationMail';
import contactUsMail from './contactUsMail';
import adminUpdateMail from './adminUpdateMail';
import { Application, User } from '../models';

const transporter = nodemailer.createTransport({
  SES: new aws.SES()
});

transporter.use('compile', inlineBase64({ cidPrefix: 'micm_' }));

const from = `MiCM Project Match <${process.env.FROM_EMAIL}>`;
const contactEmail = process.env.CONTACT_EMAIL;

export function sendSetPasswordMail({ email, token, firstName, lastName }) {
  if (!token) return rejectMessage('Password already set', k.TOKEN_NOT_FOUND);

  const html = setPasswordMail(email, token, firstName, lastName);

  return transporter
    .sendMail({
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

  return transporter
    .sendMail({
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

  return transporter.sendMail({
    from,
    to: contactEmail,
    subject: 'Contact Form Submitted',
    html
  });
}

function sendAdminUpdateMail(count, admin) {
  const html = adminUpdateMail(admin, count.count);

  return transporter.sendMail({
    from,
    to: admin.email,
    subject: 'Professors waiting approval',
    html
  });
}

function wait(n) {
  return new Promise(res => setTimeout(() => res(), 1500 * n));
}

export function scheduledEmailUpdates() {

  /* everyday at 8am */
  const interval = '0 8 * * *'

  schedule.scheduleJob(interval, sendEmailUpdate);
}

function sendEmailUpdate() {

  // Pending-approval professors
  Promise.resolve()
  .then(() => {
    const count = User.unapprovedProfessorCount();
    const admins = User.listAdmins();
    return Promise.all([count, admins]);
  })
  .then(([count, admins]) => {
    if (count === 0)
      return Promise.resolve()

    return Promise.all(
      admins.map((admin, i) =>
        wait(i).then(() => sendAdminUpdateMail(count, admin))
      )
    )
  })
}
