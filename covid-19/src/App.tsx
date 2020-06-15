import React from 'react';
// import logo from './logo.svg';
import Map from './components/map';
import './App.css';
import MyErrorBoundary from './components/errorBoundary';
function App() {
  return (
    <div className="App">
      <MyErrorBoundary>
      <Map />
      </MyErrorBoundary>
    </div>
  );
}

export default App;
