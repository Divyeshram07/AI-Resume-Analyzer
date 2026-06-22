import spacy
import re

nlp = spacy.load("en_core_web_sm")

SKILLS_DB = [
    "python", "java", "c++", "javascript",
    "machine learning", "deep learning", "nlp",
    "tensorflow", "pytorch", "scikit-learn",
    "sql", "mongodb", "mysql",
    "react", "node.js", "fastapi",
    "docker", "kubernetes", "aws",
    "git", "linux", "data structures", "algorithms"
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