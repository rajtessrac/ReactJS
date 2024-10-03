import React, { useState } from 'react';
import Logo from '../../assets/images/logo.png'
import './SideMenu.css';

const SideMenu = ({ onSectionSelect, setIsOpen }) => {
  const [open, setOpen] = useState(true);
  const [activeSection, setActiveSection] = useState(null);

  const toggleMenu = () => {
    setOpen(!open);
    setIsOpen(!open)
  };

  const handleSectionClick = (section) => {
    setActiveSection(activeSection === section ? null : section);
    onSectionSelect(section);
  };

  return (
    <div className={`side-menu ${open ? 'open' : 'closed'}`}>

      <div className="toggle-button" onClick={toggleMenu}>
        {!open ?<i className="fas fa-close" /> : <div className='logo-container'> <img  src={ Logo }
            alt="Logo"
            className="logo" /> <i class="fa-solid fa-bars" /> </div>}
      </div>
      <ul>
        <li onClick={() => handleSectionClick('dashboard')}><i className="fas fa-home side side-icon"></i>{open ? 'Dashboard' : ''}</li>
        <li onClick={() => handleSectionClick('members')}><i className="fas fa-users side-icon"></i>{open ? 'Jeevanadi Members' : ''}</li>
        <li onClick={() => handleSectionClick('donations')}><i className="fas fa-dollar side-icon"></i>{open ? 'Donations' : ''}</li>
        <li onClick={() => handleSectionClick('sevas')}><i class="fa-solid fa-layer-group side-icon "></i>{open ? 'Sevas' : ''}</li>
        <li onClick={() => handleSectionClick('categories')}><i class="fa-solid fa-border-all side-icon"></i>{open ? 'Categories' : ''}</li>
        <li onClick={() => handleSectionClick('report')}><i class="fa-solid fa-table-list side-icon" ></i>{open ? 'Report' : ''}</li>
        <li onClick={() => handleSectionClick('bulk-upload')}><i className="fas fa-upload side-icon"></i>{open ? 'Bulk Upload' : ''}</li>
      </ul>
    </div>
  );
};

export default SideMenu;