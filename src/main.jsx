import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// This function is defined globally to ensure the App component can access it.
// It loads the Google Maps script dynamically.
window.initGoogleMapsScript = () => {
  const script = document.createElement('script');
  
  // NOTE: This assumes VITE_GOOGLE_MAPS_API_KEY is correctly set in .env
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  // We include 'places' for the Autocomplete functionality (in App.jsx)
  script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initMap`;
  script.async = true;
  document.head.appendChild(script);
};

// Start the Google Maps script loading process
window.initGoogleMapsScript();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
