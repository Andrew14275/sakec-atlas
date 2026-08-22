import React, { useState } from 'react';

export default function About() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', msg: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const validateForm = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: 'danger', msg: 'Error: All fields are required.' });
      return;
    }
    if (!emailRegex.test(email)) {
      setStatus({ type: 'danger', msg: 'Error: Invalid email format.' });
      return;
    }
    setStatus({ type: 'success', msg: 'Feedback submitted to the SYCM-2 engineering architects.' });
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setStatus({ type: '', msg: '' }), 3500);
  };

  const sdgGoals = [
    {
      num: "SDG 4",
      name: "Quality Education",
      desc: "Democratizing academic reference material with instant zero-cost textbook discovery via the Open Library API."
    },
    {
      num: "SDG 9",
      name: "Industry & Innovation",
      desc: "Visualizing dynamic software engineering skill demands via Chart.js and feeding real-time global developer trends."
    },
    {
      num: "SDG 11",
      name: "Sustainable Cities",
      desc: "Facilitating peer-to-peer carpools and station auto shares to reduce carbon congestion across Chembur routes."
    },
    {
      num: "SDG 13",
      name: "Climate Action",
      desc: "Lowering localized campus transport emissions through synchronized student rides and shared urban transit."
    }
  ];

  return (
    <div className="py-4">
      {/* Header */}
      <div className="row mb-5 justify-content-center text-center">
        <div className="col-md-9">
          <h2 className="fw-black display-5 text-uppercase tracking-tight mb-2">
            About <span style={{ color: 'var(--sakec-primary)' }}>SAKEC Atlas</span>
          </h2>
          <p className="text-muted fs-5">
            Architected as a centralized digital nervous system for Shah &amp; Anchor Kutchhi Engineering College.
          </p>
        </div>
      </div>

      {/* UN Sustainable Development Goals Section */}
      <div className="row mb-5 justify-content-center">
        <div className="col-lg-11">
          <div className="card p-4 border-2 border-dark rounded-0 bg-white shadow-sm" style={{ borderTop: '6px solid var(--sakec-primary)' }}>
            <h4 className="fw-bold text-uppercase border-bottom border-dark pb-2 mb-4">
              United Nations Sustainable Development Goals (SDG) Alignment
            </h4>
            <div className="row g-4">
              {sdgGoals.map((sdg, index) => (
                <div className="col-md-6 col-lg-3" key={index}>
                  <div className="p-3 bg-light border border-2 border-dark h-100 d-flex flex-column justify-content-between rounded-0">
                    <div>
                      <span className="badge bg-dark text-white rounded-0 px-2 py-1 mb-2">{sdg.num}</span>
                      <h6 className="fw-bold mb-2">{sdg.name}</h6>
                      <p className="text-muted small mb-0">{sdg.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Architect Credentials & Feedback Form */}
      <div className="row justify-content-center g-4">
        <div className="col-lg-5">
          <div className="card h-100 p-4 border-2 border-dark rounded-0 bg-white shadow-sm">
            <h4 className="fw-bold mb-4 text-uppercase border-bottom border-dark pb-2">System Architects</h4>
            <div className="mb-3">
              <span className="badge bg-dark fs-6 rounded-0 px-3 py-2">Class: SYCM-2</span>
            </div>
            <ul className="list-group list-group-flush border-dark border-top border-bottom mb-4">
              <li className="list-group-item bg-transparent px-0 text-dark fw-bold d-flex justify-content-between align-items-center">
                <span>Gagan Gowda</span>
                <span className="badge bg-light text-dark border border-dark rounded-0">Roll No: 12</span>
              </li>
              <li className="list-group-item bg-transparent px-0 text-dark fw-bold d-flex justify-content-between align-items-center">
                <span>Aryan Faliya</span>
                <span className="badge bg-light text-dark border border-dark rounded-0">Roll No: 11</span>
              </li>
            </ul>
            <div className="p-3 bg-light border border-dark rounded-0">
              <p className="mb-1 text-uppercase small fw-bold text-muted">Core Technology Stack</p>
              <p className="mb-0 small fw-bold">React.js (SPA), Bootstrap 5, Chart.js, Open Library API, Dev.to REST API</p>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card h-100 p-4 bg-light border-2 border-dark rounded-0 shadow-sm">
            <h4 className="fw-bold mb-3 text-uppercase border-bottom border-dark pb-2">Developer Dispatch</h4>
            <p className="small text-muted mb-3">Submit bug reports, feature suggestions, or architectural inquiries directly to the engineering team.</p>
            
            {status.msg && <div className={`alert alert-${status.type} rounded-0 fw-bold border-2 py-2 small`}>{status.msg}</div>}
            
            <form onSubmit={validateForm}>
              <div className="mb-3">
                <input type="text" className="form-control rounded-0 border-dark" id="name" value={formData.name} onChange={handleChange} placeholder="Full Name" />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control rounded-0 border-dark" id="email" value={formData.email} onChange={handleChange} placeholder="Email Address" />
              </div>
              <div className="mb-3">
                <textarea className="form-control rounded-0 border-dark" id="message" rows="3" value={formData.message} onChange={handleChange} placeholder="Message / System Feedback"></textarea>
              </div>
              <button type="submit" className="btn btn-dark w-100 py-2 rounded-0 fw-bold border-2">
                Submit Dispatch
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}