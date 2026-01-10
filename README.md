# 🌱 SaathiAI — Emotion-Aware Conversational Companion

SaathiAI is a human-like, emotion-aware conversational AI platform.
The system enables users to chat freely with an AI companion that understands emotional tone, maintains conversational memory, and responds empathetically over time.

This project focuses on **natural conversation, emotional intelligence, memory handling, and clean system design**, rather than simple Q&A.

---

## 🎯 Objective 

The goal is to design a chatbot that goes beyond basic responses and demonstrates:

* Human-like interaction
* Emotional awareness
* Personalized memory
* Contextual consistency
* Scalable backend design

SaathiAI is designed to be embeddable into any **consumer-facing or UGC-style platform**.

---

## ✨ Core Features

### 💬 Human-Like Conversations

* Natural, non-robotic replies
* Varied responses for repeated prompts (e.g., “hi”, “hello”)
* Maintains a consistent personality and identity

### ❤️ Emotion & Tone Awareness

* Detects emotional signals from user messages
* Responds empathetically to feelings such as stress, sadness, loneliness, or excitement
* Adjusts tone dynamically during conversation

### 🧠 Personalized Memory System

* Stores user chat history in MongoDB
* Extracts and summarizes important user context
* Remembers preferences and past emotional states
* Adapts responses across sessions

### 🗣️ Context Continuity

* Multi-turn conversations with awareness of prior messages
* Avoids contradictions
* Handles vague or ambiguous prompts safely

### 🔐 Secure User Sessions

* JWT-based authentication
* User-specific chat memory and isolation

---

## 🧠 Memory Strategy 

SaathiAI implements a **lightweight long-term memory strategy**:

1. User messages are stored per session
2. Important personal or emotional information is extracted
3. Memory summaries are generated and reused in future prompts
4. The AI is guided using:

   * System prompts
   * Memory prompts
   * Recent conversation context

This ensures:

* Memory recall without hallucination
* Stable identity over time
* Cost-efficient token usage

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Atlas)
* JWT Authentication

### AI Layer

* Google Gemini API (gemini-2.5-flash)
* Custom prompt engineering
* Memory extraction & summarization utilities

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## 📁 Project Structure

```
SaathiAI/
├── client/                 # Frontend
├── server/                 # Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── prompts/
│   │   ├── systemPrompt.js
│   │   ├── memoryPrompt.js
│   ├── utils/
│   │   ├── extractMemory.js
│   │   ├── summarizeMemory.js
│   │   ├── llm.js
│   └── server.js
├── README.md
├── .gitignore
```

---

## ⚙️ Environment Variables

### Backend (`server/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=your_gemini_api_key
```

### Frontend (`client/.env`)

```env
VITE_API_URL=http://localhost:5000
```

⚠️ `.env` files are excluded from GitHub.
Use `.env.example` for reference.

---

## 🧑‍💻 Local Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/rajukr9824/SaathiAI.git
cd SaathiAI
```

### 2️⃣ Backend Setup

```bash
cd server
npm install
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---



## 🧑‍💻 Author

**Raju Kumar**
B.Tech CSE, NIT Patna
MERN Stack Developer

---

## 🚀 Future Improvements

* Mood analytics dashboard
* Voice-based conversations
* Anonymous emotional support mode
* Vector-based memory store for scaling




