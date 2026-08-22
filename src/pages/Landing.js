import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  const modules = [
    {
      title: "Resource Hub",
      badge: "Open Library API",
      sdg: "SDG 4: Quality Education",
      desc: "Real-time academic catalog with search, publication date/title sorting, and an instant content viewer modal.",
      path: "/resources",
      cta: "Explore Textbooks →"
    },
    {
      title: "Campus Radar",
      badge: "Active Registry",
      sdg: "SDG 9: Innovation & Infra",
      desc: "Central hub for SAKEC hackathons (ChipMonk VLSI), summer internships (UI/UX, Cisco SDN), and AI seminars.",
      path: "/events",
      cta: "View Event Schedule →"
    },
    {
      title: "TransitSync",
      badge: "SDG 11 Engine",
      sdg: "SDG 11: Sustainable Communities",
      desc: "Peer-to-peer campus ride sharing, auto pooling, and WhatsApp direct-connect for Chembur and Tilak Nagar commutes.",
      path: "/transit",
      cta: "Find / Share Ride →"
    },
    {
      title: "Global Tech Data",
      badge: "Chart.js & Dev.to",
      sdg: "SDG 9: Industry Insights",
      desc: "Dynamic career trajectory radar matrix paired with a live, sortable developer news stream and deep-dive modal.",
      path: "/analytics",
      cta: "Inspect Analytics →"
    }
  ];

  return (
    <div className="py-2">
      {/* Hero Section */}
      <section className="p-5 mb-5 bg-white border border-3 border-dark rounded-0 shadow-sm" style={{ borderTop: '6px solid var(--sakec-primary)' }}>
        <div className="row align-items-center">
          <div className="col-lg-8">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="badge bg-dark text-white rounded-0 px-3 py-2 text-uppercase">SYCM-2 Initiative</span>
              <span className="badge text-white rounded-0 px-3 py-2 text-uppercase" style={{ backgroundColor: 'var(--sakec-primary)' }}>Campus Grid Active</span>
            </div>
            <h1 className="display-4 fw-black text-uppercase tracking-tight mb-3" style={{ fontWeight: 900 }}>
              SAKEC <span style={{ color: 'var(--sakec-primary)' }}>ATLAS</span>
            </h1>
            <p className="lead text-muted mb-4 fs-5" style={{ maxWidth: '680px' }}>
              The unified digital platform for Shah &amp; Anchor Kutchhi Engineering College. Bridging open academic resources, sustainable transit, departmental technical events, and real-time developer industry feeds.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link to="/resources" className="btn btn-dark btn-lg rounded-0 fw-bold px-4 py-3 border-2 border-dark shadow-sm">
                Open Resource Hub
              </Link>
              <Link to="/events" className="btn btn-outline-dark btn-lg rounded-0 fw-bold px-4 py-3 border-2 border-dark">
                View Campus Radar
              </Link>
            </div>
          </div>

          {/* Infrastructure Metrics */}
          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="p-4 bg-light border border-2 border-dark rounded-0">
              <h6 className="fw-bold text-uppercase border-bottom border-dark pb-2 mb-3">System Blueprint</h6>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted small fw-bold">Institution</span>
                <span className="fw-bold text-truncate" style={{ maxWidth: '160px' }}>SAKEC Mumbai</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted small fw-bold">Target Location</span>
                <span className="fw-bold">Chembur, 400088</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted small fw-bold">Live Endpoints</span>
                <span className="fw-bold">Open Library &amp; Dev.to</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted small fw-bold">UN SDG Compliance</span>
                <span className="fw-bold text-success">Goals 4, 9, 11, 13</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Modules Grid */}
      <section className="mb-5">
        <h3 className="fw-bold text-uppercase border-bottom border-2 border-dark pb-2 mb-4">Core Architecture Modules</h3>
        <div className="row g-4">
          {modules.map((item, idx) => (
            <div className="col-md-6" key={idx}>
              <div className="card h-100 p-4 border border-2 border-dark rounded-0 d-flex flex-column justify-content-between bg-white shadow-sm" style={{ borderLeft: '5px solid var(--sakec-primary)' }}>
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-dark rounded-0 px-2 py-1 small">{item.badge}</span>
                    <span className="badge bg-light text-dark border border-dark rounded-0 small">{item.sdg}</span>
                  </div>
                  <h4 className="fw-bold mb-2 mt-2">{item.title}</h4>
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