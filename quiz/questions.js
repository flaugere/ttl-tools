/**
 * Base prompt for persona generation
 */
export const basePrompt = `
Imagine un persona de traileur.se en fonction de ses réponses au quiz.

Et voici les données de la personne :
`;

/**
 * Generates a prompt for a given submission
 * @param {Object} submission - The submission data
 * @param {Array} questions - The list of questions
 * @returns {string} The generated prompt
 */
export function generatePrompt(submission, questions) {
  let prompt = basePrompt + 'Je suis un.e traileur.se :\n';

  questions.forEach(question => {
    const response = submission.responses.find(r => r.questionId === question.id);
    prompt += `Réponse choisie par la personne : ${question.title} : ${response?.answer || 'Non répondu'}\n`;
  });

  return prompt;
}

/**
 * Extracts email from prompt
 * @param {string} prompt - The prompt containing the email information
 * @returns {string} The extracted email address
 */
export function getEmailFromPrompt(prompt) {
  const emailMatch = prompt.match(/E-mail\s*:\s*([^\s]+)/);
  return emailMatch ? emailMatch[1] : null;
}