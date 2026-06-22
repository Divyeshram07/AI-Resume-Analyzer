import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { Upload, Briefcase, Download, Sparkles } from "lucide-react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function App() {
  const [resume, setResume] = useState(null);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resume || !jd) {
      toast.error("Upload resume and paste job description");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jd", jd);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/analyze",
        formData
      );

      setResult(response.data);
      toast.success("Resume analyzed successfully");
    } catch (error) {
      console.error(error);
      toast.error("Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/download-report",
        result,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "analysis_report.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(error);
      toast.error("Download failed");
    }
  };

  const chartData = result
    ? [
        { name: "Matched Skills", value: result.resume_skills.length },
        { name: "Missing Skills", value: result.missing_skills.length },
      ]
    : [];

  const COLORS = ["#3B82F6", "#EF4444"];

  return (
    <div className="min-h-screen bg-[#030712] text-white relative overflow-hidden">
      <Toaster position="top-right" />

      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-600/20 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/20 blur-[150px] rounded-full"></div>

      <nav className="relative z-10 border-b border-gray-800 backdrop-blur-xl px-10 py-5 flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          ResumeAI
        </h1>

        <button className="px-5 py-2 rounded-xl bg-white/10 border border-gray-700 hover:bg-white/20 transition">
          Dashboard
        </button>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-5 leading-tight max-w-5xl mx-auto">
            AI Resume Analyzer &
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {" "}Job Matcher
            </span>
          </h1>

          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Analyze resumes with AI, calculate ATS score, detect skill gaps,
            and get personalized improvement suggestions instantly.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/5 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <Upload className="text-blue-400" />
              Upload Resume
            </h2>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-2xl p-16 cursor-pointer hover:border-blue-500 hover:bg-white/5 transition">
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => setResume(e.target.files[0])}
              />

              <p className="text-gray-400 text-lg text-center">
                {resume ? resume.name : "Click to upload your PDF resume"}
              </p>
            </label>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <Briefcase className="text-purple-400" />
              Job Description
            </h2>

            <textarea
              rows="14"
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              placeholder="Paste job description here..."
              className="w-full bg-[#111827] rounded-2xl p-5 border border-gray-700 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="text-center mb-16">
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="bg-gradient-to-r from-blue-500 to-purple-600 px-12 py-5 rounded-2xl text-lg font-semibold hover:scale-105 transition disabled:opacity-50 shadow-lg flex items-center gap-3 mx-auto"
          >
            <Sparkles size={20} />
            {loading ? "Analyzing Resume..." : "Analyze Resume"}
          </button>
        </div>

        {loading && (
          <div className="flex justify-center mb-10">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {result && (
          <>
                        <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-gray-800 shadow-xl hover:scale-105 transition">
                <h2 className="text-lg mb-6 text-center text-gray-400">
                  Match Score
                </h2>
                <div className="w-40 mx-auto">
                  <CircularProgressbar
                    value={result.match_score}
                    text={`${result.match_score.toFixed(1)}%`}
                    styles={buildStyles({
                      textColor: "#fff",
                      pathColor: "#3B82F6",
                      trailColor: "#1f2937",
                    })}
                  />
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-gray-800 shadow-xl hover:scale-105 transition">
                <h2 className="text-lg mb-6 text-center text-gray-400">
                  ATS Score
                </h2>
                <div className="w-40 mx-auto">
                  <CircularProgressbar
                    value={result.ats_score}
                    text={`${result.ats_score}%`}
                    styles={buildStyles({
                      textColor: "#fff",
                      pathColor: "#10B981",
                      trailColor: "#1f2937",
                    })}
                  />
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-gray-800 shadow-xl hover:scale-105 transition">
                <h2 className="text-lg mb-6 text-center text-gray-400">
                  Skills Analysis
                </h2>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-gray-800 shadow-xl">
                <h2 className="text-2xl font-bold mb-6">Detected Skills</h2>
                <div className="flex flex-wrap gap-3">
                  {result.resume_skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-green-600/80 px-4 py-2 rounded-xl"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-gray-800 shadow-xl">
                <h2 className="text-2xl font-bold mb-6">Missing Skills</h2>
                <div className="flex flex-wrap gap-3">
                  {result.missing_skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-red-600/80 px-4 py-2 rounded-xl"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-gray-800 shadow-xl mb-10">
              <h2 className="text-2xl font-bold mb-6">Recommended Roles</h2>
              <div className="flex flex-wrap gap-3">
                {result.recommended_roles.map((role, index) => (
                  <span
                    key={index}
                    className="bg-blue-600/80 px-4 py-2 rounded-xl"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-gray-800 shadow-xl mb-10">
              <h2 className="text-2xl font-bold mb-6">AI Suggestions</h2>
              <ul className="space-y-4 text-gray-300">
                {result.suggestions.map((s, index) => (
                  <li key={index}>• {s}</li>
                ))}
              </ul>
            </div>
                        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-gray-800 shadow-xl mb-10">
              <h2 className="text-2xl font-bold mb-6">Interview Questions</h2>
              <ul className="space-y-4 text-gray-300">
                {result.interview_questions.map((q, index) => (
                  <li key={index}>
                    <span className="text-blue-400 font-semibold">
                      Q{index + 1}:
                    </span>{" "}
                    {q}
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center mt-10">
              <button
                onClick={downloadReport}
                className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 rounded-2xl hover:scale-105 transition font-semibold shadow-lg flex items-center gap-3 mx-auto"
              >
                <Download size={20} />
                Download PDF Report
              </button>
            </div>
          </>
        )}

        {!result && !loading && (
          <div className="text-center py-20 text-gray-500">
            <h2 className="text-2xl mb-3">No Analysis Yet</h2>
            <p>Upload resume and analyze to see AI insights dashboard.</p>
          </div>
        )}

        <footer className="mt-20 py-8 text-center text-gray-500 border-t border-gray-800">
          Built with React, FastAPI, NLP & Sentence Transformers
        </footer>
      </div>
    </div>
  );
}

export default App;