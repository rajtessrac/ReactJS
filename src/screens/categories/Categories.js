import React, { useState, useCallback } from 'react';
import CategoriesList from './CategoriesList';
import AddCategory from './AddCategory';

function Categories() {
  const [currentView, setCurrentView] = useState('category-list'); // Initial view set to 'category-list'

  // Memoize the changeView function to prevent re-creation on every render
  const changeView = useCallback((view) => {
    setCurrentView(view);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'category-list':
        return <CategoriesList changeView={changeView} />;
      case 'add-category':
        return <AddCategory changeView={changeView} />;
      default:
        return <CategoriesList changeView={changeView} />;
    }
  };

  return (
    <div>
      {/* Conditionally rendering the views based on currentView state */}
      {renderView()}
    </div>
  );
}

export default Categories;
