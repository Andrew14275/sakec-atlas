import React, { useState } from 'react';

export default function About() {
  // React State for Form Management
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', msg: '' });

  // ES6 Arrow Function for handling input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Strict ES6 Form Validation (Syllabus Requirement)
  const validateForm = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    // Regex pattern for valid email formats
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation Logic
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: 'danger', msg: 'Validation Error: All fields are required.' });
      return;
    }

    if (!emailRegex.test(email)) {
      setStatus({ type: 'danger', msg: 'Validation Error: Please enter a valid email address.' });
      return;
    }

    // Success State
    setStatus({ type: 'success', msg: 'System Message: Feedback submitted successfully to the developer.' });
    setFormData({ name: '', email: '', message: '' }); // Clear form
    
    // Clear success message after 3 seconds
    setTimeout(() => setStatus({ type: '', msg: '' }), 3000);
  };

  return (
    <div className="py-4">
      
      {/* Page Header */}
      <div className="row mb-5 justify-content-center text-center">
        <div className="col-md-8">
          <h2 className="fw-bold border-bottom border-dark pb-2 mb-3">About SAKEC Atlas</h2>
          <p className="text-muted fs-5">
            A centralized, SDG-aligned digital infrastructure project designed for the Shah & Anchor Kutchhi Engineering College ecosystem.
          </p>
        </div>
      </div>

      <div className="row justify-content-center gap-4">
        
        {/* Mission & Developer Details */}
        <div className="col-lg-5">
          <div className="card h-100 p-4">
            <h4 className="fw-bold mb-4 text-uppercase border-bottom border-2 border-dark pb-2">Platform Mission</h4>
            <p className="text-muted mb-4">
              SAKEC Atlas addresses localized campus inefficiencies by providing tools for academic resource sharing (SDG 17) and sustainable peer-to-peer transit coordination (SDG 11). Built exclusively as a Single Page Application (SPA) using React.js and dynamic APIs.
            </p>
            
            <h5 className="fw-bold mb-3 text-uppercase">System Architect</h5>
            <ul className="list-group list-group-flush border-dark border-top border-bottom mb-0">
              <li className="list-group-item bg-transparent px-0 text-dark fw-bold">Gagan Gowda</li>
              <li className="list-group-item bg-transparent px-0 text-muted">Class: FYCM-3 | Roll No: 12</li>
              <li className="list-group-item bg-transparent px-0 text-muted">Core Stack: React.js, Vite, Bootstrap 5, Chart.js</li>
            </ul>
          </div>
        </div>

        {/* Feedback Form with Validation */}
        <div className="col-lg-5">
          <div className="card h-100 p-4 bg-light">
            <h4 className="fw-bold mb-4 text-uppercase border-bottom border-2 border-dark pb-2">Developer Feedback</h4>
            
            {/* Dynamic Status Alert */}
            {status.msg && (
              <div className={`alert alert-${status.type} rounded-0 fw-bold border-2 border-${status.type} py-2`} role="alert">
                {status.msg}
              </div>
            )}

            <form onSubmit={validateForm}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-bold small text-uppercase">Full Name</label>
                <input 
                  type="text" 
                  className="form-control rounded-0 border-dark" 
                  id="name" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name" 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold small text-uppercase">Email Address</label>
                <input 
                  type="text" 
                  className="form-control rounded-0 border-dark" 
                  id="email" 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g., student@sakec.ac.in" 
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="form-label fw-bold small text-uppercase">Message / Bug Report</label>
                <textarea 
                  className="form-control rounded-0 border-dark" 
                  id="message" 
                  rows="3" 
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your issue or feedback here..."
                ></textarea>
              </div>
              <button type="submit" className="btn btn-custom w-100 py-2">Submit Feedback</button>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
}