import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './DonationChart.css';

// Register the components with Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DonationChart = () => {
  // Data for the chart
  const data = {
    labels: ['2024-08-29', '2024-08-30', '2024-08-31', '2024-09-01', '2024-09-02', '2024-09-03', '2024-09-04'],
    datasets: [
      {
        label: 'Donations',
        data: [10000, 9080, 0, 0, 0, 0, 0], // Dummy donation data
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
        fill: false,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount',
        },
        max: 20000,
      },
    },
  };

  return (
    <div style={{ width: '33.33%', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
      <div className="chart-header">
        <h4>TOTAL DONATION RECEIVED</h4>
        <a href="#" className="view-all">
          <i className="fas fa-eye"></i> View All
        </a>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default DonationChart;