import nodemailer from 'nodemailer';
import { EMAIL_TEMPLATE } from './template.js';
import { logDebug, logError } from '../utils/logger.js';
import { EMAIL_TRAILTHELIMIT } from '../config/constants.js';

/**
 * Sends an email with the persona description
 * @param {string} email - The recipient's email address
 * @param {string} personaDescription - The description of the persona to send
 */
export async function sendEmail(email, personaDescription) {
  if (!email) {
    logError('No email address found to send the persona description.');
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
    cc: `"TrailTheLimit" <${EMAIL_TRAILTHELIMIT}>`,
    subject: 'Ton persona de traileur.se',
    html: emailContent
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logDebug('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    logError('Error sending email:', error);
    throw error;
  }
}