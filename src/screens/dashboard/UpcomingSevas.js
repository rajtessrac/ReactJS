import React from 'react';
import './UpcomingSevas.css'; // External CSS file for styling

const sevas = [
  { name: 'Jain Samvatsari', date: '07-09-2024', image: 'https://via.placeholder.com/50' },
  { name: 'Ganesh Chaturthi', date: '07-09-2024', image: 'https://via.placeholder.com/50' },
];

const UpcomingSevas = () => {
  return (
    <div className="sevas-container">
      <div className="sevas-header">
        <h3 className="sevas-title">UPCOMING SEVAS</h3>
        <div className="view-all">
          <span className="view-icon">&#128065;</span>
          <span className="view-text">View All</span>
        </div>
      </div>
      <ul className="sevas-list">
        {sevas.map((seva, index) => (
          <li key={index} className="seva-item">
            <div className="seva-info">
              <img src={seva.image} alt={seva.name} className="seva-image" />
              <span className="seva-name">{seva.name}</span>
            </div>
            <span className="seva-date">{seva.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingSevas;