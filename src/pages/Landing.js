import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  const features = [
    {
      title: "Resource Hub",
      tag: "Live API",
      desc: "Instant search and access across academic textbooks, research papers, and reference guides via Open Library.",
      path: "/resources",
      cta: "Explore Textbooks →"
    },
    {
      title: "TransitSync",
      tag: "SDG 11",
      desc: "Peer-to-peer campus ride sharing and auto pooling for Chembur, Tilak Nagar, and surrounding routes.",
      path: "/transit",
      cta: "Find / Offer Ride →"
    },
    {
      title: "Campus Events",
      tag: "Active",
      desc: "RSVP to hackathons, EUREKA! pitches, robotics lab sessions, and open-source sprints in real time.",
      path: "/events",
      cta: "View Event Schedule →"
    },
    {
      title: "Tech Data & Weather",
      tag: "Chart.js",
      desc: "Live Chembur meteorological updates paired with tech stack demand, salary data, and job market trends.",
      path: "/analytics",
      cta: "Inspect Analytics →"
    }
  ];

  return (
    <div className="py-3">
      {/* Hero Section */}
      <section className="p-5 mb-5 bg-white border border-4 border-dark shadow-sm">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="badge bg-dark text-white rounded-0 px-3 py-2 text-uppercase">SYCM-2 Initiative</span>
              <span className="badge bg-light text-dark border border-dark rounded-0 px-3 py-2 text-uppercase">v2.0 Beta</span>
            </div>
            <h1 className="display-4 fw-black text-uppercase tracking-tight mb-3" style={{ fontWeight: 900 }}>
              SAKEC ATLAS
            </h1>
            <p className="lead text-muted mb-4 fs-5" style={{ maxWidth: '650px' }}>
              The unified campus dashboard for Shah &amp; Anchor Kutchhi Engineering College. Centralizing technical resources, sustainable commutes, hackathon registries, and real-time tech insights.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link to="/resources" className="btn btn-dark btn-lg rounded-0 fw-bold px-4 py-3 border-2 border-dark shadow-sm">
                Launch Resource Hub
              </Link>
              <Link to="/analytics" className="btn btn-outline-dark btn-lg rounded-0 fw-bold px-4 py-3 border-2 border-dark">
                Live Data Center
              </Link>
            </div>
          </div>

          {/* Metric Badges */}
          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="p-4 bg-light border border-2 border-dark">
              <h6 className="fw-bold text-uppercase border-bottom border-dark pb-2 mb-3">Campus Grid Stats</h6>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted small fw-bold">Active Modules</span>
                <span className="fw-bold">4 Linked</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted small fw-bold">Target Location</span>
                <span className="fw-bold">Chembur, Mumbai</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted small fw-bold">Framework</span>
                <span className="fw-bold">React.js (SPA)</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted small fw-bold">Syllabus Alignment</span>
                <span className="fw-bold text-success">Modules 1–4</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Navigation */}
      <section className="mb-5">
        <h3 className="fw-bold text-uppercase border-bottom border-2 border-dark pb-2 mb-4">Core Modules</h3>
        <div className="row g-4">
          {features.map((item, idx) => (
            <div className="col-md-6" key={idx}>
              <div className="card h-100 p-4 border border-2 border-dark d-flex flex-column justify-content-between bg-white">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge bg-dark rounded-0 px-2 py-1 small">{item.tag}</span>
                    <span className="text-muted fw-bold small">0{idx + 1}</span>
                  </div>
                  <h4 className="fw-bold mb-2">{item.title}</h4>
                  <p className="text-muted small mb-4">{item.desc}</p>
                </div>
                <Link to={item.path} className="btn btn-outline-dark rounded-0 fw-bold border-2 text-start">
                  {item.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}