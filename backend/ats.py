def calculate_ats_score(match_score, missing_skills):
    penalty = len(missing_skills) * 2
    ats = max(0, min(100, match_score - penalty))
    return round(ats, 2)