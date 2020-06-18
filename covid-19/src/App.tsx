import React from 'react';
import Routes from './utils/route';
import MyErrorBoundary from './components/errorBoundary';
import { AppContext } from './utils/useContext';
function App() {
  return (
    <AppContext>
      <MyErrorBoundary>
      <Routes />
      </MyErrorBoundary>
      </AppContext>
  );
}

export default App;
