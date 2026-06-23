![Python](https://img.shields.io/badge/Python-3.11-blue)
![React](https://img.shields.io/badge/React-Frontend-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![ML](https://img.shields.io/badge/MachineLearning-AI-orange)

# AI Resume Analyzer & ATS Optimization Platform

An AI-powered SaaS platform that analyzes resumes against job descriptions using NLP and transformer embeddings. The system calculates semantic match scores, ATS scores, identifies skill gaps, recommends suitable roles, generates AI-driven suggestions, and exports detailed PDF reports.

---

## Features

* Resume PDF Upload & Parsing
* Job Description Analysis
* Semantic Match Score Calculation
* ATS Score Prediction
* Skill Gap Detection
* Role Recommendation
* AI Suggestions
* Interview Question Generation
* PDF Report Export
* Interactive SaaS Dashboard

---

## Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios
* Recharts
* React Circular Progressbar
* Framer Motion
* React Hot Toast

### Backend

* FastAPI
* Python
* Uvicorn

### AI / NLP

* spaCy
* Sentence Transformers
* Scikit-learn
* NLP-based Resume Parsing

---

## Architecture

Resume Upload → Resume Parsing → NLP Skill Extraction → Semantic Matching → ATS Scoring → Dashboard Insights → PDF Report Export

---

## Screenshots

### Dashboard UI

* Premium SaaS-style interface
* Interactive analytics dashboard
* Circular score gauges
* Skills visualization

---

## Core Features Explained

### Resume Parsing

Extracts text content from uploaded PDF resumes.

### Skill Extraction

Identifies technical skills using NLP pipelines.

### Semantic Matching

Uses transformer embeddings to compare resume content with job descriptions.

### ATS Score

Predicts ATS compatibility score based on skills and relevance.

### Skill Gap Detection

Highlights missing skills from the target job description.

### Role Recommendation

Suggests suitable job roles based on detected skills.

### AI Suggestions

Provides actionable suggestions to improve resume quality.

### Interview Questions

Generates role-specific interview preparation questions.

### PDF Report

Exports a complete analysis report.

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Divyeshram07/AI-Resume-Analyzer.git
cd AI-Resume-Analyzer
```

---

## Backend Setup

```bash
cd backend
python -m venv .venv
```

Activate virtual environment:

### Windows

```bash
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run backend:

```bash
python -m uvicorn app:app --reload
```

Backend runs on:

```bash
http://127.0.0.1:8000
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## API Endpoints

### Analyze Resume

```http
POST /analyze
```

### Download PDF Report

```http
POST /download-report
```

---

## Future Improvements

* Multi-user Authentication
* Resume History Tracking
* Cloud Deployment
* AI Chat Assistant
* Multi-language Resume Support
* LLM-powered Resume Optimization

---

## Live Demo
Frontend: https://ai-resume-analyzer-green-iota.vercel.app/
Backend: https://ai-resume-analyzer-jhzb.onrender.com

## Author

### Divyesh Ram

BTech CSE (AI & ML)
KL University

GitHub: https://github.com/Divyeshram07
LinkedIn: https://www.linkedin.com/in/divyeshram28/

---

## License

This project is developed for educational and portfolio purposes.
