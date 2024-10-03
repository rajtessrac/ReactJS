import React, { useState, useCallback } from 'react';
import JeevanadiMembersList from './JeevanadiMembersList';
import ProfilePage from '../profile/ProfilePage';
import AddMemberForm from './AddMemberForm';

function Members() {
  const [currentView, setCurrentView] = useState('members-list');
  const [currentParams, setCurrentParams] = useState(undefined);

  // Memoize the changeView function to prevent re-creation on every render
  const changeView = useCallback((view,params) => {
    setCurrentView(view);
    setCurrentParams(params)
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'members-list':
        return <JeevanadiMembersList changeView={ changeView } />;
      case 'add-member':
        return <AddMemberForm changeView={ changeView } />;
      case 'user-detail':
        return <ProfilePage userId={ currentParams.userId } changeView={ changeView } />;
      default:
        return <JeevanadiMembersList changeView={ changeView } />;
    }
  };

  return (
    <div>
      {/* Conditionally rendering the views based on currentView state */ }
      { renderView() }
    </div>
  );
}

export default Members;
