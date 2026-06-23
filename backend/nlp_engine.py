import spacy
import re

nlp = spacy.load("en_core_web_sm")

SKILLS_DB = [
    "python", "java", "c++", "c", "javascript", "typescript",
    "html", "css", "react", "node.js", "express", "fastapi",
    "sql", "mysql", "postgresql", "mongodb",
    "machine learning", "deep learning", "nlp",
    "tensorflow", "pytorch", "scikit-learn",
    "pandas", "numpy", "matplotlib",
    "docker", "kubernetes", "aws", "azure", "gcp",
    "git", "github", "linux",
    "data structures", "algorithms", "oop",
    "rest api", "microservices", "ci/cd",
    "flask", "django", "streamlit",
    "genai", "llm", "rag"
]

def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z0-9\s\+\#\.]', '', text)
    return text

def extract_skills(text):
    text = clean_text(text)
    found_skills = []

    for skill in SKILLS_DB:
        if skill.lower() in text:
            found_skills.append(skill)

    return list(set(found_skills))