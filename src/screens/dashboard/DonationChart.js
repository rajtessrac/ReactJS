import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './DonationChart.css';
import moment from 'moment/moment';

// Register the components with Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DonationChart = ({totalDonationByDateList}) => {
  // Data for the chart
  const data = {
    labels: totalDonationByDateList.map(donation=>donation.day
      ? moment(donation.day).format('DD[\n]MMM')
      : donation?.payment_datetime__date
      ? moment(donation.payment_datetime__date).format('DD[\n]MMM'):''),
    datasets: [
      {
        label: 'Donations',
        data: totalDonationByDateList.map(donation=>donation.damount),
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
      {data.length > 0 ? <Line data={data} options={options} /> : null}
      
    </div>
  );
};

export default DonationChart;