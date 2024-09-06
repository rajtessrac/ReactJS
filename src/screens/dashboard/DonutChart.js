import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
  // Sample Data
  const data = {
    labels: ['testseva80', 'sevaaug29'],
    datasets: [
      {
        label: 'Donation Distribution',
        data: [100, 0], // Add your data here
        backgroundColor: ['#FF5733', '#D3D3D3'], // Colors for each segment
        hoverOffset: 4,
      },
    ],
  };

  // Chart Options
  const options = {
    cutout: '70%', // Creates the donut hole in the center
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%`,
        },
      },
    },
    // Custom plugin for the percentage label in the center
    plugins: [
      {
        id: 'center-text',
        beforeDraw(chart) {
          const { width, height, ctx } = chart;
          ctx.restore();
          const fontSize = (height / 114).toFixed(2);
          ctx.font = `${fontSize}em sans-serif`;
          ctx.textBaseline = 'middle';

          const text = '100%', // Add your percentage calculation logic here
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;

          ctx.fillText(text, textX, textY);
          ctx.save();
        },
      },
    ],
  };

  return (
    <div style={{width: '33.33%', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4>DONATION DISTRIBUTION BY SEVAS</h4>
        <span style={{ display: 'flex', alignItems: 'center', color: '#000' }}>
          <i style={{ marginRight: '5px' }}>👁</i> View All
        </span>
      </div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;
