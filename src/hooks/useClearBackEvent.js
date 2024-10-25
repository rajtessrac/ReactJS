// useClearBackEvent.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useClearBackEvent = (redirectPath) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackButton = (e) => {
      e.preventDefault();
      navigate(redirectPath); // Redirect to the specified path when back button is pressed
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [navigate, redirectPath]);
};

export default useClearBackEvent;
