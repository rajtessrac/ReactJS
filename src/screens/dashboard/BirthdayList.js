import React from 'react';
import './BirthdayList.css'; // Include your CSS file here

const BirthdayList = ({data}) => {

  const capitalize = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '');

  return (
    <div className="birthday-container">
      <h3 className="title">UPCOMING BIRTHDAYS / ANNIVERSARIES</h3>
      <ul className="birthday-list">
        {data.map((item, index) => (
          <li key={index} className="birthday-item">
            <div className="name-type">
              <span className="name">{item.dfull_name}</span>
              <span className="type">{`${item.occ_name}`}</span>
            </div>
            <span className="date">{item.occ_date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BirthdayList;