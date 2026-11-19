import React, { useState, useEffect } from 'react';
import '../css/App.css';

function Admission() {
  const [currentSection, setCurrentSection] = useState('stream-selection');
  const [contentData, setContentData] = useState(null);

  useEffect(() => {
    // Fetch data from JSON file
    fetch(`${import.meta.env.BASE_URL}Data/admission.json`)
      .then(response => response.json())
      .then(data => setContentData(data))
      .catch(error => console.error('Error loading content:', error));
  }, []);

  if (!contentData) {
    return <div className="loading">Loading content...</div>;
  }

  const currentContent = contentData[currentSection];

  return (
    <div className="App">
      <header className="app-header">
        <h1>Admission and Coaching Section</h1>
        <nav className="navigation">
          <button
            className={currentSection === 'stream-selection' ? 'active' : ''}
            onClick={() => setCurrentSection('stream-selection')}
          >
            Stream Selection
          </button>
          <button
            className={currentSection === 'study-abroad' ? 'active' : ''}
            onClick={() => setCurrentSection('study-abroad')}
          >
            Study Abroad
          </button>
          <button
            className={currentSection === 'interview-tips' ? 'active' : ''}
            onClick={() => setCurrentSection('interview-tips')}
          >
            Interview Tips
          </button>
          <button
            className={currentSection === 'resume-guidelines' ? 'active' : ''}
            onClick={() => setCurrentSection('resume-guidelines')}
          >
            Resume Guidelines
          </button>
        </nav>
      </header>

      <main className="content-section">
        <h2>{currentContent.title}</h2>
        <div className="content-container">
          <div className="text-content">
            {currentContent.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            {currentContent.tips && (
              <div className="tips-section">
                <h3>Key Tips:</h3>
                <ul>
                  {currentContent.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="visual-content">
            <img
              src={currentContent.image?.startsWith('/') ? `${import.meta.env.BASE_URL}${currentContent.image.slice(1)}` : currentContent.image}
              alt={currentContent.title}
              className="section-image"
            />
            {currentContent.caption && (
              <p className="image-caption">{currentContent.caption}</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Admission;
