# 🎥 AI Video Summarizer

An AI-powered web application that takes a video file as input, extracts audio, converts speech to text, and generates a concise summary using AI models.

---

## 🚀 Features
- Upload video files
- Extract audio from video
- Convert audio to text (Speech-to-Text)
- Generate meaningful summaries using AI
- Modern React UI with Tailwind CSS
- Clean frontend + backend separation

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- JavaScript
- Axios (API calls)

### Backend
- Node.js
- Express.js
- Multer (file uploads)
- FFmpeg (audio extraction)
- AI APIs (DeepGram / LLMs)
  
---

## ⚙️ How to Run Locally

###1️⃣ Clone the repository
git clone https://github.com/real-sagar/AI-Video-Summarizer.git
cd AI-Video-Summarizer
cd backend
npm install

###2️⃣ Backend Setup
cd backend
npm install
Create a .env file:
PORT=your_port
AI_API_KEY=your_api_key_here
Run backend:
npm run dev

###3️⃣ Frontend Setup (Vite + React + Tailwind)
cd frontend
npm install
npm run dev



#🔁 Application Flow

User uploads a video from React UI
Video sent to backend via API
Backend extracts audio using FFmpeg
Audio converted to text using Speech-to-Text
Text summarized using AI
Summary returned and displayed in frontend

---
#👨‍💻 Author

##Sagar Saini
##B.Tech CSE (3rd Year)
