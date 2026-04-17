import nodemailer from 'nodemailer';
import { EMAIL_TEMPLATE } from './template.js';

/**
 * Sends an email with the persona description
 * @param {string} email - The recipient's email address
 * @param {string} personaDescription - The description of the persona to send
 */
export async function sendEmail(email, personaDescription) {
  if (!email) {
    console.error('No email address found to send the persona description.');
    return;
  }

  // Create a transporter object using the OVH SMTP server
  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ovh.net',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // Replace the placeholder with the actual persona description
  const emailContent = EMAIL_TEMPLATE.replace('{{PERSONA_DESCRIPTION}}', personaDescription);

  // Setup email data with unicode symbols
  const mailOptions = {
    from: '"TrailTheLimit" <no-reply@trailthelimit.fr>',
    to: email,
    subject: 'Ton persona de traileur.se',
    html: emailContent
  };

  // Send mail with defined transport object
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}