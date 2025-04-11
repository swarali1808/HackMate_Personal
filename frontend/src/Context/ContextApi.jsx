import React from 'react';
// No need to import AuthProvider here as we'll add it in main.jsx

const AppContextProvider = ({ children }) => {
  return (
    // Just pass children directly
    <>{children}</>
  );
};

export default AppContextProvider;