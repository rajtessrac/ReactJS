import React, { useState, useCallback } from 'react';

import DonationForm from './DonationForm';
import DonationDetail from './DonationDetails';
import AddDonation from './DonationForm';
import DonationsList from './DonationsList';
import DonationDetails from './DonationDetails';
import SevaUI from './SevaDonations';

function Donations() {
  const [currentView, setCurrentView] = useState('category-list'); // Initial view set to 'category-list'

  // Memoize the changeView function to prevent re-creation on every render
  const changeView = useCallback((view) => {
    setCurrentView(view);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'donation-list':
        return <DonationsList changeView={changeView} />;
      case 'add-donation':
        return <DonationForm changeView={changeView} />;
      case 'donation-detail':
          return <DonationDetails changeView={changeView} />;
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
