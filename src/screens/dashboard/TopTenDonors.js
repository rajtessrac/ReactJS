import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Legend, Title, Tooltip } from 'chart.js';
import './TopTenDonors.css';

// Register the components you need
ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Title, Tooltip);

const TopTenDonors = () => {
  const data = {
    labels: ['Shalini', 'Rajesh Nasit', 'Shubham Kumar Roy', 'Amit Patel Test1'],
    datasets: [
      {
        label: 'Amount',
        data: [5000, 500, 500, 200],
        backgroundColor: 'rgba(54, 162, 235, 0.8)', // Color of bars
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 6000,
        ticks: {
          stepSize: 1000,
        },
        title: {
          display: true,
          text: 'Amount',
        },
      },
      x: {
        ticks: {
          autoSkip: false,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="top-ten-donors-container">
      <div className="top-ten-donors-header">
        <h3 className="title">TOP TEN DONORS</h3>
        <div className="view-all">
          <span className="view-icon">&#128065;</span>
          <span className="view-text">View All</span>
        </div>
      </div>
      <div className="top-ten-chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default TopTenDonors;
