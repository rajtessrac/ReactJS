import React from 'react';
import './BirthdayList.css'; // Include your CSS file here

const birthdays = [
  { name: 'Shalini', date: '07-08-2024', type: 'Bdy' },
  { name: 'Shalini Baddigam', date: '03-08-2024', type: 'Bdy' },
  { name: 'shalini1', date: '10-08-2024', type: 'Birthday' },
  { name: 'Shalini testing', date: '09-08-2024', type: 'Bdy' },
  { name: 'shalini22', date: '09-08-2024', type: 'Bdy' },
];

const BirthdayList = () => {
  return (
    <div className="birthday-container">
      <h3 className="title">UPCOMING BIRTHDAYS / ANNIVERSARIES</h3>
      <ul className="birthday-list">
        {birthdays.map((item, index) => (
          <li key={index} className="birthday-item">
            <div className="name-type">
              <span className="name">{item.name}</span>
              <span className="type">{item.type}</span>
            </div>
            <span className="date">{item.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BirthdayList;