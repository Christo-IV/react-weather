import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";

function MyComponent() {
  const map = useMapEvent("click", () => {
    map.setView([50.5, 30.5]);
  });
  return null;
}

interface Props {
  latitude: number;
  longitude: number;
}

const Map: React.FC<Props> = ({ latitude, longitude }) => {
  const [lat, setLat] = useState(latitude);
  const [lon, setLon] = useState(longitude);

  console.log("lat: " + lat);
  console.log("lon: " + lon);

  return (
    <MapContainer center={[lat, lon]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lon]}>
        <Popup>
          A pretty CSS3 popup. <br /> No idea why it doesn't pan to it.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
