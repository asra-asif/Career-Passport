import React, { useState } from "react";
import "../css/navbar.css";

export default function Navbar({
  navigateTo,
  page,
  onLogout,
  username
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow-sm">

      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* Left: Username */}
        <div className="d-flex align-items-center">
          <span className="text-white fw-bold mobile-username">
            I am a <strong>{username}</strong>
          </span>
        </div>

        {/* Right: Toggler (mobile only) */}
        <button
          className={`navbar-toggler d-lg-none ${isOpen ? "active" : ""}`}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Center: Nav Links */}
        <div
          className={`collapse navbar-collapse justify-content-center ${isOpen ? "show" : ""
            }`}
        >
          <ul className="nav-links navbar-nav gap-1 text-center">
            <li className="nav-item">
              <button
                className={`btn btn-sm nav-btn ${page === "home" ? "active" : ""
                  }`}
                onClick={() => navigateTo("home", "Home")}
              >
                Home
              </button>
            </li>
            <li className="nav-item">
            <button
                className={`btn btn-sm nav-btn ${page === "about" ? "active" : ""
                  }`}
                onClick={() => navigateTo("about", "about")}
              >
                About
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`btn btn-sm nav-btn ${page === "career" ? "active" : ""
                  }`}
                onClick={() => navigateTo("career", "Career Bank")}
              >
                Career Bank
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`btn btn-sm nav-btn ${page === "quiz" ? "active" : ""
                  }`}
                onClick={() => navigateTo("quiz", "Interest Quiz")}
              >
                Quiz
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`btn btn-sm nav-btn ${page === "multimedia" ? "active" : ""
                  }`}
                onClick={() => navigateTo("multimedia", "Multimedia")}
              >
                Multimedia
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`btn btn-sm nav-btn ${page === "stories" ? "active" : ""
                  }`}
                onClick={() => navigateTo("stories", "Success Stories")}
              >
                Stories
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`btn btn-sm nav-btn ${page === "resources" ? "active" : ""
                  }`}
                onClick={() => navigateTo("resources", "Resources")}
              >
                Resources
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`btn btn-sm nav-btn ${page === "admission" ? "active" : ""
                  }`}
                onClick={() => navigateTo("admission", "Admission & Coaching")}
              >
                Admission
              </button>
            </li>
            <li className="nav-item">
            <button
                className={`btn btn-sm nav-btn ${page === "feedback" ? "active" : ""
                  }`}
                onClick={() => navigateTo("feedback", "feedback")}
              >
                Feedback
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`btn btn-sm nav-btn ${page === "contact" ? "active" : ""
                  }`}
                onClick={() => navigateTo("contact", "Contact")}
              >
                Contact
              </button>
            </li>
        
            {/* Mobile Logout Button */}
            <li className="nav-item d-lg-none">
              {onLogout && (
                <button className="btn btn-outline-danger btn-sm" onClick={onLogout}>
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>

        {/* Desktop Logout Button */}
        <div className="d-none d-lg-flex ms-auto">
          {onLogout && (
            <button className="btn btn-outline-danger btn-sm" onClick={onLogout}>
              Logout
            </button>
          )}
        </div>

     
      </div>
    </nav>
  );
}
