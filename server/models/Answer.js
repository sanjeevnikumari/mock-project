const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  category: String,
  question: String,
  answer: String,
  userEmail: String,
}, { timestamps: true }); 


module.exports = mongoose.model('Answer', AnswerSchema);