import React, { useState, useEffect, useCallback } from "react";
import "../css/feedback.css";
import { FaUser, FaEnvelope, FaCommentDots } from "react-icons/fa";

export default function Feedback() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Khan",
      message:
        "Career Passport guided me step by step through a detailed assessment of my strengths and interests. The quiz results were highly accurate, and the suggested career paths gave me a clear direction for my future. I feel much more confident about my decisions now!",
      rating: 5,
      img: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      id: 2,
      name: "Ali Ahmed",
      message:
        "I was unsure about which career to pursue, but Career Passport made it simple. The platform provided personalized recommendations based on my skills and preferences, and I discovered career options I had never considered before. Truly insightful and practical!",
      rating: 5,
      img: "https://randomuser.me/api/portraits/men/62.jpg",
    },
    {
      id: 3,
      name: "Ayesha Iqbal",
      message:
        "The quizzes on Career Passport are very intuitive and easy to complete. I loved how the results were not just numbers but included detailed explanations and resources to explore different careers. It’s like having a career counselor at your fingertips!",
      rating: 4,
      img: "https://randomuser.me/api/portraits/women/24.jpg",
    },
    {
      id: 4,
      name: "Hamza Raza",
      message:
        "I’ve tried multiple career guidance tools before, but Career Passport is by far the most thorough. The platform highlights my strengths, suggests suitable careers, and even recommends skill-building resources. It helped me plan my future systematically.",
      rating: 5,
      img: "https://randomuser.me/api/portraits/men/95.jpg",
    },
    {
      id: 5,
      name: "Zoya Malik",
      message:
        "Career Passport exceeded my expectations! The recommendations matched my interests perfectly and gave me confidence to pursue my dream career. I also appreciated the professional design and user-friendly interface – it made the whole experience enjoyable.",
      rating: 5,
      img: "https://randomuser.me/api/portraits/women/85.jpg",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextTestimonial = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
        setTimeout(() => setIsAnimating(false), 100);
      }, 300);
    }
  }, [isAnimating, testimonials.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextTestimonial();
      }
    }, 4000); // Reduced to 4 seconds for better UX
    return () => clearInterval(interval);
  }, [nextTestimonial, isAnimating]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTypingComplete(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const prevTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setTimeout(() => setIsAnimating(false), 100);
      }, 300);
    }
  };

  const goToTestimonial = (index) => {
    if (!isAnimating && index !== current) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setTimeout(() => setIsAnimating(false), 100);
      }, 300);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    else if (formData.name.trim().length < 2) tempErrors.name = "Name must be at least 2 characters";

    if (!formData.email.trim()) tempErrors.email = "Email is required";
    else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email))
      tempErrors.email = "Enter a valid email";

    if (!formData.message.trim()) tempErrors.message = "Message is required";
    else if (formData.message.trim().length < 10) tempErrors.message = "Message must be at least 10 characters";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowPopup(true);
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    }
  };

  return (
    <div className="feedback-container">
      <h1 className="feedback-title">Feedback</h1>
      <p className={`feedback-subtitle ${typingComplete ? 'typing-complete' : ''}`}>
        See what our users say & share your feedback!
      </p>

      {/* Testimonials */}
      <section className="testimonial-section">
        <h2 className="testimonial-title">User Testimonials</h2>
        <div className="testimonial-slider">
          <button className="arrow prev" onClick={prevTestimonial} disabled={isAnimating}>
            &#8592;
          </button>
          <div className={`testimonial-card ${isAnimating ? 'slide-out' : 'slide-in'}`}>
            <img src={testimonials[current].img} alt={testimonials[current].name} className="testimonial-img" />
            <h3>{testimonials[current].name}</h3>
            <p>{testimonials[current].message}</p>
            <div className="stars">{"★".repeat(testimonials[current].rating)}</div>
          </div>
          <button className="arrow next" onClick={nextTestimonial} disabled={isAnimating}>
            &#8594;
          </button>
        </div>
        
        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === current ? 'active' : ''}`}
              onClick={() => goToTestimonial(index)}
              disabled={isAnimating}
            />
          ))}
        </div>
      </section>

      {/* Feedback Form */}
      <section className="form-section">
        <h2>Leave Your Feedback</h2>
        <form className="feedback-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className={errors.name ? "error" : ""}/>
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </div>
          <div className="form-group">
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" className={errors.email ? "error" : ""}/>
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>
          <div className="form-group">
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" rows="5" className={errors.message ? "error" : ""}></textarea>
            {errors.message && <span className="error-msg">{errors.message}</span>}
          </div>
          <button type="submit" className="submit-btn">Submit Feedback</button>
        </form>
      </section>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Thank You!</h3>
            <p>Your feedback has been submitted successfully.</p>
            <button onClick={() => setShowPopup(false)} className="close-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
