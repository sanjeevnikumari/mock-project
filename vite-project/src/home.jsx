// src/pages/Home.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [category, setCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [userEmail, setUserEmail] = useState('user@example.com'); // Replace with logged-in user email
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCategorySelect = async (selectedCategory) => {
    setLoading(true);
    setCategory(selectedCategory);
    setQuestions([]);
    setChatLog([]);
    setFeedback(null);
    setCurrentQuestionIndex(0);

    try {
      const res = await axios.post('http://localhost:3001/api/questions', {
        category: selectedCategory,
      });
      setQuestions(res.data.questions);
      setChatLog([{ from: 'bot', text: res.data.questions[0] }]);
    } catch (err) {
      console.error('Failed to fetch questions', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!answer.trim()) return;

    const newLog = [...chatLog, { from: 'user', text: answer }];
    setChatLog(newLog);

    // Save answer to DB
    await axios.post('http://localhost:3001/api/answers', {
      category,
      question: currentQuestion,
      answer,
      userEmail,
    });

    setAnswer('');

    // Move to next question or end
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setChatLog([...newLog, { from: 'bot', text: questions[nextIndex] }]);
      setCurrentQuestionIndex(nextIndex);
    } else {
      setChatLog([...newLog, { from: 'bot', text: 'All questions answered. Evaluating your responses...' }]);
      await evaluateAnswers();
    }
  };

  const evaluateAnswers = async () => {
    try {
      const res = await axios.post('http://localhost:3001/api/evaluate', {
        category,
        userEmail,
      });
      setFeedback(res.data);
    } catch (err) {
      console.error('Evaluation failed', err);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Mock Interview Chat</h2>

      {!category && (
        <div className="d-flex justify-content-center gap-3 mb-4">
          {['Technical', 'HR', 'Case Study', 'Group Discussion'].map((cat) => (
            <button
              key={cat}
              className="btn btn-primary"
              onClick={() => handleCategorySelect(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {loading && <p>Loading questions...</p>}

      {category && (
        <div className="card shadow-sm p-3">
          <div className="chat-box mb-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {chatLog.map((msg, idx) => (
              <div key={idx} className={`mb-2 ${msg.from === 'bot' ? 'text-start' : 'text-end'}`}>
                <span className={`badge ${msg.from === 'bot' ? 'bg-secondary' : 'bg-success'}`}>{msg.text}</span>
              </div>
            ))}
          </div>

          {feedback ? (
            <div className="alert alert-info">
              <strong>Score:</strong> {feedback.score}/10
              <br />
              <strong>Feedback:</strong>
              <br />
              {feedback.comment}
            </div>
          ) : (
            <>
              <textarea
                className="form-control mb-2"
                placeholder="Type your answer..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleSend}>Send</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
