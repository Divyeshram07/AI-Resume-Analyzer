def calculate_ats_score(match_score, missing_skills):
    skill_score = max(0, 100 - (len(missing_skills) * 5))
    ats = (match_score * 0.7) + (skill_score * 0.3)

    return round(min(100, max(0, ats)), 2)