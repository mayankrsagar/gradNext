import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});

transporter.verify().then(() => console.log('✅ SMTP connection successful')).catch(err => console.error('❌ SMTP error:', err));

export const sendEmail = async ({ to, subject, html }) => {
  return transporter.sendMail({ from: process.env.SMTP_USER, to, subject, html });
};