from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nlp_engine import extract_skills


def calculate_match_score(resume_text, jd_text):
    documents = [resume_text, jd_text]

    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf_matrix = vectorizer.fit_transform(documents)

    similarity = cosine_similarity(
        tfidf_matrix[0:1],
        tfidf_matrix[1:2]
    )[0][0] * 100

    resume_skills = set(extract_skills(resume_text))
    jd_skills = set(extract_skills(jd_text))

    if len(jd_skills) > 0:
        skill_overlap = (len(resume_skills & jd_skills) / len(jd_skills)) * 100
    else:
        skill_overlap = 0

    final_score = (similarity * 0.4) + (skill_overlap * 0.6)

    return round(final_score, 2)