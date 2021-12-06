import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { GoogleApiWrapper } from './GoogleApiWrapper';

const MapContainer = () => {
  const mapStyles = {        
    height: "100vh",
    width: "100%"};

  const defaultCenter = {
    lat: 40.0000, lng: -100.0000
  } 

  return (
     <LoadScript
       googleMapsApiKey={GoogleApiWrapper}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={5}
          center={defaultCenter}
        />
     </LoadScript>
  )
}

export default MapContainer;