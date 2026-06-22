def generate_suggestions(missing_skills, match_score):
    suggestions = []

    if match_score < 60:
        suggestions.append("Resume has low alignment with job description.")

    if len(missing_skills) > 0:
        suggestions.append(f"Add missing skills: {', '.join(missing_skills)}")

    suggestions.append("Improve project descriptions using impact metrics.")
    suggestions.append("Use ATS-friendly keywords from job description.")
    suggestions.append("Add certifications and technical achievements.")

    return suggestions