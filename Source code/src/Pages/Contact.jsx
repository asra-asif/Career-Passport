import React, { useState } from 'react';
import '../css/contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faEnvelope, faTimes, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    services: {
      websiteDesign: false,
      contentCreation: false,
      uxDesign: false,
      strategyConsulting: false,
      userResearch: false,
      other: false,
    },
  });

  const [errors, setErrors] = useState({});

  const validateName = (name) => /^[A-Za-z]+$/.test(name);
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]+$/.test(phone);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name in formData.services) {
      setFormData((prev) => ({
        ...prev,
        services: {
          ...prev.services,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!validateName(formData.firstName)) {
      validationErrors.firstName = 'First name must contain only letters.';
    }
    if (!validateName(formData.lastName)) {
      validationErrors.lastName = 'Last name must contain only letters.';
    }
    if (!validateEmail(formData.email)) {
      validationErrors.email = 'Invalid email address.';
    }
    if (!validatePhone(formData.phone)) {
      validationErrors.phone = 'Phone number must contain only digits.';
    }
    if (!formData.message.trim()) {
      validationErrors.message = 'Message is required.';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert('Form submitted successfully!');
      // Reset form or further processing here
    }
  };

  return (
    <section className="contact-section">
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="name-fields">
          <div className="form-group">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            {errors.firstName && (
              <span className="error">{errors.firstName}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            {errors.lastName && (
              <span className="error">{errors.lastName}</span>
            )}
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@company.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group full-width">
          <label htmlFor="phone">Phone number</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="+92 000 000000"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="form-group full-width">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Leave us a message..."
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          />
          {errors.message && <span className="error">{errors.message}</span>}
        </div>

        <fieldset className="services-group">
          <legend>Services</legend>
          <label>
            <input
              type="checkbox"
              name="websiteDesign"
              checked={formData.services.websiteDesign}
              onChange={handleChange}
            />
            Website design
          </label>
          <label>
            <input
              type="checkbox"
              name="contentCreation"
              checked={formData.services.contentCreation}
              onChange={handleChange}
            />
            Content creation
          </label>
          <label>
            <input
              type="checkbox"
              name="uxDesign"
              checked={formData.services.uxDesign}
              onChange={handleChange}
            />
            UX design
          </label>
          <label>
            <input
              type="checkbox"
              name="strategyConsulting"
              checked={formData.services.strategyConsulting}
              onChange={handleChange}
            />
            Strategy & consulting
          </label>
          <label>
            <input
              type="checkbox"
              name="userResearch"
              checked={formData.services.userResearch}
              onChange={handleChange}
            />
            User research
          </label>
          <label>
            <input
              type="checkbox"
              name="other"
              checked={formData.services.other}
              onChange={handleChange}
            />
            Other
          </label>
        </fieldset>

        <button type="submit" className="submit-button">
          Send message
        </button>
      </form>

      <aside className="contact-info">
        <h3>Chat with us</h3>
        <p>Speak to our friendly team via live chat.</p>
        <ul>
          <li>
            <a href="#live-chat" className="contact-link">
              <FontAwesomeIcon icon={faComments} /> <u>Start a live chat</u>
            </a>
          </li>
          <li>
            <a href="mailto:support@nextstep.local" className="contact-link">
              <FontAwesomeIcon icon={faEnvelope} /> <u>Shoot us an email</u>
            </a>
          </li>
          <li>
            <a href="#message-x" className="contact-link">
              <FontAwesomeIcon icon={faTimes} /> <u>Message us on X</u>
            </a>
          </li>
        </ul>

        <h3>Call us</h3>
        <p>Call our team Mon–Fri from 8am to 5pm.</p>
        <p>
          <FontAwesomeIcon icon={faPhone} /> <strong>+92 000 000000</strong>
        </p>

        <h3>Visit us</h3>
        <p>Chat to us in person at our Melbourne HQ.</p>
        <p>
          <FontAwesomeIcon icon={faMapMarkerAlt} />{' '}
          <strong>Aptech Metro Star Gate </strong>
        </p>
      </aside>
    </section>
  );
}
