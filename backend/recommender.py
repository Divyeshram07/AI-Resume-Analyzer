ROLE_MAP = {
    "AI Engineer": ["python", "machine learning", "deep learning"],
    "NLP Engineer": ["python", "nlp"],
    "Backend Developer": ["python", "fastapi", "sql"],
    "Frontend Developer": ["react", "javascript"],
    "Data Scientist": ["python", "machine learning", "sql"]
}

def recommend_roles(skills):
    recommendations = []

    for role, required_skills in ROLE_MAP.items():
        matched = len(set(skills) & set(required_skills))

        if matched >= 2:
            recommendations.append(role)

    return recommendations