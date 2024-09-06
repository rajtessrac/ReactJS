import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './DonutChart.css'; // External CSS for styling

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
  const data = {
    labels: ['sev909', 'seva12', 'Jain samvatsari'],
    datasets: [
      {
        label: 'Donation Distribution',
        data: [95.9, 3.7, 0.4], // Updated data from screenshot
        backgroundColor: ['#e74c3c', '#d7ccc8', '#4CAF50'], // Custom colors from the screenshot
        hoverBackgroundColor: ['#e74c3c', '#d7ccc8', '#4CAF50'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Custom legend is used
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`; // Display percentages
          },
        },
      },
    },
    cutout: '70%', // Adjust to make it a donut chart
  };

  return (
    <div className="donation-distribution-container">
      <h3 className="title">DONATION DISTRIBUTION BY SEVAS</h3>
      <div className="view-all-container">
        <span className="view-icon">&#128065;</span>
        <span className="view-text">View All</span>
      </div>
      <div className="donut-legend-container">
        <div className="donut-chart">
          <Doughnut data={data} options={options} />
        </div>
        <div className="donation-legend">
          <ul>
            <li><span className="color-box" style={{ backgroundColor: '#e74c3c' }}></span> sev909</li>
            <li><span className="color-box" style={{ backgroundColor: '#d7ccc8' }}></span> seva12</li>
            <li><span className="color-box" style={{ backgroundColor: '#4CAF50' }}></span> Jain samvatsari</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
