"use client"

import React, { useState, useEffect } from "react"
import "../css/quiz.css"

export default function QuizPage({ userType: incomingUserType, quizData: injectedQuizData, careers: injectedCareers }) {
  const initialQuiz = Array.isArray(injectedQuizData)
    ? injectedQuizData
    : (injectedQuizData?.questions || null);

  const [quizData, setQuizData] = useState(initialQuiz);
  const [careersData, setCareersData] = useState(injectedCareers || null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const normalized = (incomingUserType || "").toLowerCase().replace(/[^a-z]/g, "");
  const userType = normalized === "ugpg" || normalized === "ug" || normalized === "graduate"
    ? "ugpg"
    : normalized === "student"
    ? "student"
    : "professional";

  useEffect(() => {
    if (!quizData) {
      const url = `${import.meta.env.BASE_URL}Data/quiz.json`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setQuizData(Array.isArray(data) ? data : (data?.questions || [])))
        .catch(() => setQuizData([]));
    }

    if (!careersData) {
      const url = `${import.meta.env.BASE_URL}Data/result.json`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setCareersData(data))
        .catch(() => setCareersData([]));
    }
  }, [quizData, careersData]);

  useEffect(() => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setSelectedAnswer("");
    setResults([]);
  }, [userType]);

  if (!quizData || !careersData) {
    return <div>Loading...</div>;
  }

  const questionsList = Array.isArray(quizData) ? quizData : (quizData?.questions || []);
  const questions = questionsList.filter((q) => q.userTypes?.includes(userType));
  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0

  const handleAnswerSelect = (optionIndex) => {
    setSelectedAnswer(optionIndex)
  }

  const handleNext = () => {
    console.log("HandleNext called")
    console.log("Selected answer:", selectedAnswer)
    console.log("Current question:", currentQuestion)
    console.log("Total questions:", questions.length)
    
    if (selectedAnswer !== "") {
      setAnswers((prev) => ({
        ...prev,
        [questions[currentQuestion].id]: Number.parseInt(selectedAnswer),
      }))
      if (currentQuestion < questions.length - 1) {
        console.log("Moving to next question")
        setCurrentQuestion((prev) => prev + 1)
        setSelectedAnswer("")
      } else {
        console.log("Quiz complete, calculating results")
        calculateResults()
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
      const prevAnswer = answers[questions[currentQuestion - 1].id]
      setSelectedAnswer(prevAnswer !== undefined ? prevAnswer.toString() : "")
    }
  }

  const calculateResults = () => {
    console.log("Calculating results...")
    console.log("Answers:", answers)
    console.log("Questions:", questions)
    console.log("Careers data:", careersData)
    
    const categoryScores = {}

    Object.entries(answers).forEach(([questionId, optionIndex]) => {
      const question = questions.find((q) => q.id === questionId)
      if (question && question.options[optionIndex]) {
        const option = question.options[optionIndex]
        option.categories.forEach((category) => {
          categoryScores[category] = (categoryScores[category] || 0) + option.weight
        })
      }
    })

    console.log("Category scores:", categoryScores)

    const sortedResults = Object.entries(categoryScores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([category, score]) => ({
        category,
        score,
        careers: getCareersByCategory(category),
      }))
    
    console.log("Final results:", sortedResults)
    setResults(sortedResults)
    setShowResults(true)
  }

  const getCareersByCategory = (category) => {
    const categoryMapping = {
      Technology: ["software-engineer", "data-scientist", "cybersecurity-analyst"],
      Healthcare: ["registered-nurse", "physical-therapist"],
      Business: ["marketing-manager", "financial-analyst"],
      Creative: ["graphic-designer"],
      Education: ["teacher"],
      Engineering: ["mechanical-engineer"],
      Hospitality: ["chef"],
      "Social Services": ["social-worker"],
      Finance: ["financial-analyst"],
    }
    
    console.log(`Getting careers for category: ${category}`)
    console.log(`Category mapping result:`, categoryMapping[category])
    
    // If no specific mapping, try to find careers by industry
    if (!categoryMapping[category] && careersData && Array.isArray(careersData)) {
      const industryCareers = careersData
        .filter(career => career.industry && career.industry.toLowerCase().includes(category.toLowerCase()))
        .map(career => career.id)
        .slice(0, 3)
      console.log(`Industry careers found:`, industryCareers)
      return industryCareers
    }
    
    // Fallback: show first few careers if nothing matches
    if (!categoryMapping[category] && careersData && Array.isArray(careersData)) {
      const fallbackCareers = careersData.slice(0, 2).map(career => career.id)
      console.log(`Fallback careers:`, fallbackCareers)
      return fallbackCareers
    }
    
    // Always return at least some careers for testing
    if (careersData && Array.isArray(careersData) && careersData.length > 0) {
      const testCareers = careersData.slice(0, 2).map(career => career.id)
      console.log(`Test careers (always show):`, testCareers)
      return testCareers
    }
    
    return categoryMapping[category] || []
  }

  const getCareerDetails = (careerId) => {
    if (!careersData) {
      console.log("No careers data available")
      return undefined
    }
    
    // careersData is an array directly from result.json
    if (Array.isArray(careersData)) {
      const career = careersData.find((career) => career.id === careerId)
      console.log(`Looking for career ID: ${careerId}`, career)
      return career
    }
    
    // Fallback for other data structures
    if (careersData && typeof careersData === "object") {
      const list = Array.isArray(careersData.results) ? careersData.results : Object.values(careersData)
      const career = list.find((career) => career.id === careerId)
      console.log(`Looking for career ID: ${careerId} in fallback`, career)
      return career
    }
    
    return undefined
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setSelectedAnswer("")
    setResults([])
  }

  if (showResults) {
    const topScore = results.length ? results[0].score : 0
    return (
      <div className="quiz-container">
        <h1 className="quiz-title">Your Career Recommendations</h1>
        <p className="quiz-subtitle">Based on your responses, here are the career paths that best match your interests and preferences.</p>

        <div className="results">
          {results.length > 0 ? (
            results.map((result, index) => {
              const compatibility = topScore > 0 ? Math.round((result.score / topScore) * 100) : 0
              return (
                <section key={result.category} className="result-section">
                  <div className="result-header">
                    <div className="left">
                      <span className="tag">#{index + 1} Match</span>
                      <span className="category">{result.category}</span>
                      <span className="compatibility">{compatibility}% compatibility</span>
                    </div>
                    <div className="right">
                      <span className="points">{result.score}</span>
                      <span className="points-label">points</span>
                    </div>
                  </div>

                  <div className="careers-grid">
                    {result.careers.length > 0 ? (
                      result.careers.map((careerId) => {
                        const career = getCareerDetails(careerId)
                        if (!career) {
                          return null
                        }
                        return (
                          <div key={careerId} className="career-card detailed">
                            <div className="career-content">
                              <h3>{career.title || "Career Title"}</h3>
                              {career.description && <p className="career-desc">{career.description}</p>}
                              <div className="career-meta">
                                {career.industry && (
                                  <div className="meta-item"><span className="meta-label">Industry:</span> {career.industry}</div>
                                )}
                                {career.education && (
                                  <div className="meta-item"><span className="meta-label">Education:</span> {career.education}</div>
                                )}
                                {career.salaryRange && (
                                  <div className="meta-item"><span className="meta-label">Salary:</span> {career.salaryRange}</div>
                                )}
                              </div>
                              {Array.isArray(career.skills) && career.skills.length > 0 && (
                                <div className="skills">
                                  {career.skills.slice(0, 6).map((skill) => (
                                    <span key={skill} className="skill-badge">{skill}</span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      // Fallback: show first few careers from the database
                      careersData && Array.isArray(careersData) && careersData.slice(0, 2).map((career) => (
                        <div key={career.id} className="career-card detailed">
                          <div className="career-content">
                            <h3>{career.title || "Career Title"}</h3>
                            {career.description && <p className="career-desc">{career.description}</p>}
                            <div className="career-meta">
                              {career.industry && (
                                <div className="meta-item"><span className="meta-label">Industry:</span> {career.industry}</div>
                              )}
                              {career.education && (
                                <div className="meta-item"><span className="meta-label">Education:</span> {career.education}</div>
                              )}
                              {career.salaryRange && (
                                <div className="meta-item"><span className="meta-label">Salary:</span> {career.salaryRange}</div>
                              )}
                            </div>
                            {Array.isArray(career.skills) && career.skills.length > 0 && (
                              <div className="skills">
                                {career.skills.slice(0, 6).map((skill) => (
                                  <span key={skill} className="skill-badge">{skill}</span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </section>
              )
            })
          ) : (
            // Show all careers if no results
            <section className="result-section">
              <div className="result-header">
                <div className="left">
                  <span className="tag">All Careers</span>
                  <span className="category">Career Recommendations</span>
                </div>
              </div>
              <div className="careers-grid">
                {careersData && Array.isArray(careersData) && careersData.slice(0, 6).map((career) => (
                  <div key={career.id} className="career-card detailed">
                    <div className="career-content">
                      <h3>{career.title || "Career Title"}</h3>
                      {career.description && <p className="career-desc">{career.description}</p>}
                      <div className="career-meta">
                        {career.industry && (
                          <div className="meta-item"><span className="meta-label">Industry:</span> {career.industry}</div>
                        )}
                        {career.education && (
                          <div className="meta-item"><span className="meta-label">Education:</span> {career.education}</div>
                        )}
                        {career.salaryRange && (
                          <div className="meta-item"><span className="meta-label">Salary:</span> {career.salaryRange}</div>
                        )}
                      </div>
                      {Array.isArray(career.skills) && career.skills.length > 0 && (
                        <div className="skills">
                          {career.skills.slice(0, 6).map((skill) => (
                            <span key={skill} className="skill-badge">{skill}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="actions">
          <button onClick={restartQuiz} className="btn outline">Retake Quiz</button>
          <a href="/careers" className="btn">Explore All Careers</a>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Career Interest Quiz</h1>
      <p className="quiz-subtitle">
        Discover career paths that align with your interests, values, and preferences through our comprehensive
        assessment.
      </p>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <p>
        {questions.length > 0 ? currentQuestion + 1 : 0} of {questions.length}
      </p>

      <div className="question-card">
        <h2>Question {questions.length > 0 ? currentQuestion + 1 : 0}</h2>
        <p>{questions[currentQuestion]?.question || "No questions available for this type."}</p>

        <div className="options">
          {questions[currentQuestion]?.options?.map((option, index) => (
            <label key={index} className="option-label">
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                value={index}
                checked={selectedAnswer === index.toString()}
                onChange={() => handleAnswerSelect(index.toString())}
              />
              {option.text}
            </label>
          ))}
        </div>
      </div>

      <div className="navigation">
        <button onClick={handlePrevious} disabled={currentQuestion === 0 || questions.length === 0} className="btn">
          Previous
        </button>
        <button onClick={handleNext} disabled={selectedAnswer === "" || questions.length === 0} className="btn">
          {currentQuestion === questions.length - 1 ? "Get Results" : "Next"}
        </button>
      </div>
    </div>
  )
}
