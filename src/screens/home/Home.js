// src/App.js
import React, { useState } from 'react';
import SideMenu from './SideMenu';
import './Home.css';
import Dashboard from '../dashboard/Dashboard';
import ProfileDropdown from './ProfileDropdown';
import Footer from '../footer/Footer';
import ProfilePage from '../profile/ProfilePage';
import Sevas from '../sevas/Sevas';
import Categories from '../categories/Categories';
import Donations from '../donations/Donations';
import Members from '../members/Members';
import { useStoreState } from 'easy-peasy';


function Home() {
  const [selectedSection, setSelectedSection] = useState('dashboard');
  const [open, setOpen] = useState(true);
  const {user} = useStoreState((state) => state.auth);

  const renderContent = () => {
    switch (selectedSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'members':
        return <Members />
      case 'donations':
        return <Donations />
      case 'sevas':
        return <Sevas />;
      case 'categories':
        return <Categories />
      case 'profile':
        return <ProfilePage userId={user.id} />;
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
      <SideMenu  setIsOpen={(value)=>{
        setOpen(value);
      }} onSectionSelect={ setSelectedSection } />
      <div className="content"  style={{marginLeft: open ? '14%' : '3%' }} >
        <div class="full-width-div">
          {/* <i className="fas fa-user right-button"></i> */ }
          <ProfileDropdown onSectionSelect={ setSelectedSection } />
        </div>
        { renderContent() }
      </div>
      <Footer />
    </div>
  );
}

export default Home;