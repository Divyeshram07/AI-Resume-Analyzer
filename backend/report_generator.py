from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
import os


def generate_report(data):
    os.makedirs("reports", exist_ok=True)

    file_path = "reports/analysis_report.pdf"

    doc = SimpleDocTemplate(file_path, pagesize=letter)
    styles = getSampleStyleSheet()
    story = []

    story.append(Paragraph("AI Resume Analysis Report", styles["Title"]))
    story.append(Spacer(1, 20))

    story.append(Paragraph(f"Match Score: {data['match_score']}%", styles["Heading2"]))
    story.append(Paragraph(f"ATS Score: {data['ats_score']}%", styles["Heading2"]))
    story.append(Paragraph(f"Resume Strength: {data['resume_strength']}", styles["Heading2"]))
    story.append(Spacer(1, 20))

    story.append(Paragraph("Detected Skills", styles["Heading1"]))
    story.append(Paragraph(", ".join(data["resume_skills"]), styles["BodyText"]))
    story.append(Spacer(1, 15))

    story.append(Paragraph("Missing Skills", styles["Heading1"]))
    story.append(Paragraph(", ".join(data["missing_skills"]), styles["BodyText"]))
    story.append(Spacer(1, 15))

    story.append(Paragraph("Suggestions", styles["Heading1"]))
    for s in data["suggestions"]:
        story.append(Paragraph(f"• {s}", styles["BodyText"]))
    story.append(Spacer(1, 15))

    story.append(Paragraph("Interview Questions", styles["Heading1"]))
    for q in data["interview_questions"]:
        story.append(Paragraph(f"• {q}", styles["BodyText"]))

    doc.build(story)

    return file_path