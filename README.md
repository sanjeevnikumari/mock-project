💼 Mock Interview AI App

An AI-powered web application that helps users practice mock interviews — both HR and technical — using Gemini API for question generation and smart feedback.

---

 📌 Table of Contents

- [✨ Features](#-features)  
- [🧠 AI Capabilities](#-ai-capabilities)  
- [🛠️ Tech Stack](#-tech-stack)  
- [📸 Screenshots](#-screenshots)  
- [🚀 Getting Started](#-getting-started)  
- [📂 Folder Structure](#-folder-structure)  
- [📈 Future Scope](#-future-scope)  
- [🤝 Acknowledgements](#-acknowledgements)  
- [🪪 License](#-license)

---

## ✨ Features

- 👤 User authentication and registration  
- 🤖 AI-generated HR and technical questions  
- 🧠 Gemini Pro-powered evaluation and feedback  
- 📊 Session history tracking and analytics  
- 🔒 Secure backend API with environment configs  
- 📌 Organized and scalable code structure  

---

## 🧠 AI Capabilities

- Dynamic question generation based on interview category  
- Semantic evaluation of user responses  
- Feedback generation for improvement  
- Gemini API integration via custom service  

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite)  
- **Backend**: Node.js + Express  
- **Database**: MongoDB  
- **AI**: Gemini Pro API  

---

## 📸 Screenshots



---

## 🚀 Getting Started

### 📦 Backend (server)

```bash
cd server
npm install
````

Create a `.env` file in `/server` with:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
GEMINI_API_KEY=your_gemini_api_key
```

Then run the server:

```bash
npm start
```

---

### 🌐 Frontend (vite-project)

```bash
cd vite-project
npm install
npm run dev
```

Visit: `http://localhost:5173`

---

## 📂 Folder Structure

```
mock-project/
├── server/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── .env
│   └── index.js
│
├── vite-project/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── home.jsx
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── main.jsx
│   └── vite.config.js
```

---

## 📈 Future Scope

* 🎤 Voice input and speech feedback
* 🧪 Coding pad for DSA-based questions
* 🧑‍🤝‍🧑 Peer-to-peer mock interview mode
* 🏆 Leaderboard and gamification
* 📄 Resume feedback and job tracker
* 📅 AI-based smart schedule recommendations

---

## 🤝 Acknowledgements

* Google Gemini Pro API
* MongoDB Atlas
* React, Express, Node.js
* Inspiration from real-world interview platforms

---

## 🪪 License
This project is licensed under the [MIT License](LICENSE).
> Made with ❤️ by [Sanjeevni Kumari](https://github.com/sanjeevnikumari)
