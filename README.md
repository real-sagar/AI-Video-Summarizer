# 🎥 AI Video Summarizer

An AI-powered full-stack web application that extracts audio from uploaded videos and generates concise summaries using modern AI models.  
Designed with a production-ready architecture and deployed on the cloud.

---

## 🚀 Live Demo

- **Website:** https://ai-video-summarizer-ecru.vercel.app  

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


## 🧪 Running Locally

### 1️⃣ Clone the repository
```bash
- git clone https://github.com/real-sagar/AI-Video-Summarizer.git
- cd AI-Video-Summarizer
```
### 2️⃣ Start Backend
```bash
- cd Backend
- npm install
- npm start
```
### 3️⃣ Start Frontend
```bash
- cd Frontend
- npm install
- npm run dev
```
### 🐳 Docker (Backend)

The backend is containerized using Docker with FFmpeg installed at the OS level for reliable media processing in production.

```bash
- docker build -t ai-video-summarizer-backend 
- docker run -p 10000:10000 ai-video-summarizer-backend
```
---
### 📌 Key Learnings
- Handling FFmpeg in cloud environments

- Debugging production-only issues (filesystem, OS differences)

- Docker-based backend deployment

- Secure environment variable management

- Frontend–backend integration using Vite environment variables
---

## 👨‍💻 Author
#### Sagar Saini
#### B.Tech CSE Student
#### Interested in backend development, AI integration, and building production-ready systems.
---

## ⭐ Support
### If you found this project useful, consider giving it a ⭐ on GitHub!