/**
 * Base prompt for persona generation
 */
export const basePrompt = `
Imagine un persona de traileur.se en fonction de ses réponses au quiz.
Tu me donneras le nom imaginé (Vétéran des Montagnes, Le métronome endurant, le Geek rêveur, Mr Jornet ...) avec un résumé des réponses. Termine par une phrase de motivation et un conseil pour faire du renforcement. Le tout en 200 mots max et en HMTL.
Tu t'adresseras directement à la personne, en utilisant "tu" et en personnalisant le message en fonction de ses réponses.
Exemple : 🏔️ Le Technicien des Cimes 🏔️ Tu es un traileur·euse méthodique et passionné de data, allie endurance (6-8 min/km) et maîtrise technique en descente. Avec une expérience solide sur trails courts (20-30km), il vise son premier ultra (80-160km) en s’appuyant sur une préparation rigoureuse (muscu/gainage 2-3x/semaine) et un arsenal high-tech (GPS, capteur de puissance). Son credo ? "La performance se mesure, mais l’aventure se vit."

Voici les questions et les réponses possibles :

## 1. La Liste des Questions & Réponses

Q1 : Quel est ton "passif" sur les sentiers ?
 A. J'ai déjà bouclé un 80km ou 100km (ou plusieurs).
 B. J'ai quelques trails de 30-60km à mon actif.
 C. J'ai de l'expérience sur des trails courts (20 à 30km)
 D. Pas énormément d'expérience ou uniquement des trails <20km

Q2 : Ton allure moyenne en trail (VAP) ressemble à quoi ?
 A. Rapide ( < 6 min/km) : J'aime quand ça défile.
 B. Endurant (6-8 min/km) : Je gère mon effort sur la durée.
 C. Rando-course (> 8 min/km) : Je profite du paysage, la montre n'est qu'un accessoire.
 D. VAP ? Whaaaat ?

Q3 : Comment tes genoux réagissent-ils en descente technique ?
 A. C'est le pied ! Je double tout le monde.
 B. Je suis prudent, ça tape un peu trop à mon goût.
 C. C'est ma hantise, je finis souvent en "marche de canard".

Q4 : Côté matériel et data, tu es plutôt...
 A. Minimaliste : Un short, une gourde, et mes sensations.
 B. Geek / Aventurier : Montre GPS, capteur de puissance et suivi de trace nocturne.
 C. Prévoyant : Le sac est plein "au cas où", mais je ne regarde pas les courbes de FC.

Q5 : La préparation physique (muscu/gainage), pour toi c'est...
 A. Une religion : 2 à 3 séances par semaine.
 B. Un lointain souvenir ou une fois de temps en temps.
 C. "C'est quoi ? Ça aide vraiment à courir ?"

Q6 : Quel est ton objectif ultime cette année ?
 A. Battre un record ou viser un top classement.
 B. Finir mon premier Ultra (80-160km) en un seul morceau.
 C. Partir à l'aventure sur plusieurs jours, peu importe le chrono.

Q7 :  Nom, Prénom, Email,

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