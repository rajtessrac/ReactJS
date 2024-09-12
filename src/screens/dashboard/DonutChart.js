import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './DonutChart.css'; // External CSS for styling
import { chartsColors } from '../../constants';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({eventList, totalEventAmount}) => {
  const data = {
    labels: eventList.map(item=>item.title),
    datasets: [
      {
        label: 'Donation Distribution',
        data: eventList.map(event=>`${
          ((event.amount / totalEventAmount) * event.count * 100).toFixed(1) > 2
            ? ((event.amount / totalEventAmount) * event.count * 100).toFixed(1)
            : 0
        }`), 
        backgroundColor: chartsColors.slice(0,eventList.length-1),
        hoverBackgroundColor: chartsColors.slice(0,eventList.length-1),
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
          {eventList.map((item, index) => (
        <li style={{height: '5px'}} ><span className="color-box" style={{ backgroundColor:chartsColors[index] }}></span>{`${item.title} ${((item.amount / totalEventAmount) * item.count * 100).toFixed(1) > 2
          ? ((item.amount / totalEventAmount) * item.count * 100).toFixed(1)
          : 0}%`}</li>
      ))}
           
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
