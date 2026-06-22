from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

from resume_parser import extract_text_from_pdf
from nlp_engine import extract_skills
from matcher import calculate_match_score
from recommender import recommend_roles

from ats import calculate_ats_score
from suggestions import generate_suggestions
from interview_generator import generate_interview_questions

from fastapi.responses import FileResponse
from report_generator import generate_report

app = FastAPI()

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.get("/")
def home():
    return {"message": "AI Resume Analyzer Backend Running"}

@app.post("/download-report")
async def download_report(data: dict):
    pdf_path = generate_report(data)
    return FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename="analysis_report.pdf"
    )

@app.post("/analyze")
async def analyze_resume(
    resume: UploadFile = File(...),
    jd: str = Form(...)
):
    try:
        # Save uploaded file
        file_path = os.path.join(UPLOAD_DIR, resume.filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(resume.file, buffer)

        # Extract text from PDF
        resume_text = extract_text_from_pdf(file_path)

        # Extract skills
        resume_skills = extract_skills(resume_text)
        jd_skills = extract_skills(jd)

        # Calculate match score
        match_score = float(calculate_match_score(resume_text, jd))

        # Missing skills
        missing_skills = list(set(jd_skills) - set(resume_skills))

        # Recommended roles
        recommended_roles = recommend_roles(resume_skills)

        # ATS Score
        ats_score = calculate_ats_score(match_score, missing_skills)

        # Suggestions
        suggestions = generate_suggestions(missing_skills, match_score)

        # Interview Questions
        interview_questions = generate_interview_questions(resume_skills)

        # Resume Strength
        if match_score >= 80:
            strength = "Strong"
        elif match_score >= 60:
            strength = "Moderate"
        else:
            strength = "Weak"

        return {
            "match_score": match_score,
            "ats_score": ats_score,
            "resume_strength": strength,
            "resume_skills": resume_skills,
            "missing_skills": missing_skills,
            "recommended_roles": recommended_roles,
            "suggestions": suggestions,
            "interview_questions": interview_questions
        }

    except Exception as e:
        return {"error": str(e)}