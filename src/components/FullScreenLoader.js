import React, {forwardRef, useImperativeHandle, useState} from 'react';
import { GridLoader } from 'react-spinners';


function FullScreenLoader(props, ref) {
  const [loading, setLoading] = useState(0);

  useImperativeHandle(
    ref,
    () => ({
      start: () => {
        const loadingCount = loading + 1;
        setLoading(loadingCount);
      },
      stop: () => {
        const loadingCount = loading > 0 ? loading - 1 : 0;
        setLoading(loadingCount);
      },
      isLoading: () => loading >= 1,
    }),
    []
  );

  if (!loading) {
    return null;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', alignSelf: 'center', position: 'absolute', top:0,left: 0, right: 0, bottom: 0, zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <GridLoader color="#007bff" size={30} />
  </div>
  );
}


export default forwardRef(FullScreenLoader);
