import React from 'react';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { GoogleApiWrapper } from './GoogleApiWrapper';
import { WorldWeatherWrapper } from './WorldWeatherWrapper';
import { useEffect, useState } from 'react/cjs/react.development';
import axios from 'axios';

const MapContainer = (props) => {

  const [selectedDive, setDive] = useState(null);
  const [diveWeather, setWeather] = useState();

  const getWeather = async (lat, long) => {
    const weather = await axios.get(`http://api.worldweatheronline.com/premium/v1/marine.ashx?format=json&q=${lat},${long}&tide=yes&key=${WorldWeatherWrapper}`);
    if(weather) {
        setWeather(weather.data.data.weather);
        console.log(weather.data.data.weather)
    } else { }
  }

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
            getWeather(pos.lat, pos.lng);
          }}
          />
          ))}

          {selectedDive && (
            <InfoWindow 
            position = {{
              lat: selectedDive.lat,
              lng: selectedDive.lng
            }}
            onCloseClick={() => {
              setDive(null);
            }}
            >
              <div>
                <h3>Dive Site: {selectedDive.name} for: {diveWeather[0].date}</h3>
                <h5>Weather Details: </h5>
                <p>Sunrise:  {diveWeather[0].astronomy[0].sunrise}  Sunset:  {diveWeather[0].astronomy[0].sunset} UV Index:  {diveWeather[0].uvIndex}</p>
                <p>Max Temperature-Fahrenheit:  {diveWeather[0].maxtempF}  Min Temperature-Fahrenheit:  {diveWeather[0].mintempC}</p>
                <p>Max Temperature-Celsius:  {diveWeather[0].maxtempC}  Min Temperature-Celsius:  {diveWeather[0].mintempC}</p>
                <h5>Tide Details: </h5>
                <p>Tide Time: {diveWeather[0].tides[0].tide_data[0].tideTime}  Tide Type: {diveWeather[0].tides[0].tide_data[0].tide_type}  Tide Height:  {diveWeather[0].tides[0].tide_data[0].tideHeight_mt} meters</p>
                <p>Tide Time: {diveWeather[0].tides[0].tide_data[1].tideTime}  Tide Type: {diveWeather[0].tides[0].tide_data[1].tide_type}  Tide Height:  {diveWeather[0].tides[0].tide_data[1].tideHeight_mt} meters</p>
                <p>Tide Time: {diveWeather[0].tides[0].tide_data[2].tideTime}  Tide Type: {diveWeather[0].tides[0].tide_data[2].tide_type}  Tide Height:  {diveWeather[0].tides[0].tide_data[2].tideHeight_mt} meters</p>
                <p>Tide Time: {diveWeather[0].tides[0].tide_data[3].tideTime}  Tide Type: {diveWeather[0].tides[0].tide_data[3].tide_type}  Tide Height:  {diveWeather[0].tides[0].tide_data[3].tideHeight_mt} meters</p>
              </div>                
            </InfoWindow>
          )}
        </GoogleMap>
     </LoadScript>
  )
}

export default MapContainer;



