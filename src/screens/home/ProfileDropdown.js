import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileDropdown.css';

const ProfileDropdown = ({onSectionSelect}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
    // Add your logic for navigating to the profile page or performing an action
    onSectionSelect('profile')
    setIsOpen(false);
  };

  const handleLogoutClick = () => {
    console.log('Log Out clicked');
    // Add your logic for logging out the user
    setIsOpen(false);
    localStorage.clear();
    navigate('login')
  };

  return (
    <div className="profile-dropdown">
      <div className="profile-icon" onClick={toggleDropdown}>
        <i className="fas fa-user-circle"></i>
      </div>
      {isOpen && (
        <div className="dropdown-menu-container">
          <div className="triangle"></div>
          <div className="dropdown-menu">
            <div className="dropdown-header">
              <div className="avatar">
                <i className="fas fa-user-circle"></i>
              </div>
              <div className="user-info">
                <h4>Amit Patel Test1</h4>
                <p>enrajesh67@gmail.com</p>
              </div>
            </div>
            <div className="dropdown-item" onClick={handleProfileClick}>
              Profile
            </div>
            <div className="dropdown-item" onClick={handleLogoutClick}>
              Log Out
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;