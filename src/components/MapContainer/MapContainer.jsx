import React from 'react';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { GoogleApiWrapper } from './GoogleApiWrapper';
import { useEffect, useState } from 'react/cjs/react.development';
import axios from 'axios';

const MapContainer = (props) => {

  const [selectedDive, setDive] = useState(null);

  const mapStyles = {        
    height: "90vh",
    width: "100%"};

  const defaultCenter = {
    lat: 40.0000, lng: -100.0000
  } 

  return (
     <LoadScript
       googleMapsApiKey={GoogleApiWrapper}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={4}
          center={defaultCenter}
        >
        {props.markers.map(pos => (
          <Marker 
          key={pos.id}
          position = {{
            lat: pos.lat,
            lng: pos.lng
          }}
          onClick={() => {
            setDive(pos);
          }}
          />
          ))}

          {selectedDive && (
            <InfoWindow 
            position = {{
              lat: selectedDive.lat,
              lng: selectedDive.lng
            }}>
              <div>Dive Site: </div>
            </InfoWindow>
          )}
        </GoogleMap>
     </LoadScript>
  )
}

export default MapContainer;



