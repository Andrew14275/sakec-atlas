import React, { useState, useEffect } from 'react';

export default function Transit() {
  const [transitRoutes, setTransitRoutes] = useState([
    { id: 1, type: "Carpool", route: "Tilak Nagar to SAKEC", seats: 2, host: "Smit", contact: "9876543210", time: "7:45 AM", status: "Active" },
    { id: 2, type: "Auto Share", route: "Chembur Station to SAKEC", seats: 1, host: "Veer", contact: "9876543211", time: "8:00 AM", status: "Active" },
    { id: 3, type: "Carpool", route: "Ghatkopar West to SAKEC", seats: 3, host: "Aditya", contact: "9876543212", time: "7:30 AM", status: "Active" },
    { id: 4, type: "Walking Group", route: "W.T. Patil Marg to Campus", seats: "Unlimited", host: "Arman", contact: "9876543213", time: "8:15 AM", status: "Active" },
    { id: 5, type: "Carpool", route: "Kurla East to SAKEC", seats: 1, host: "Pratik", contact: "9876543214", time: "7:50 AM", status: "Full" }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [generatedQR, setGeneratedQR] = useState(null); // Stores the QR Code URL
  
  const [formData, setFormData] = useState({ type: 'Carpool', route: '', seats: '', host: '', contact: '', time: '' });

  // --- THE MAGIC: Check URL for Shared Rides on Load ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('share') === 'true') {
      const sharedRide = {
        id: Date.now(),
        type: params.get('type') || 'Carpool',
        route: params.get('route'),
        host: params.get('host'),
        contact: params.get('contact'),
        time: params.get('time'),
        seats: params.get('seats'),
        status: 'Active'
      };
      
      // If valid data exists, add it to the top of the list
      if (sharedRide.route && sharedRide.host) {
        setTransitRoutes(prev => {
          // Prevent duplicates if user refreshes the page
          if (!prev.some(r => r.route === sharedRide.route && r.host === sharedRide.host)) {
             return [sharedRide, ...prev];
          }
          return prev;
        });
      }
      
      // Clean up the URL so it looks normal again
      window.history.replaceState(null, '', '/transit');
    }
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handlePostRide = (e) => {
    e.preventDefault();
    if (!formData.route || !formData.host || !formData.time || !formData.seats || !formData.contact) return; 
    
    // Add locally to the poster's screen
    const newRide = { id: Date.now(), ...formData, status: 'Active' };
    setTransitRoutes([newRide, ...transitRoutes]);
    
    // Construct the secret sharing URL using the current website's domain
    const shareUrl = `${window.location.origin}/transit?share=true&type=${encodeURIComponent(formData.type)}&route=${encodeURIComponent(formData.route)}&host=${encodeURIComponent(formData.host)}&contact=${encodeURIComponent(formData.contact)}&time=${encodeURIComponent(formData.time)}&seats=${encodeURIComponent(formData.seats)}`;
    
    // Use a public API to turn the URL into a QR code image
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`;
    setGeneratedQR(qrImageUrl);
    
    // Reset form but keep the UI open to show the QR code
    setFormData({ type: 'Carpool', route: '', seats: '', host: '', contact: '', time: '' });
  };

  const filteredRoutes = transitRoutes.filter(route => 
    route.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.host.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-4">
      <div className="row mb-4 justify-content-center text-center">
        <div className="col-md-8">
          <h2 className="fw-bold border-bottom border-dark pb-2 mb-3">TransitSync (SDG 11)</h2>
          <p className="text-muted fs-5 mb-4">
            Reduce campus carbon footprint by coordinating peer-to-peer carpools and shared auto rides.
          </p>
          
          <div className="d-flex flex-column flex-md-row gap-3">
            <input 
              type="text" 
              className="form-control form-control-lg border-2 border-dark rounded-0 shadow-sm" 
              placeholder="Search by location or host..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              className="btn btn-dark btn-lg rounded-0 fw-bold border-2 px-4 whitespace-nowrap"
              onClick={() => { setShowForm(!showForm); setGeneratedQR(null); }}
              style={{ minWidth: '180px' }}
            >
              {showForm ? 'Cancel Form' : '+ Post a Ride'}
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="row justify-content-center mb-5 fade-in">
          <div className="col-lg-8">
            <div className="card p-4 border border-3 border-dark bg-white rounded-0 shadow-sm">
              
              {/* Show QR Code if a ride was just posted */}
              {generatedQR ? (
                <div className="text-center py-4">
                  <h4 className="fw-bold text-success mb-3">Route Published Successfully!</h4>
                  <p className="text-muted mb-4">Scan this QR code with another phone to instantly sync this ride to their device.</p>
                  <img src={generatedQR} alt="Scan to join ride" className="border border-3 border-dark p-2 rounded bg-white shadow-sm mb-4" />
                  <br />
                  <button onClick={() => { setShowForm(false); setGeneratedQR(null); }} className="btn btn-outline-dark rounded-0 fw-bold px-4">
                    Close
                  </button>
                </div>
              ) : (
                /* Otherwise, show the normal form */
                <>
                  <h5 className="fw-bold text-uppercase border-bottom border-dark pb-2 mb-3 text-gradient">Register New Route</h5>
                  <form onSubmit={handlePostRide} className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label small fw-bold">Transport Type</label>
                      <select id="type" className="form-select border-dark rounded-0" value={formData.type} onChange={handleChange}>
                        <option>Carpool</option>
                        <option>Auto Share</option>
                        <option>Walking Group</option>
                      </select>
                    </div>
                    <div className="col-md-8">
                      <label className="form-label small fw-bold">Route Name</label>
                      <input type="text" id="route" className="form-control border-dark rounded-0" placeholder="e.g., Vashi to SAKEC" value={formData.route} onChange={handleChange} required />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-bold">Host Name</label>
                      <input type="text" id="host" className="form-control border-dark rounded-0" placeholder="Your Name" value={formData.host} onChange={handleChange} required />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-bold">WhatsApp / Phone</label>
                      <input type="text" id="contact" className="form-control border-dark rounded-0" placeholder="10-digit number" value={formData.contact} onChange={handleChange} required />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label small fw-bold">Time</label>
                      <input type="text" id="time" className="form-control border-dark rounded-0" placeholder="8:30 AM" value={formData.time} onChange={handleChange} required />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label small fw-bold">Seats</label>
                      <input type="number" id="seats" className="form-control border-dark rounded-0" placeholder="3" value={formData.seats} onChange={handleChange} required />
                    </div>
                    <div className="col-12 mt-4 text-end">
                      <button type="submit" className="btn btn-dark rounded-0 fw-bold px-5">Generate Sync Code</button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="row">
            {filteredRoutes.length > 0 ? (
              filteredRoutes.map((route) => (
                <div className="col-md-6 mb-4" key={route.id}>
                  <div className="card h-100 p-0 border-2 border-dark rounded-0 transition-transform">
                    <div className="card-header bg-dark text-white rounded-0 border-0 py-3 d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 fw-bold">{route.type}</h5>
                      <span className={`badge ${route.status === 'Full' ? 'bg-danger' : 'bg-success'} rounded-0`}>
                        {route.status}
                      </span>
                    </div>
                    <div className="card-body p-4 bg-white d-flex flex-column">
                      <h4 className="fw-bold mb-3">{route.route}</h4>
                      
                      <div className="d-flex justify-content-between text-muted mb-3 pb-2 border-bottom border-dashed">
                        <span className="fw-bold text-dark">Host: {route.host}</span>
                        <span className="fw-bold text-dark">Time: {route.time}</span>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
                        <p className="mb-0 text-muted">Seats: <strong className="text-dark fs-5">{route.seats}</strong></p>
                      </div>
                      
                      <div className="mt-auto d-flex gap-2">
                        <button className={`btn flex-grow-1 py-2 rounded-0 fw-bold border-2 border-dark ${route.status === 'Full' ? 'btn-outline-secondary disabled' : 'btn-outline-dark'}`}>
                          {route.status === 'Full' ? 'Route Full' : 'Request to Join'}
                        </button>
                        <a href={`https://wa.me/91${route.contact}?text=Hey%20${route.host},%20I%20saw%20your%20ride%20on%20SAKEC%20Atlas.%20Are%20there%20still%20seats%20available?`} target="_blank" rel="noreferrer" className={`btn py-2 rounded-0 fw-bold border-2 border-dark ${route.status === 'Full' ? 'btn-secondary disabled border-secondary' : 'btn-dark'}`}>
                          Chat 💬
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center mt-4">
                <h4 className="text-muted fw-bold">No transit routes found.</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}