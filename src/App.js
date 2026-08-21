import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Landing from './pages/Landing';
import Resources from './pages/Resources';
import Transit from './pages/Transit';
import Events from './pages/Events';
import Analytics from './pages/Analytics';
import About from './pages/About';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-white mb-4 border-bottom border-dark border-4">
        <div className="container">
          {/* New Text-Based Logo */}
          <Link className="navbar-brand fw-bold text-uppercase fs-3 d-flex align-items-center" to="/">
            <span className="bg-dark text-white px-2 py-1 me-1 shadow-sm">SAKEC</span>
            <span>ATLAS</span>
          </Link>
          <button className="navbar-toggler rounded-0 border-dark" type="button" data-bs-toggle="collapse" data-bs-target="#atlasNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="atlasNav">
            <div className="navbar-nav ms-auto gap-3 text-uppercase small fw-bold">
              <Link className="nav-link text-dark hover-underline" to="/">Home</Link>
              <Link className="nav-link text-dark" to="/resources">Resources</Link>
              <Link className="nav-link text-dark" to="/transit">TransitSync</Link>
              <Link className="nav-link text-dark" to="/events">Events</Link>
              <Link className="nav-link text-dark" to="/analytics">Tech Data</Link>
              <Link className="nav-link text-dark" to="/about">About</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="container pb-5">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/transit" element={<Transit />} />
          <Route path="/events" element={<Events />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;