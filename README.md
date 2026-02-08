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
- AI APIs (Whisper / LLMs)

---

## 📂 Project Structure
AI-Video-Summarizer/
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css # Tailwind directives
│ ├── index.html
│ ├── tailwind.config.js
│ ├── postcss.config.js
│ ├── vite.config.js
│ └── package.json
│
├── backend/
│ ├── src/
│ ├── controllers/
│ ├── routes/
│ ├── utils/
│ ├── server.js
│ └── package.json
│
├── .gitignore
└── README.md


---

## ⚙️ How to Run Locally

###
1️⃣ Clone the repository
git clone https://github.com/real-sagar/AI-Video-Summarizer.git
cd AI-Video-Summarizer
cd backend
npm install

2️⃣ Backend Setup
cd backend
npm install


Create a .env file:

PORT=5000
AI_API_KEY=your_api_key_here


Run backend:

npm run dev


Backend runs on:

http://localhost:5000

3️⃣ Frontend Setup (Vite + React + Tailwind)
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173

🎨 Styling with Tailwind CSS

Utility-first CSS framework

No custom CSS files required

Fully responsive UI

Faster UI development and consistency

🔁 Application Flow

User uploads a video from React UI

Video sent to backend via API

Backend extracts audio using FFmpeg

Audio converted to text using Speech-to-Text

Text summarized using AI

Summary returned and displayed in frontend

👨‍💻 Author

Sagar Saini
B.Tech CSE (3rd Year)
