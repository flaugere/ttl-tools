import { config } from 'dotenv';
import { fetchQuizSubmissions, generatePersonaDescription } from './services/api.js';
import { sendEmail } from './email/sender.js';
import { generatePrompt, getEmailFromPrompt } from './quiz/questions.js';
import { readSentEmails, appendSentEmail, isEmailAlreadySent } from './utils/emailManager.js';

config({ path: '.env.production' });

/**
 * Processes quiz submissions and generates prompts
 */
async function processQuizSubmissions() {
  try {
    const { submissions, questions } = await fetchQuizSubmissions();
    const sentEmails = await readSentEmails();

    // Process each submission sequentially
    for (const submission of submissions) {
      try {
        const prompt = generatePrompt(submission, questions);
        const email = getEmailFromPrompt(prompt);

        if (isEmailAlreadySent(email, sentEmails)) {
          console.log(`Email ${email} already sent, skipping...`);
          continue;
        }

        console.log(`Processing submission for ${email}`);
        const personaDescription = await generatePersonaDescription(prompt);
        await sendEmail(email, personaDescription);
        await appendSentEmail(email);
        console.log(`Successfully processed and sent email to ${email}`);
      } catch (error) {
        console.error('Error processing individual submission:', error);
        // Continue with next submission even if one fails
        continue;
      }
    }

    console.log('Quiz submission processing completed');
  } catch (error) {
    console.error('Error processing quiz submissions:', error);
  }
}

// Start processing quiz submissions
processQuizSubmissions();