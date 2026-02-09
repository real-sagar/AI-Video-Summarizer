# 🎥 AI Video Summarizer

An AI-powered full-stack web application that extracts audio from uploaded videos and generates concise summaries using modern AI models.  
Designed with a production-ready architecture and deployed on the cloud.

---

## 🚀 Live Demo

- **Frontend:** https://ai-video-summarizer-ecru.vercel.app  
- **Backend API:** https://ai-video-summarizer-4-ezob.onrender.com  

---

## ✨ Features

- Upload video files (MP4)
- Server-side audio extraction using FFmpeg
- AI-based transcription and summarization
- Clean and responsive user interface
- Full-stack cloud deployment
- Secure environment variable handling
- Dockerized backend for production stability

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Axios
- Tailwind CSS
- Deployed on Vercel

### Backend
- Node.js
- Express.js
- FFmpeg (media processing)
- Multer (file uploads)
- Docker
- Deployed on Render

---

## 🧠 System Architecture

Frontend (Vercel)
|
| HTTP Requests
v
Backend API (Render + Docker)
|
| FFmpeg
v
Audio Extraction → AI Processing → Summary


---

## 📂 Project Structure

AI-Video-Summarizer/
│
├── Backend/
│ ├── src/
│ │ ├── routes/
│ │ ├── controllers/
│ │ └── index.js
│ ├── Dockerfile
│ └── package.json
│
├── Frontend/
│ ├── src/
│ ├── public/
│ └── package.json
│
└── README.md


---

## ⚙️ Environment Variables

### Backend (`.env`)
PORT=10000
OPENAI_API_KEY=your_api_key
DEEPGRAM_API_KEY=your_api_key


### Frontend (`.env`)
VITE_API_BASE_URL=https://ai-video-summarizer-4-ezob.onrender.com/api/videos


---

## 🧪 Running Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/real-sagar/AI-Video-Summarizer.git
cd AI-Video-Summarizer
2️⃣ Start Backend
cd Backend
npm install
npm start
3️⃣ Start Frontend
cd Frontend
npm install
npm run dev
🐳 Docker (Backend)
The backend is containerized with FFmpeg installed at the OS level for reliable media processing in production.

docker build -t ai-video-summarizer-backend .
docker run -p 10000:10000 ai-video-summarizer-backend
⚠️ Deployment Notes
Render free tier has limited RAM; video size is restricted

Uploaded files are stored temporarily and cleaned up after processing

FFmpeg is accessed via system PATH (no OS-specific hardcoded paths)

📌 Key Learnings
Handling FFmpeg in cloud environments

Debugging production-only issues (filesystem, OS differences)

Docker-based backend deployment

Secure environment variable management

Frontend–backend integration using Vite env variables

👨‍💻 Author
Sagar Saini
B.Tech CSE Student
Interested in backend development, AI integration, and building production-ready systems.

⭐ Support
If you like this project, consider giving it a ⭐ on GitHub!