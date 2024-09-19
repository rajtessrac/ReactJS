import React, { useCallback, useState } from 'react';
import SevasList from './SevaList';
import AddSevaForm from './AddSevaForm';
import SevaDetail from './SevaDetail';

function Sevas() {
  const [currentView, setCurrentView] = useState('seva-list'); // Initial view set to 'category-list'

  // Memoize the changeView function to prevent re-creation on every render
  const changeView = useCallback((view) => {
    setCurrentView(view);
  }, []);


  const renderView = () => {
    switch (currentView) {
      case 'seva-list':
        return <SevasList changeView={changeView} />;
      case 'add-seva':
        return <AddSevaForm changeView={changeView} />;
        case 'seva-detail':
          return <SevaDetail changeView={changeView} />;
      default:
        return <SevasList changeView={changeView} />;
    }
  };

  return (
    <div>
      {/* Conditionally rendering the views based on currentView state */}
      {renderView()}
    </div>
  );
}

export default Sevas;
