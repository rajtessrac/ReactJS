import React, { useState } from 'react';
import './SideMenu.css';

const SideMenu = ({ onSectionSelect }) => {
  const [open, setOpen] = useState(true);
  const [activeSection, setActiveSection] = useState(null);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleSectionClick = (section) => {
    setActiveSection(activeSection === section ? null : section);
    onSectionSelect(section);
  };

  return (
    <div className={`side-menu ${open ? 'open' : 'closed'}`}>
      <button className="toggle-button" onClick={toggleMenu}>
        {open ? 'Close' : 'Open'}
      </button>
      <ul>
        <li onClick={() => handleSectionClick('mail')}>Mail</li>
        {activeSection === 'mail' && (
          <ul className="submenu">
            <li onClick={() => onSectionSelect('inbox')}>Inbox</li>
            <li onClick={() => onSectionSelect('starred')}>Starred</li>
            <li onClick={() => onSectionSelect('sent')}>Sent</li>
            <li onClick={() => onSectionSelect('drafts')}>Drafts</li>
            <li onClick={() => onSectionSelect('trash')}>Trash</li>
          </ul>
        )}
        <li onClick={() => handleSectionClick('chats')}>Chats</li>
        {activeSection === 'chats' && (
          <ul className="submenu">
            <li onClick={() => onSectionSelect('newChat')}>New Chat</li>
            <li onClick={() => onSectionSelect('chatHistory')}>Chat History</li>
          </ul>
        )}
        <li onClick={() => handleSectionClick('contacts')}>Contacts</li>
        {activeSection === 'contacts' && (
          <ul className="submenu">
            <li onClick={() => onSectionSelect('allContacts')}>All Contacts</li>
            <li onClick={() => onSectionSelect('frequentContacts')}>Frequent Contacts</li>
            <li onClick={() => onSectionSelect('blockedContacts')}>Blocked Contacts</li>
          </ul>
        )}
        <li onClick={() => handleSectionClick('settings')}>Settings</li>
        {activeSection === 'settings' && (
          <ul className="submenu">
            <li onClick={() => onSectionSelect('generalSettings')}>General</li>
            <li onClick={() => onSectionSelect('privacySettings')}>Privacy</li>
            <li onClick={() => onSectionSelect('notificationSettings')}>Notifications</li>
          </ul>
        )}
      </ul>
    </div>
  );
};

export default SideMenu;