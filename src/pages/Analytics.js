import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function Analytics() {
  const [articles, setArticles] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [activeRole, setActiveRole] = useState('Full Stack');

  // Fetch Live Global Tech News
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://dev.to/api/articles?tag=programming&top=1&per_page=4');
        if (!response.ok) throw new Error('Failed to fetch news');
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingNews(false);
      }
    };
    fetchNews();
  }, []);

  // Complex Data Structure for the Interactive Radar Chart
  const skillData = {
    'Full Stack': [90, 85, 70, 60, 80, 50],
    'AI / Machine Learning': [40, 20, 95, 85, 30, 90],
    'Cyber Security': [50, 40, 60, 40, 95, 75],
    'Cloud / DevOps': [60, 50, 65, 30, 90, 60]
  };

  const radarData = {
    labels: ['JavaScript/React', 'Node/Backend', 'Python', 'Mathematics', 'Networking/Security', 'Data Structures'],
    datasets: [
      {
        label: `${activeRole} Skill Requirements (%)`,
        data: skillData[activeRole],
        backgroundColor: 'rgba(79, 70, 229, 0.2)', // Cyber Indigo transparent
        borderColor: '#4f46e5',
        pointBackgroundColor: '#06b6d4', // Vibrant Cyan
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#06b6d4',
        borderWidth: 2,
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: 'rgba(0,0,0,0.1)' },
        grid: { color: 'rgba(0,0,0,0.1)' },
        pointLabels: { font: { size: 12, weight: 'bold' }, color: '#0f172a' },
        ticks: { display: false, min: 0, max: 100 }
      }
    },
    plugins: {
      legend: { position: 'top' }
    }
  };

  return (
    <div className="py-4">
      {/* Page Header */}
      <div className="row mb-5 justify-content-center text-center">
        <div className="col-md-9">
          <h2 className="fw-black display-5 text-uppercase tracking-tight mb-3">
            <span className="text-gradient">Global Tech Data</span>
          </h2>
          <p className="text-muted fs-5">
            Real-time industry insights, dynamic skill matrices, and live engineering feeds.
          </p>
        </div>
      </div>

      {/* Top Section: Interactive Skill Matrix */}
      <div className="row mb-5 justify-content-center">
        <div className="col-lg-10">
          <div className="card p-4 border-2 border-dark rounded-0 shadow-sm bg-white">
            <div className="row align-items-center">
              <div className="col-md-4 mb-4 mb-md-0 border-end border-dark border-2 pe-md-4">
                <h4 className="fw-bold mb-4 text-uppercase border-bottom border-dark pb-2">Career Trajectory Matrix</h4>
                <p className="small text-muted mb-4">Select an engineering discipline to view the current market skill density requirements.</p>
                
                <div className="d-flex flex-column gap-2">
                  {Object.keys(skillData).map(role => (
                    <button 
                      key={role}
                      onClick={() => setActiveRole(role)}
                      className={`btn w-100 rounded-0 fw-bold border-2 text-start ${activeRole === role ? 'btn-dark' : 'btn-outline-dark'}`}
                    >
                      {activeRole === role ? '▶ ' : ''}{role}
                    </button>
                  ))}
                </div>
              </div>
              <div className="col-md-8 ps-md-4" style={{ height: '350px' }}>
                <Radar data={radarData} options={radarOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Live Global Feed */}
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-dark border-3 pb-2">
            <h3 className="fw-bold m-0 text-uppercase">Live Developer Feed</h3>
            <span className="badge bg-dark rounded-0 px-3 py-2 animate-pulse">LIVE SECURE CONNECTION</span>
          </div>

          {loadingNews ? (
            <div className="text-center py-5">
              <div className="spinner-border text-dark mb-3" style={{ width: '3rem', height: '3rem' }} role="status"></div>
              <h5 className="fw-bold">Establishing API Connection...</h5>
            </div>
          ) : (
            <div className="row g-4">
              {articles.map((article) => (
                <div className="col-md-6" key={article.id}>
                  <div className="card h-100 p-0 border-2 border-dark rounded-0 bg-light transition-transform">
                    <div className="card-body p-4 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="badge bg-dark rounded-0 px-2 py-1">{article.tags.split(',')[0].toUpperCase()}</span>
                        <small className="text-muted fw-bold">❤️ {article.public_reactions_count}</small>
                      </div>
                      <h5 className="fw-bold mb-3">{article.title}</h5>
                      <p className="small text-muted mb-4">By {article.user.name} • {new Date(article.published_at).toLocaleDateString()}</p>
                      
                      <div className="mt-auto">
                        <a 
                          href={article.url} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="btn btn-outline-dark w-100 rounded-0 fw-bold border-2"
                        >
                          Read Global Report ↗
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}