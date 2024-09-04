// src/App.js
import React, { useState } from 'react';
import SideMenu from './SideMenu';
import './Home.css';
import Dashboard from '../dashboard/Dashboard';
import ProfileDropdown from './ProfileDropdown';

function Home() {
  const [selectedSection, setSelectedSection] = useState('inbox');

  const renderContent = () => {
    switch (selectedSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'members':
        return <div>Starred Content</div>;
      case 'donations':
        return <div>Sent Content</div>;
      case 'sevas':
        return <div>Drafts Content</div>;
      case 'categories':
        return <div>Trash Content</div>;
      case 'report':
        return <div>New Chat Content</div>;
      case 'bulk-upload':
        return <div>Chat History Content</div>;
   
      default:
        return <div>Inbox Content</div>;
    }
  };

  return (
    <div className="App">
      <SideMenu onSectionSelect={setSelectedSection} />
      <div className="content">
      <div class="full-width-div">
      {/* <i className="fas fa-user right-button"></i> */}
      <ProfileDropdown />
    </div>
        {renderContent()}
      </div>
    </div>
  );
}

export default Home;