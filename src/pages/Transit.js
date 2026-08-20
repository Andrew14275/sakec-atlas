import React, { useState } from 'react';

export default function Transit() {
  // Localized mock data for SAKEC commuters (SDG 11)
  const transitRoutes = [
    { id: 1, type: "Carpool", route: "Tilak Nagar to SAKEC", seats: 2, host: "Smit", time: "7:45 AM", status: "Active" },
    { id: 2, type: "Auto Share", route: "Chembur Station to SAKEC", seats: 1, host: "Veer", time: "8:00 AM", status: "Active" },
    { id: 3, type: "Carpool", route: "Ghatkopar West to SAKEC", seats: 3, host: "Aditya", time: "7:30 AM", status: "Active" },
    { id: 4, type: "Walking Group", route: "W.T. Patil Marg to Campus", seats: "Unlimited", host: "Arman", time: "8:15 AM", status: "Active" },
    { id: 5, type: "Carpool", route: "Kurla East to SAKEC", seats: 1, host: "Pratik", time: "7:50 AM", status: "Full" }
  ];

  // React State for the live search filter
  const [searchTerm, setSearchTerm] = useState('');

  // ES6 Filter logic
  const filteredRoutes = transitRoutes.filter(route => 
    route.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.host.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-4">
      {/* Page Header */}
      <div className="row mb-5 justify-content-center text-center">
        <div className="col-md-8">
          <h2 className="fw-bold border-bottom border-dark pb-2 mb-3">TransitSync (SDG 11)</h2>
          <p className="text-muted fs-5">
            Reduce campus carbon footprint by coordinating peer-to-peer carpools and shared auto rides.
          </p>
          <div className="mt-4">
            <input 
              type="text" 
              className="form-control form-control-lg border-2 border-dark rounded-0 shadow-sm" 
              placeholder="Filter by location (e.g., Chembur) or host name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Transit Routes Grid */}
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="row">
            {filteredRoutes.length > 0 ? (
              filteredRoutes.map((route) => (
                <div className="col-md-6 mb-4" key={route.id}>
                  <div className="card h-100 p-0 border-2 border-dark">
                    <div className="card-header bg-dark text-white rounded-0 border-0 py-3 d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 fw-bold">{route.type}</h5>
                      <span className={`badge ${route.status === 'Full' ? 'bg-danger' : 'bg-success'} rounded-0`}>
                        {route.status}
                      </span>
                    </div>
                    <div className="card-body p-4 bg-light">
                      <h4 className="fw-bold mb-3">{route.route}</h4>
                      <div className="d-flex justify-content-between text-muted mb-3">
                        <span className="fw-bold text-dark">Host: {route.host}</span>
                        <span className="fw-bold text-dark">Time: {route.time}</span>
                      </div>
                      <p className="mb-4 text-muted">Available Seats: <strong className="text-dark fs-5">{route.seats}</strong></p>
                      
                      <button 
                        className={`btn w-100 py-2 rounded-0 fw-bold border-2 border-dark ${route.status === 'Full' ? 'btn-outline-secondary disabled' : 'btn-outline-dark'}`}
                      >
                        {route.status === 'Full' ? 'Route Full' : 'Request to Join'}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center mt-4">
                <h4 className="text-muted fw-bold">No transit routes found for your search.</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}