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
      setStatus({ type: 'danger', msg: 'Error: Invalid email address format.' });
      return;
    }
    setStatus({ type: 'success', msg: 'Feedback submitted to the SYCM-2 developers.' });
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setStatus({ type: '', msg: '' }), 3000);
  };

  return (
    <div className="py-4">
      <div className="row mb-5 justify-content-center text-center">
        <div className="col-md-8">
          <h2 className="fw-bold border-bottom border-dark pb-2 mb-3">About SAKEC Atlas</h2>
          <p className="text-muted fs-5">Digital infrastructure for the Shah & Anchor ecosystem.</p>
        </div>
      </div>

      <div className="row justify-content-center gap-4">
        <div className="col-lg-5">
          <div className="card h-100 p-4 shadow-sm border-2 border-dark">
            <h4 className="fw-bold mb-4 text-uppercase border-bottom border-dark pb-2">System Architects</h4>
            <div className="mb-3">
              <span className="badge bg-dark mb-2 fs-6 rounded-0">Class: SYCM-2</span>
            </div>
            <ul className="list-group list-group-flush border-dark border-top border-bottom">
              <li className="list-group-item bg-transparent px-0 text-dark fw-bold d-flex justify-content-between">
                Gagan Gowda <span>Roll No: 12</span>
              </li>
              <li className="list-group-item bg-transparent px-0 text-dark fw-bold d-flex justify-content-between">
                Aryan Faliya <span>Roll No: 11</span>
              </li>
              <li className="list-group-item bg-transparent px-0 text-muted small mt-2">
                Core Stack: React.js (CRA), Bootstrap 5, Chart.js, Open Library API
              </li>
            </ul>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card h-100 p-4 bg-light border-2 border-dark">
            <h4 className="fw-bold mb-4 text-uppercase border-bottom border-dark pb-2">Developer Feedback</h4>
            {status.msg && <div className={`alert alert-${status.type} rounded-0 fw-bold border-2 py-2`}>{status.msg}</div>}
            <form onSubmit={validateForm}>
              <div className="mb-3"><input type="text" className="form-control rounded-0 border-dark" id="name" value={formData.name} onChange={handleChange} placeholder="Full Name" /></div>
              <div className="mb-3"><input type="text" className="form-control rounded-0 border-dark" id="email" value={formData.email} onChange={handleChange} placeholder="Email Address" /></div>
              <div className="mb-4"><textarea className="form-control rounded-0 border-dark" id="message" rows="3" value={formData.message} onChange={handleChange} placeholder="Message / Bug Report"></textarea></div>
              <button type="submit" className="btn btn-dark w-100 py-2 rounded-0 fw-bold">Submit Feedback</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}