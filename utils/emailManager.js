import fs from 'fs';
import crypto from 'crypto';
import { SENT_EMAILS_FILE } from '../config/constants.js';
import { logError } from './logger.js';

/**
 * Hashes an email using SHA-256
 * @param {string} email - The email to hash
 * @returns {string} The SHA-256 hash of the email
 */
function hashEmail(email) {
  return crypto.createHash('sha256').update(email).digest('hex');
}

/**
 * Reads the list of sent email hashes from the file
 * @returns {Promise<Array<string>>} The list of sent email hashes
 */
export async function readSentEmails() {
  try {
    const data = await fs.promises.readFile(SENT_EMAILS_FILE, 'utf8');
    return data.split('\n').filter(hash => hash.trim() !== '');
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File does not exist yet, return empty array
      return [];
    }
    logError('Error reading sent emails file:', error);
    throw error;
  }
}

/**
 * Appends an email hash to the sent emails file
 * @param {string} email - The email to hash and append
 */
export async function appendSentEmail(email) {
  try {
    const emailHash = hashEmail(email);
    await fs.promises.appendFile(SENT_EMAILS_FILE, `${emailHash}\n`);
  } catch (error) {
    logError('Error appending email hash to sent emails file:', error);
    throw error;
  }
}

/**
 * Checks if an email has already been sent
 * @param {string} email - The email to check
 * @param {Array<string>} sentEmailHashes - List of already sent email hashes
 * @returns {boolean} True if email was already sent
 */
export function isEmailAlreadySent(email, sentEmailHashes) {
  const emailHash = hashEmail(email);
  return sentEmailHashes.includes(emailHash);
}