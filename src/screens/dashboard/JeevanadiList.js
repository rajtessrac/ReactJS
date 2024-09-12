import React from 'react';
import './JeevanadiList.css'; // External CSS file for styling


const JeevanadiList = ({data}) => {
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
        {data.map((item, index) => (
          <li key={index} className="jeevanadi-item">
            <div className="jeevanadi-info">
              <span className="year">{item.j_number}</span>
              <span className="email">{item.email}</span>
            </div>
            <span className="joined">Joined: {item.joined_date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JeevanadiList;
