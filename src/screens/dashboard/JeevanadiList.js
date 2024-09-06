import React from 'react';
import './JeevanadiList.css'; // External CSS file for styling

const jeevanadiData = [
  {
    year: 2015,
    email: 'rajesh.n+xx1@tessrac.com',
    joinedDate: '05-09-2024',
  },
  {
    year: 2014,
    email: 'rajesh.n+x1@tessrac.com',
    joinedDate: '05-09-2024',
  },
  {
    year: 2013,
    email: 'enrajesh67@gmail.com',
    joinedDate: '04-09-2024',
  },
];

const JeevanadiList = () => {
  return (
    <div className="jeevanadi-container">
      <div className="jeevanadi-header">
        <h3 className="jeevanadi-title">JEEVANADI LIST</h3>
        <div className="view-all">
          <span className="view-icon">&#128065;</span>
          <span className="view-text">View All</span>
        </div>
      </div>
      <ul className="jeevanadi-list">
        {jeevanadiData.map((item, index) => (
          <li key={index} className="jeevanadi-item">
            <div className="jeevanadi-info">
              <span className="year">{item.year}</span>
              <span className="email">{item.email}</span>
            </div>
            <span className="joined">Joined: {item.joinedDate}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JeevanadiList;
