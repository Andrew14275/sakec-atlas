import React, { useState } from 'react';

export default function Events() {
  // Live SAKEC & Online Event Database
  const campusEvents = [
    { 
      id: 1, 
      title: "EUREKA! 2026 – Startup Pitching", 
      date: "Aug 25, 2026", 
      time: "10:00 AM - 2:00 PM", 
      location: "7th Floor Auditorium, SAKEC", 
      category: "Startup Pitch",
      description: "Pitch your startup idea to industry experts. Top teams advance to Zonal Rounds. Organized by EIC & IIC SAKEC."
    },
    { 
      id: 2, 
      title: "SAKEC SIH Orientation 2026", 
      date: "Aug 18, 2026", 
      time: "Evening (Check WhatsApp)", 
      location: "Online (Microsoft Teams)", 
      category: "Hackathon Prep",
      description: "Gateway to the Smart India Hackathon. Get a clear roadmap, interact with faculty coordinators, and form your teams."
    },
    { 
      id: 3, 
      title: "Open Source Connect India (OSCI'26)", 
      date: "Sep 5, 2026", 
      time: "11:00 AM", 
      location: "Online / TBA", 
      category: "Open Source",
      description: "Hands-on workshops to build your GitHub, contribute to real open-source projects, and network with founders."
    },
    { 
      id: 4, 
      title: "Global AI-First Hackathon", 
      date: "Sep 12, 2026", 
      time: "48-Hour Sprint", 
      location: "Online (Devfolio)", 
      category: "Global Hackathon",
      description: "Build innovative tools using modern LLMs. Open to all engineering students looking to expand their AI portfolio."
    },
    { 
      id: 5, 
      title: "Web3 Decentralized App Builder", 
      date: "Sep 20, 2026", 
      time: "9:00 AM", 
      location: "Online (Devpost)", 
      category: "Global Hackathon",
      description: "Compete globally to build the best dApp using React.js and Solidity. Great for expanding your modern tech stack."
    }
  ];

  // React State to track user RSVPs
  const [rsvps, setRsvps] = useState({});

  // Toggle RSVP status instantly without reloading
  const toggleRSVP = (eventId) => {
    setRsvps(prevState => ({
      ...prevState,
      [eventId]: !prevState[eventId]
    }));
  };

  return (
    <div className="py-4">
      {/* Page Header */}
      <div className="row mb-5 justify-content-center text-center">
        <div className="col-md-8">
          <h2 className="fw-bold border-bottom border-dark pb-2 mb-3">Campus & Global Events</h2>
          <p className="text-muted fs-5">
            Discover and RSVP to technical workshops, internal SAKEC hackathons, and global coding sprints.
          </p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {campusEvents.map((event) => (
            <div className="card mb-4 p-0" key={event.id}>
              <div className="row g-0 align-items-center p-3">
                
                {/* Event Details */}
                <div className="col-md-9">
                  <span className="badge bg-secondary rounded-0 mb-2 px-3 py-1 text-uppercase">{event.category}</span>
                  <h4 className="fw-bold mb-2">{event.title}</h4>
                  <p className="text-muted mb-2 pe-md-4">{event.description}</p>
                  <div className="d-flex flex-wrap gap-3 gap-md-4 text-dark small fw-bold">
                    <span>📅 {event.date}</span>
                    <span>⏰ {event.time}</span>
                    <span>📍 {event.location}</span>
                  </div>
                </div>

                {/* React State Action Button */}
                <div className="col-md-3 text-md-end mt-3 mt-md-0 border-start border-2 border-dark ps-md-3">
                  <button 
                    onClick={() => toggleRSVP(event.id)}
                    className={`btn btn-lg rounded-0 fw-bold border-2 border-dark w-100 py-3 ${
                      rsvps[event.id] ? 'btn-dark text-white' : 'btn-outline-dark'
                    }`}
                    style={{ transition: 'all 0.2s ease-in-out' }}
                  >
                    {rsvps[event.id] ? '✓ ATTENDING' : 'RSVP NOW'}
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}