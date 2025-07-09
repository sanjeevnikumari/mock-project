// // // services/ai.service.js
// // const { GoogleGenerativeAI } = require("@google/generative-ai");
// // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // async function generateQuestions(category) {
// //   const prompt = `Generate 5 concise and relevant ${category} interview questions.`;
// //   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// //   const result = await model.generateContent(prompt);
// //   const content = result.response.text();

// //   return content
// //     .split('\n')
// //     .map((q) => q.replace(/^\d+\.\s*/, '').trim())
// //     .filter(Boolean);
// // }

// // module.exports = { generateQuestions };

// // services/ai.service.js
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // Function to generate questions
// const generateQuestions = async (category) => {
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//   const prompt = `Generate 5 concise and relevant ${category} interview questions.`;
//   const result = await model.generateContent(prompt);
//   const content = result.response.text();

//   const questions = content
//     .split('\n')
//     .map((q) => q.replace(/^\d+\.\s*/, '').trim())
//     .filter(Boolean);

//   return questions;
// };

// // Function to evaluate answers
// const evaluateAnswers = async (entries, category) => {
//   const prompt = `Evaluate the following ${category} interview answers. Give a score out of 10 and give feedback.\n\n` +
//     entries.map((e, i) => `Q${i + 1}: ${e.question}\nA${i + 1}: ${e.answer}`).join('\n\n');

//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//   const result = await model.generateContent(prompt);
//   return result.response.text();
// };

// module.exports = {
//   generateQuestions,
//   evaluateAnswers,
// };



// // server/services/ai.service.js
// require('dotenv').config();
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// // ✅ Load Gemini API Key
// console.log("🧪 Loaded GEMINI_API_KEY:", process.env.GEMINI_API_KEY?.slice(0, 10) + "**********");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // ✅ Generate Interview Questions
// async function generateQuestions(category) {
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//   const prompt = `Generate 5 concise and relevant interview questions for the category: ${category}. Return them as a numbered list.`;

//   const result = await model.generateContent(prompt);
//   const content = result.response.text();

//   const questions = content
//     .split('\n')
//     .map((q) => q.replace(/^\d+\.\s*/, '').trim())
//     .filter(Boolean);

//   return questions;
// }

// // ✅ Evaluate User Answers
// async function evaluateAnswers(entries, category) {
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//   const prompt = `
// You are a professional interview evaluator.

// Evaluate the following answers for the category "${category}".

// Give:
// - A total score out of 10
// - Detailed feedback per question
// - Penalize weak answers like "no", "don't know", or "-"

// Return format:
// Score: X/10
// Feedback:
// Q1: ...
// Q2: ...
// Q3: ...
// ...

// ${entries.map((e, i) => `Q${i + 1}: ${e.question}\nA${i + 1}: ${e.answer}`).join('\n\n')}
// `;

//   const result = await model.generateContent(prompt);
//   return result.response.text();
// }

// module.exports = {
//   generateQuestions,
//   evaluateAnswers,
// };

require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// ✅ Load Gemini API Key
console.log("🧪 Loaded GEMINI_API_KEY:", process.env.GEMINI_API_KEY?.slice(0, 10) + "**********");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Generate Interview Questions
async function generateQuestions(category) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Generate 5 concise and relevant interview questions for the category: ${category}. Return them as a numbered list.`;

  const result = await model.generateContent(prompt);
  const content = result.response.text();

  const questions = content
    .split('\n')
    .map((q) => q.replace(/^\d+\.\s*/, '').trim())
    .filter(Boolean);

  return questions;
}

// ✅ Evaluate User Answers (Improved Realistic Scoring)
async function evaluateAnswers(entries, category) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are an interview evaluator. For each of the following answers, give:
- A score out of 10 (e.g., "Score: 7/10")
- 1-2 lines of feedback

Evaluate the answers for category: ${category}

Format:
Q1: [question]
A1: [answer]
Score: X/10
Feedback: ...
(repeat for each)

${entries.map((e, i) => `Q${i + 1}: ${e.question}\nA${i + 1}: ${e.answer}`).join('\n\n')}
`;

  const result = await model.generateContent(prompt);
  return result.response.text(); // We'll parse this in route
}


module.exports = {
  generateQuestions,
  evaluateAnswers,
};
