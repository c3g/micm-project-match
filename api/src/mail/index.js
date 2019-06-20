import { rejectMessage } from '../utils/promise';
import k from '../constants';
import aws from 'aws-sdk';
import nodemailer from 'nodemailer';
import inlineBase64 from 'nodemailer-plugin-inline-base64';
import setPasswordMail from './setPasswordMail';
import verificationMail from './verificationMail';

const transporter = nodemailer.createTransport({
  SES: new aws.SES()
});

transporter.use('compile', inlineBase64({ cidPrefix: 'micm_' }));

const from = `MiCM Project Match <${process.env.FROM_EMAIL}>`;

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
