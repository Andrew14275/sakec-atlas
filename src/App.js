import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Transit from './pages/Transit';
import Events from './pages/Events';
import Analytics from './pages/Analytics';
import About from './pages/About';

function App() {
  return (
    <Router>
      {/* High-Contrast Engineering Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white mb-4">
        <div className="container">
          <Link className="navbar-brand fw-bold text-uppercase fs-3" to="/">
            SAKEC Atlas
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#atlasNav"
            aria-controls="atlasNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="atlasNav">
            <div className="navbar-nav ms-auto gap-2">
              <Link className="nav-link fw-semibold text-dark" to="/">Resources</Link>
              <Link className="nav-link fw-semibold text-dark" to="/transit">TransitSync</Link>
              <Link className="nav-link fw-semibold text-dark" to="/events">Events</Link>
              <Link className="nav-link fw-semibold text-dark" to="/analytics">Analytics</Link>
              <Link className="nav-link fw-semibold text-dark" to="/about">About</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Routed Content Container */}
      <main className="container pb-5">
        <Routes>
          <Route path="/" element={<Home />} />
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