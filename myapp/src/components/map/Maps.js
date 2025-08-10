import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from "react";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function Maps() {
  const [buildings, setBuildings] = useState([]);
  const [error, setError] = useState(null);

  const center = [45.5486, 13.7292];

  useEffect(() => {
    const getBuildings = async () => {
      try {
        const response = await fetch('http://88.200.63.148:3023/build');

        if (!response.ok) {
          throw new Error('Failed to fetch buildings');
        }

        const data = await response.json();

        const formattedBuildings = data.map(building => {
          let location;

          if (Array.isArray(building.location)) {
            location = building.location;
          } else if (typeof building.location === 'string') {
            const [lat, lng] = building.location.split(',').map(Number);
            location = [lat, lng];
          } else {
            console.warn('Invalid location format for building:', building);
            location = center;
          }
          return {
            ...building,
            location: location
          };
        });

        setBuildings(formattedBuildings);
      } catch (err) {
        console.error('API error:', err);
        setError(err.message);
      }
    };

    getBuildings();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer
        center={center}
        zoom={16}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {buildings.map(building => (
          <Marker
            key={building.id}
            position={building.location}
          >
            <Popup>
              <div>
                <h3>{building.b_name}</h3>
                <p>{building.workhours}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Maps;