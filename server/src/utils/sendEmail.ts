// import nodemailer from 'nodemailer';
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to: string, html: string, subject: string) {
  const msg = {
    to,
    from: 'justinmcintosh7897@gmail.com',
    subject,
    html,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
      console.log(msg);
    })
    .catch((error: any) => {
      console.error(error);
      console.log(error.response.body);
    });
}
