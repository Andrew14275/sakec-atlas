import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Analytics() {
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(false);

  // Fetch live weather data for Chembur (Lat: 19.0522, Lon: 72.8998)
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=19.0522&longitude=72.8998&current_weather=true');
        if (!response.ok) throw new Error('Weather API failed');
        const data = await response.json();
        setWeather(data.current_weather);
      } catch (err) {
        setWeatherError(true);
      } finally {
        setWeatherLoading(false);
      }
    };
    fetchWeather();
  }, []);

  // Bar Chart: Tech Stack Demand in Mumbai / India
  const barData = {
    labels: ['React.js', 'Node.js', 'Python / AI', 'Java', 'DevOps / Cloud'],
    datasets: [
      {
        label: 'Active Job Postings (Thousands)',
        data: [120, 95, 145, 110, 85],
        backgroundColor: '#212529',
        borderColor: '#000',
        borderWidth: 2,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Tech Stack Demand (2026)', font: { size: 14 } },
    },
    scales: { y: { beginAtZero: true } }
  };

  // Pie Chart: Developer Role Breakdown
  const pieData = {
    labels: ['Frontend', 'Backend', 'Full Stack', 'Data Science', 'Cyber Security'],
    datasets: [
      {
        label: 'Market Share (%)',
        data: [25, 20, 35, 12, 8],
        backgroundColor: ['#000000', '#343a40', '#6c757d', '#adb5bd', '#e9ecef'],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' },
    },
  };

  return (
    <div className="py-4">
      {/* Page Header */}
      <div className="row mb-5 justify-content-center text-center">
        <div className="col-md-8">
          <h2 className="fw-bold border-bottom border-dark pb-2 mb-3">Live Data Center</h2>
          <p className="text-muted fs-5">
            Real-time campus meteorology and tech industry market insights.
          </p>
        </div>
      </div>

      {/* Weather Widget */}
      <div className="row justify-content-center mb-5">
        <div className="col-lg-10">
          <div className="card bg-dark text-white rounded-0 border-0 shadow-sm p-4 d-flex flex-md-row justify-content-between align-items-center">
            <div>
              <h4 className="fw-bold text-uppercase mb-1">Chembur Campus Weather</h4>
              <p className="mb-0 text-white-50">Live feed from Open-Meteo API</p>
            </div>
            <div className="text-end mt-3 mt-md-0 d-flex align-items-center gap-4">
              {weatherLoading && <span className="spinner-border spinner-border-sm"></span>}
              {weatherError && <span className="text-danger fw-bold">Feed Offline</span>}
              {weather && (
                <>
                  <div className="text-center border-end border-secondary pe-4">
                    <h2 className="fw-bold mb-0">{weather.temperature}°C</h2>
                    <span className="small text-uppercase">Temperature</span>
                  </div>
                  <div className="text-center">
                    <h2 className="fw-bold mb-0">{weather.windspeed} <span className="fs-5">km/h</span></h2>
                    <span className="small text-uppercase">Wind Speed</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tech Job Charts Grid */}
      <div className="row justify-content-center">
        {/* Bar Chart */}
        <div className="col-lg-7 mb-4">
          <div className="card h-100 p-4 border-2 border-dark rounded-0">
            <h5 className="fw-bold mb-4 text-center text-uppercase border-bottom border-dark pb-2">Language & Stack Demand</h5>
            <div style={{ height: '300px', width: '100%' }}>
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="col-lg-5 mb-4">
          <div className="card h-100 p-4 border-2 border-dark rounded-0 bg-light">
            <h5 className="fw-bold mb-4 text-center text-uppercase border-bottom border-dark pb-2">Hiring Breakdown</h5>
            <div style={{ height: '300px', width: '100%' }}>
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}