import { Mistral } from "@mistralai/mistralai";
import { FORM_TALLY } from '../config/constants.js';

function createMistralInstance() {
  const mistral = new Mistral({
    apiKey: process.env.MISTRAL_TOKEN
  });
  return mistral;
}

/**
 * Fetches quiz submissions from the API
 * @returns {Promise<Object>} The API response
 */
export async function fetchQuizSubmissions() {
  try {
    const response = await fetch(`https://api.tally.so/forms/${FORM_TALLY}/submissions?limit=50&filter=completed`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching quiz submissions:', error);
    throw error;
  }
}

/**
 * Generates a persona description using Mistral API
 * @param {string} prompt - The prompt to send to the API
 * @returns {Promise<string>} The generated persona description
 */
export async function generatePersonaDescription(prompt) {
  try {
    const mistral = createMistralInstance();
    const result = await mistral.chat.complete({
      model: "mistral-large-latest",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      responseFormat: {
        type: "text",
      },
    });

    return result.choices[0].message.content.replace(/```html|```/g, '');
  } catch (error) {
    console.error('Error generating persona description:', error);
    throw error;
  }
}