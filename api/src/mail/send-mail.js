import aws from 'aws-sdk';
import nodemailer from 'nodemailer';
import inlineBase64 from 'nodemailer-plugin-inline-base64';
import options from '../config/nodemailer';

const transporter = nodemailer.createTransport(options);

transporter.use('compile', inlineBase64({ cidPrefix: 'micm_' }));

export default function sendMail(options) {
  return transporter.sendMail(options);
}
