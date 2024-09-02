// src/App.js
import React, { useState } from 'react';
import SideMenu from './SideMenu';
import './Home.css';

function Home() {
  const [selectedSection, setSelectedSection] = useState('inbox');

  const renderContent = () => {
    switch (selectedSection) {
      case 'inbox':
        return <div>Inbox Content</div>;
      case 'starred':
        return <div>Starred Content</div>;
      case 'sent':
        return <div>Sent Content</div>;
      case 'drafts':
        return <div>Drafts Content</div>;
      case 'trash':
        return <div>Trash Content</div>;
      case 'newChat':
        return <div>New Chat Content</div>;
      case 'chatHistory':
        return <div>Chat History Content</div>;
      case 'allContacts':
        return <div>All Contacts Content</div>;
      case 'frequentContacts':
        return <div>Frequent Contacts Content</div>;
      case 'blockedContacts':
        return <div>Blocked Contacts Content</div>;
      case 'generalSettings':
        return <div>General Settings Content</div>;
      case 'privacySettings':
        return <div>Privacy Settings Content</div>;
      case 'notificationSettings':
        return <div>Notification Settings Content</div>;
      default:
        return <div>Inbox Content</div>;
    }
  };

  return (
    <div className="App">
      <SideMenu onSectionSelect={setSelectedSection} />
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
}

export default Home;