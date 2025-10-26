

import { useState } from 'react';
import './App.css';

// Predefined distances from Hyderabad to popular destinations
const DISTANCES = {
  'somasila': 180,
  'pondicherry': 750,
  'bangalore': 570,
  'chennai': 630,
  'vijayawada': 270,
  'guntur': 290,
  'rajahmundry': 450,
  'siddipet': 100,
  'kondapochamma reservoir': 80,
  'warangal': 140,
  'vizag': 620,
  'tirupati': 560,
  'nagarjunasagar': 150,
  'nalgonda': 110,
  // New places you requested
  'adilabad': 320,
  'nagarjuna sagar dam': 160,
  'khammam': 200,
  'east godavari': 500,
  'nellore': 450,
  'mancherial': 280,
  'rangareddy': 30
};

function App() {
  const [destination, setDestination] = useState('');
  const [vehicle, setVehicle] = useState('Select Vehicle');
  const [tripCost, setTripCost] = useState(null);

  // Vehicle data
  const vehicleData = {
    'Car (Petrol)': { mileage: 15, fuelType: 'petrol', fuelPrice: 110 },
    'Car (Diesel)': { mileage: 18, fuelType: 'diesel', fuelPrice: 98 },
    'SUV (Petrol)': { mileage: 12, fuelType: 'petrol', fuelPrice: 110 },
    'SUV (Diesel)': { mileage: 14, fuelType: 'diesel', fuelPrice: 98 },
    'Bike': { mileage: 45, fuelType: 'petrol', fuelPrice: 110 },
    'Bus': { mileage: 0, fuelType: 'none', fuelPrice: 0 }
  };

  const calculateCost = () => {
    if (vehicle === 'Select Vehicle' || !destination) {
      alert("Please enter a destination and select a vehicle first!");
      return;
    }

    // Find distance - convert destination to lowercase for matching
    const destKey = destination.toLowerCase();
    let distance = null;

    // Check if destination exists in our database
    for (const [key, dist] of Object.entries(DISTANCES)) {
      if (destKey.includes(key)) {
        distance = dist;
        break;
      }
    }

    if (!distance) {
      alert("Destination not found in our database. Please try one of the popular destinations below.");
      return;
    }

    // Round trip distance
    const roundTripDistance = distance * 2;

    let fuelCost = 0;
    let totalCost = 0;

    // Bus has fixed cost
    if (vehicle === 'Bus') {
      // Bus fare calculation (approx ₹2.5 per km)
      fuelCost = roundTripDistance * 2.5;
      totalCost = fuelCost + 300; // Food cost
    } else {
      // Car/Bike calculation
      const vehicleInfo = vehicleData[vehicle];
      const fuelNeeded = roundTripDistance / vehicleInfo.mileage;
      fuelCost = fuelNeeded * vehicleInfo.fuelPrice;
      totalCost = fuelCost + 300; // Food cost
    }

    setTripCost({
      distance: roundTripDistance,
      fuel: Math.round(fuelCost),
      food: 300,
      total: Math.round(totalCost),
      oneWayDistance: distance
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px", fontFamily: "Arial", padding: "20px" }}>
      <h1>🚗 Trip Cost Estimator</h1>
      <p>Calculate how much your round trip from Hyderabad will cost!</p>

      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '30px', 
        borderRadius: '10px',
        maxWidth: '500px',
        margin: '20px auto',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        {/* Destination Input */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Enter destination (e.g., Somasila, Vizag, Tirupati)..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            style={{ 
              padding: "12px", 
              width: "100%", 
              fontSize: "16px",
              border: "1px solid #ddd",
              borderRadius: "5px"
            }}
          />
        </div>

        {/* Vehicle Selector */}
        <div style={{ marginBottom: '20px' }}>
          <select
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            style={{ 
              padding: "12px", 
              width: "100%", 
              fontSize: "16px",
              border: "1px solid #ddd",
              borderRadius: "5px"
            }}>
            <option>Select Vehicle</option>
            <option>Car (Petrol)</option>
            <option>Car (Diesel)</option>
            <option>SUV (Petrol)</option>
            <option>SUV (Diesel)</option>
            <option>Bike</option>
            <option>Bus</option>
          </select>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateCost}
          style={{
            padding: "15px 30px",
            fontSize: "18px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%"
          }}
        >
          Calculate Trip Cost
        </button>
      </div>

      {/* Results Display */}
      {tripCost && (
        <div style={{
          marginTop: "30px",
          border: "2px solid #28a745",
          padding: "25px",
          borderRadius: "10px",
          maxWidth: "500px",
          margin: "30px auto",
          backgroundColor: "#f8fff9"
        }}>
          <h2>✅ Estimated Cost to {destination}</h2>
          <div style={{ textAlign: 'left', lineHeight: '1.8' }}>
            <p><strong>One-way Distance:</strong> {tripCost.oneWayDistance} km</p>
            <p><strong>Round Trip Distance:</strong> {tripCost.distance} km</p>
            <p><strong>Vehicle Type:</strong> {vehicle}</p>
            <p><strong>Fuel/Fare Cost:</strong> ₹{tripCost.fuel.toLocaleString('en-IN')}</p>
            <p><strong>Food & Misc Cost:</strong> ₹{tripCost.food}</p>
            <hr style={{ margin: '20px 0', border: '1px solid #ddd' }} />
            <h3 style={{ color: "#28a745", margin: 0 }}>
              <strong>Total Estimated Cost: ₹{tripCost.total.toLocaleString('en-IN')}</strong>
            </h3>
          </div>
        </div>
      )}

      {/* Popular Destinations */}
      <div style={{ marginTop: "40px", color: "#666" }}>
        <h3>Popular Destinations from Hyderabad:</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '10px', 
          marginTop: '15px',
          maxWidth: '800px',
          margin: '15px auto'
        }}>
          {Object.entries(DISTANCES).map(([dest, distance]) => (
            <div 
              key={dest}
              style={{
                padding: '10px',
                backgroundColor: '#e9ecef',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                textAlign: 'center',
                transition: 'all 0.3s'
              }}
              onClick={() => setDestination(dest.charAt(0).toUpperCase() + dest.slice(1))}
              onMouseOver={(e) => e.target.style.backgroundColor = '#007bff'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#e9ecef'}
            >
              <div style={{ fontWeight: 'bold' }}>
                {dest.charAt(0).toUpperCase() + dest.slice(1)}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                {distance} km
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Examples */}
      <div style={{ marginTop: "30px", padding: "20px", backgroundColor: "#fff3cd", borderRadius: "10px" }}>
        <h4>💡 Quick Examples:</h4>
        <p><strong>Hyderabad to Vizag:</strong> ~620 km | Car Petrol: ~₹9,500 | Bike: ~₹3,300</p>
        <p><strong>Hyderabad to Tirupati:</strong> ~560 km | Car Petrol: ~₹8,600 | Bike: ~₹3,000</p>
        <p><strong>Hyderabad to Nagarjuna Sagar:</strong> ~160 km | Car Petrol: ~₹2,700 | Bike: ~₹1,100</p>
      </div>
    </div>
  );
}

export default App;



