import React, { useState, useCallback } from 'react';
import DonationForm from './DonationForm';
import DonationsList from './DonationsList';
import DonationDetails from './DonationDetails';


function Donations() {
  const [currentView, setCurrentView] = useState('donation-list'); // Initial view set to 'category-list'
  const [currentParams, setCurrentParams] = useState(undefined);

  // Memoize the changeView function to prevent re-creation on every render
  const changeView = useCallback((view, params) => {
    setCurrentView(view);
    setCurrentParams(params)
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'donation-list':
        return <DonationsList changeView={changeView} />;
      case 'add-donation':
        return <DonationForm donationType={currentParams?.donationType}  changeView={changeView} />;
      case 'donation-detail':
          return <DonationDetails donation={currentParams?.donation} changeView={changeView} />;
      default:
        return <DonationsList changeView={changeView} />;
    }
  };

  return (
    <div>
      {/* Conditionally rendering the views based on currentView state */}
      {renderView()}
    </div>
  );
}

export default Donations;
