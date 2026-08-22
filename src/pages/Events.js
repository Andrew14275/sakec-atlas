import React, { useState } from 'react';

export default function Events() {
  const [filter, setFilter] = useState('All');

  // Extracted Data from SAKEC Flyers
  const eventsData = [
    {
      id: 1,
      type: 'Hackathon',
      title: 'SAKEC CHIPMONK HACKATHON 2026',
      org: 'Dept of EXTC | SAKEC-IIC | Students Council',
      date: '10th - 11th April 2026',
      time: 'Phase 1 Starts Mar 15',
      fee: '₹ 200',
      prize: '₹ 60,000 Pool',
      desc: 'National Level Hackathon focusing on essential VLSI IP blocks forming the backbone of SoCs and ASICs.',
      tags: ['Hardware', 'VLSI', 'National Level']
    },
    {
      id: 2,
      type: 'Internship',
      title: 'The Art of UI/UX Summer Internship',
      org: 'Computer Eng Dept in Collab with CSI-SAKEC',
      date: '4th June - 14th June 2026',
      time: '10:00 AM - 5:00 PM',
      fee: '₹ 200 (SAKEC) / ₹ 400 (Non-SAKEC)',
      prize: 'Lab 618-619',
      desc: 'Learn, Design, Innovate. Featuring Industry Expert Tanmay Shirsat from Clayfin Technologies.',
      tags: ['Design', 'UI/UX', 'CSI']
    },
    {
      id: 3,
      type: 'Internship',
      title: 'Next-Gen Networking: Smart Networks & Auto',
      org: 'EXTC in Collab with IETE-SAKEC & COE',
      date: 'Starting 8th June 2026',
      time: '2 Weeks Intensive',
      fee: '₹ 199 (IETE) / ₹ 399 (Non)',
      prize: 'Cisco SDN Labs',
      desc: 'Gain hands-on experience with real-world networking technologies and automation tools via GNS3.',
      tags: ['Networking', 'Cisco', 'IETE']
    },
    {
      id: 4,
      type: 'Seminar',
      title: 'From Data Centres to Devices: Modern AI',
      org: 'Dept of AI and DS (Cogniscience Club)',
      date: '18th April 2026',
      time: '3:00 PM Onwards',
      fee: 'Free',
      prize: 'Online Mode',
      desc: 'An immersive session on the journey of modern AI led by Mr. Pratyush Talreja.',
      tags: ['AI', 'Data Science', 'Seminar']
    },
    {
      id: 5,
      type: 'FDP',
      title: 'Agentic AI for Service Sector Applications',
      org: 'EXTC with IETE-SAKEC & IIC-SAKEC',
      date: '22nd - 27th June 2026',
      time: '6 Days Online',
      fee: 'For Faculty',
      prize: 'Online Mode',
      desc: 'Focusing on Healthcare, Education, and Finance with speakers from IIT, MIT, and NPCI.',
      tags: ['Agentic AI', 'FDP', 'Research']
    }
  ];

  const filteredEvents = filter === 'All' 
    ? eventsData 
    : eventsData.filter(e => e.type === filter);

  return (
    <div className="py-4">
      {/* Header */}
      <div className="row mb-5 justify-content-center text-center">
        <div className="col-md-9">
          <h2 className="fw-black display-5 text-uppercase tracking-tight mb-3">
            Campus <span style={{ color: 'var(--sakec-primary)' }}>Radar</span>
          </h2>
          <p className="text-muted fs-5">
            The central registry for SAKEC hackathons, internships, and technical seminars.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
        {['All', 'Hackathon', 'Internship', 'Seminar', 'FDP'].map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`btn rounded-0 fw-bold border-2 px-4 ${filter === cat ? 'btn-dark' : 'btn-outline-dark'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="row g-4 justify-content-center">
        {filteredEvents.map(event => (
          <div className="col-lg-6" key={event.id}>
            <div className="card h-100 p-0 rounded-0 shadow-sm transition-transform" style={{ border: '2px solid var(--sakec-dark)', borderTop: '6px solid var(--sakec-primary)' }}>
              <div className="card-body p-4 d-flex flex-column">
                
                {/* Badges & Meta */}
                <div className="d-flex justify-content-between align-items-start mb-3 border-bottom border-dark border-2 pb-3">
                  <div>
                    <span className="badge bg-dark rounded-0 px-2 py-1 mb-2 text-uppercase">{event.type}</span>
                    <h4 className="fw-black text-uppercase mb-1" style={{ letterSpacing: '-0.5px' }}>{event.title}</h4>
                    <small className="text-muted fw-bold d-block">{event.org}</small>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="row g-3 mb-4">
                  <div className="col-6">
                    <p className="mb-0 text-muted small text-uppercase fw-bold">Schedule</p>
                    <p className="mb-0 fw-bold">{event.date}</p>
                    <small className="text-muted">{event.time}</small>
                  </div>
                  <div className="col-6">
                    <p className="mb-0 text-muted small text-uppercase fw-bold">Details</p>
                    <p className="mb-0 fw-bold">{event.prize}</p>
                    <small className="text-muted">Fee: {event.fee}</small>
                  </div>
                </div>

                <p className="text-muted small mb-4">{event.desc}</p>

                {/* Tags & Action */}
                <div className="mt-auto">
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {event.tags.map((tag, i) => (
                      <span key={i} className="badge bg-light text-dark border border-dark rounded-0">#{tag}</span>
                    ))}
                  </div>
                  
                  <button className="btn btn-dark w-100 rounded-0 fw-bold border-2 py-2 text-uppercase" style={{ transition: 'all 0.3s' }}
                    onMouseOver={(e) => e.target.style.backgroundColor = 'var(--sakec-primary)'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'var(--sakec-dark)'}
                  >
                    View Registration Portal
                  </button>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}