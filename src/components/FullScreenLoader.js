import React from 'react';
import { GridLoader } from 'react-spinners';

const FullScreenLoader = ({size}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', alignSelf: 'center', position: 'absolute', top:0,left: 0, right: 0, bottom: 0, zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <GridLoader color="#007bff" size={30} />
    </div>
  );
};

export default FullScreenLoader;