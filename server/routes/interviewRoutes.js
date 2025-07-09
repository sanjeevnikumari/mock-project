require('dotenv').config();
const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');

// 👇 Import generateQuestions from your service
// const { generateQuestions } = require('../services/ai.service');
const { generateQuestions, evaluateAnswers } = require('../services/ai.service');

// 👇 Generate questions using Gemini (moved logic to ai.service.js)
router.post('/questions', async (req, res) => {
  const { category } = req.body;
  try {
    const questions = await generateQuestions(category);
    res.json({ questions });
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

// 👇 Save answers
router.post('/answers', async (req, res) => {
  try {
    const { category, question, answer, userEmail } = req.body;
    const saved = await Answer.create({ category, question, answer, userEmail });
    res.json({ success: true, answer: saved });
  } catch (err) {
    console.error("Error saving answer:", err);
    res.status(500).json({ error: "Failed to save answer" });
  }
});

// 👇 Evaluate answers
router.post('/evaluate', async (req, res) => {
  try {
    const { category, userEmail } = req.body;
    console.log("📩 Evaluate request received for:", category, userEmail);

    const entries = await Answer.find({ category, userEmail })
      .sort({ createdAt: -1 })
      .limit(5);
    console.log("🧾 Answers found:", entries.length);

    if (entries.length === 0) {
      return res.status(400).json({ error: 'No answers found for evaluation.' });
    }

    const evaluation = await evaluateAnswers(entries, category);

    // ✅ Real average score calculation from Gemini feedback
    const scoreMatches = evaluation.match(/Score:\s*([0-9]{1,2})\/10/gi);
    const numericScores = scoreMatches?.map(match =>
      parseInt(match.match(/[0-9]{1,2}/)[0])
    ) || [];

    const totalScore = numericScores.length > 0
      ? Math.round(numericScores.reduce((a, b) => a + b, 0) / numericScores.length)
      : "N/A";

    res.json({
      score: totalScore,
      comment: evaluation,
    });

  } catch (error) {
    console.error("❌ Evaluation error:", error);
    res.status(500).json({ error: 'Evaluation failed' });
  }
});


module.exports = router;
