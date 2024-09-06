// src/App.js
import React, { useState } from 'react';
import SideMenu from './SideMenu';
import './Home.css';
import Dashboard from '../dashboard/Dashboard';
import ProfileDropdown from './ProfileDropdown';
import Footer from '../footer/Footer';
import { useStoreState } from 'easy-peasy';

function Home() {
  const [selectedSection, setSelectedSection] = useState('dashboard');

  const {user} = useStoreState((state) => state.auth);

  React.useEffect(() => {
    console.log('user', user);
  }, [])
  

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
        return <Dashboard />;
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
      <Footer />
    </div>
  );
}

export default Home;