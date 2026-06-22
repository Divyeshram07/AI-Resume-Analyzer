def generate_interview_questions(skills):
    questions = []

    skill_questions = {
        "python": "Explain decorators in Python.",
        "machine learning": "Explain bias-variance tradeoff.",
        "deep learning": "What is backpropagation?",
        "nlp": "What is tokenization?",
        "react": "What are hooks in React?",
        "sql": "What is normalization?",
        "fastapi": "Why use FastAPI over Flask?"
    }

    for skill in skills:
        if skill in skill_questions:
            questions.append(skill_questions[skill])

    return questions[:5]