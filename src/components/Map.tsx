import React, { useState, useEffect, SetStateAction } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  MapConsumer,
} from "react-leaflet";

type LatLonFunc = (lat: number, lon: number) => void;
type NumFunc = (arg: number) => void;

// Yes, I know... This code looks like spaghetti... But at least it works.

function ClickHandler({
  updateLocation,
  updateLat,
  updateLon,
}: {
  updateLocation: LatLonFunc;
  updateLat: NumFunc;
  updateLon: NumFunc;
}) {
  const map = useMapEvents({
    click: (e) => {
      console.log(e.latlng);
      updateLat(e.latlng.lat);
      updateLon(e.latlng.lng);
      updateLocation(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

interface Props {
  latitude: number;
  longitude: number;
  updateLocation: (lat: number, lon: number) => void;
}

const Map: React.FC<Props> = ({ latitude, longitude, updateLocation }) => {
  const [lat, setLat] = useState(latitude);
  const [lon, setLon] = useState(longitude);

  console.log("lat: " + lat);
  console.log("lon: " + lon);

  const updateLat = (lat: number) => {
    setLat(lat);
  };

  const updateLon = (lon: number) => {
    setLon(lon);
  };

  return (
    <MapContainer center={[lat, lon]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lon]}>
        <Popup>
          A pretty CSS3 popup. <br />
        </Popup>
      </Marker>
      <ClickHandler
        updateLocation={updateLocation}
        updateLat={updateLat}
        updateLon={updateLon}
      />
    </MapContainer>
  );
};

export default Map;
