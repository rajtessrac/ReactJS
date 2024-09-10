// src/App.js
import React, { useState } from 'react';
import SideMenu from './SideMenu';
import './Home.css';
import Dashboard from '../dashboard/Dashboard';
import ProfileDropdown from './ProfileDropdown';
import Footer from '../footer/Footer';
import JeevanadiMembersList from '../members/JeevanadiMembersList';
import DonationsList from '../donations/DonationsList';
import SevasList from '../sevas/SevaList';
import CategoriesList from '../categories/CategoriesList';
import ProfilePage from '../profile/ProfilePage';


function Home() {
  const [selectedSection, setSelectedSection] = useState('dashboard');
  
  

  const renderContent = () => {
    switch (selectedSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'members':
        return <JeevanadiMembersList />
      case 'donations':
        return <DonationsList />
      case 'sevas':
        return <SevasList />;
      case 'categories':
        return <CategoriesList />
      case 'profile':
        return <ProfilePage />;
      case 'report':
        return <div>Coming soon</div>;
      case 'bulk-upload':
        return <div>Coming soon</div>;
   
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="App">
      <SideMenu onSectionSelect={setSelectedSection} />
      <div className="content">
      <div class="full-width-div">
      {/* <i className="fas fa-user right-button"></i> */}
      <ProfileDropdown onSectionSelect={setSelectedSection} />
    </div>
        {renderContent()}
      </div>
      <Footer />
    </div>
  );
}

export default Home;