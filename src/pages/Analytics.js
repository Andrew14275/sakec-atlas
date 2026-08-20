import React from 'react';
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
import { Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS modules required by react-chartjs-2
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
  // Bar Chart Data: SDG 17 Cross-Department Sharing
  const barData = {
    labels: ['Computer Eng', 'IT', 'AI & DS', 'Electronics', 'Cyber Sec'],
    datasets: [
      {
        label: 'Resources Shared (Monthly)',
        data: [145, 110, 85, 60, 40],
        backgroundColor: '#212529', // Dark Slate/Black
        borderColor: '#000',
        borderWidth: 2,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { 
        display: true, 
        text: 'SDG 17: Inter-Department Knowledge Exchange', 
        font: { size: 14, family: 'Segoe UI' } 
      },
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  // Doughnut Chart Data: Most Searched Textbook Categories
  const doughnutData = {
    labels: ['Web Tech', 'Applied Math', 'Physics', 'Hardware', 'Data Sci'],
    datasets: [
      {
        label: 'Search Volume (%)',
        data: [35, 25, 15, 15, 10],
        // Gradient of greys to match the high-contrast theme
        backgroundColor: ['#000000', '#495057', '#6c757d', '#adb5bd', '#dee2e6'],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  return (
    <div className="py-4">
      {/* Page Header */}
      <div className="row mb-5 justify-content-center text-center">
        <div className="col-md-8">
          <h2 className="fw-bold border-bottom border-dark pb-2 mb-3">Impact Analytics</h2>
          <p className="text-muted fs-5">
            Visualizing campus collaboration and academic resource exchange to support UN SDG 17 (Partnerships for the Goals).
          </p>
        </div>
      </div>

      {/* Chart.js Grid */}
      <div className="row justify-content-center align-items-stretch">
        
        {/* Bar Chart Card */}
        <div className="col-lg-7 mb-4">
          <div className="card h-100 p-4">
            <h5 className="fw-bold mb-4 text-center text-uppercase">Department Engagement</h5>
            <div className="flex-grow-1 d-flex align-items-center">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </div>

        {/* Doughnut Chart Card */}
        <div className="col-lg-5 mb-4">
          <div className="card h-100 p-4">
            <h5 className="fw-bold mb-4 text-center text-uppercase">Top Query Categories</h5>
            <div className="flex-grow-1 d-flex justify-content-center align-items-center">
              <div style={{ width: '85%' }}>
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}