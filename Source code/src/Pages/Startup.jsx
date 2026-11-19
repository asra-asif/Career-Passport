import React, { useState } from "react";
import "../css/Startup.css";
import Swal from "sweetalert2";

export default function Startup({ onStart }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("student");
  const [contact, setContact] = useState("");  // Add contact state
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contactError, setContactError] = useState(""); 

  const validateName = (value) => {
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(value)) {
      setNameError("Name must contain only alphabets");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validateContact = (value) => {
    const contactRegex = /^[0-9]{10}$/; // Simple contact validation for 10 digits
    if (!contactRegex.test(value)) {
      setContactError("Please enter a valid 10-digit contact number");
      return false;
    }
    setContactError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!name || !email || !contact) {
      Swal.fire({
        title: "Login Failed",
        text: "Please fill all fields",
        icon: "error",
        confirmButtonText: "OK"
      });
      return;
    }

    // Validate all fields
    if (!validateName(name) || !validateEmail(email) || !validateContact(contact)) {
      return;
    }

    // Only pass username and userType to App
    const userData = { username: name, userType };

    // Store in localStorage if needed
    localStorage.setItem("ns_user", JSON.stringify(userData));

    // Notify App
    onStart(userData);
  };

  return (
    <div className="container mt-5">
      <div className="card startup-card p-4 mx-auto">
        <h3 className="mb-4 text-center">Welcome to Career Passport</h3>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-person-fill"></i>
              </span>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (e.target.value) validateName(e.target.value);
                }}
                placeholder="Enter your name"
              />
            </div>
            {nameError && <div className="text-danger mt-1">{nameError}</div>}
          </div>

          {/* Email */}
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-envelope-fill"></i>
              </span>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (e.target.value) validateEmail(e.target.value);
                }}
                placeholder="Enter your email"
              />
            </div>
            {emailError && <div className="text-danger mt-1">{emailError}</div>}
          </div>

          {/* Contact Number */}
          <div className="mb-4">
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-phone-fill"></i>
              </span>
              <input
                type="text"
                className="form-control"
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value);
                  if (e.target.value) validateContact(e.target.value);
                }}
                placeholder="Enter your contact number"
              />
            </div>
            {contactError && <div className="text-danger mt-1">{contactError}</div>}
          </div>

          {/* User Type Cards */}
          <div className="user-type-cards mb-4 d-flex gap-3">
            {[
              { type: "student", label: "Student", icon: "bi-mortarboard" },
              { type: "UG/PG", label: "UG/PG", icon: "bi-book" },
              { type: "professional", label: "Fresher", icon: "bi-briefcase" },
            ].map(({ type, label, icon }) => (
              <div
                key={type}
                className={`user-type-card ${userType === type ? "active" : ""}`}
                onClick={() => setUserType(type)}
              >
                <i className={`bi ${icon} me-2`}></i>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <button className="btn btn-primary w-100">Start</button>
        </form>
      </div>
    </div>
  );
}
