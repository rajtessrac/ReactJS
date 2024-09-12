import React from 'react';
import './UpcomingSevas.css'; // External CSS file for styling
import { BASE_URL } from '../../constants';

const sevas = [
  { name: 'Jain Samvatsari', date: '07-09-2024', image: 'https://via.placeholder.com/50' },
  { name: 'Ganesh Chaturthi', date: '07-09-2024', image: 'https://via.placeholder.com/50' },
];

const capitalize = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '');

const UpcomingSevas = ({data}) => {
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
              <img src={`${BASE_URL}/${seva.img}`} alt={seva.name} className="seva-image" />
              <span className="seva-name">{capitalize(seva.title)}</span>
            </div>
            <span className="seva-date">{seva.start_date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingSevas;