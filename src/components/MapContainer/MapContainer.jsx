import React from 'react';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { GoogleApiWrapper } from './GoogleApiWrapper';
import { WorldWeatherWrapper } from './WorldWeatherWrapper';
import { useEffect, useState } from 'react/cjs/react.development';
import axios from 'axios';

const MapContainer = (props) => {

  const [selectedDive, setDive] = useState(null);
  const [diveWeather, setWeather] = useState();
  const [date, setDate] = useState(0);
  const [time, setTime] = useState(0);

  const getWeather = async (lat, long) => {
    const weather = await axios.get(`http://api.worldweatheronline.com/premium/v1/marine.ashx?format=json&q=${lat},${long}&tide=yes&key=${WorldWeatherWrapper}`);
    if(weather) {
        setWeather(weather.data.data.weather);
        console.log(weather.data.data.weather)
    } else { }
  }

  function cycleDateBack() {
    if (date !== 0) {
      setDate(date - 1);
    } else {
      setDate(6)
    }
  }

  function cycleDateForward() {
    if (date !== 6) {
      setDate(date + 1);
    } else {
      setDate(0)
    }
  }

  function cycleTimeBack() {
    if (time !== 0) {
      setTime(time - 1);
    } else {
      setTime(7)
    }
  }

  function cycleTimeForward() {
    if (time !== 7) {
      setTime(time + 1);
    } else {
      setTime(0)
    }
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
              {diveWeather ?
              <div>
                <h3>Dive Site: {selectedDive.name}</h3>
                <h4>{diveWeather[date].date}</h4>
                <button type="button" class="btn btn-primary btn-sm" onClick={() => cycleDateBack()}>Previous Day</button>
                <button type="button" class="btn btn-primary btn-sm" onClick={() => cycleDateForward()}>Next Day</button>
                <p></p>
                <h5>Weather Details: </h5>
                <p>Sunrise:  {diveWeather[date].astronomy[0].sunrise}  Sunset:  {diveWeather[date].astronomy[0].sunset} UV Index:  {diveWeather[date].uvIndex}</p>
                <p>Max Temperature-Fahrenheit:  {diveWeather[date].maxtempF}  Min Temperature-Fahrenheit:  {diveWeather[date].mintempC}</p>
                <p>Max Temperature-Celsius:  {diveWeather[date].maxtempC}  Min Temperature-Celsius:  {diveWeather[date].mintempC}</p>
                <h5>Tide Details: </h5>
                {!diveWeather[date].tides[0].tide_data[0] ?
                <p></p>
                :
                <p>Tide Time: {diveWeather[date].tides[0].tide_data[0].tideTime}  Tide Type: {diveWeather[date].tides[0].tide_data[0].tide_type}  Tide Height:  {diveWeather[date].tides[0].tide_data[0].tideHeight_mt} meters</p>}
                {!diveWeather[date].tides[0].tide_data[1] ?
                <p></p>
                :
                <p>Tide Time: {diveWeather[date].tides[0].tide_data[1].tideTime}  Tide Type: {diveWeather[date].tides[0].tide_data[1].tide_type}  Tide Height:  {diveWeather[date].tides[0].tide_data[1].tideHeight_mt} meters</p>}
                {!diveWeather[date].tides[0].tide_data[2] ?
                <p></p>
                :
                <p>Tide Time: {diveWeather[date].tides[0].tide_data[2].tideTime}  Tide Type: {diveWeather[date].tides[0].tide_data[2].tide_type}  Tide Height:  {diveWeather[date].tides[0].tide_data[2].tideHeight_mt} meters</p>}
                {!diveWeather[date].tides[0].tide_data[3] ?
                <p></p>
                :
                <p>Tide Time: {diveWeather[date].tides[0].tide_data[3].tideTime}  Tide Type: {diveWeather[date].tides[0].tide_data[3].tide_type}  Tide Height:  {diveWeather[date].tides[0].tide_data[3].tideHeight_mt} meters</p>}
                {diveWeather[date].hourly[time] ?
                <React.Fragment>
                  <h5>Detailed View: {diveWeather[date].hourly[time].time}</h5>
                  <p>Temperature-Fahrenheit: {diveWeather[date].hourly[time].tempF}  Feels Like-Fahrenheit: {diveWeather[date].hourly[time].FeelsLikeF}  Heat Index-Fahrenheit: {diveWeather[date].hourly[time].HeatIndexF}  </p>
                  <p>Wind Chill-Fahrenheit: {diveWeather[date].hourly[time].WindChillF}  Wind Gust-MPH: {diveWeather[date].hourly[time].WindGustMiles}  Cloud Cover:  {diveWeather[date].hourly[time].cloudcover}%  Humidity: {diveWeather[date].hourly[time].humidity}% </p>
                  <p>Precipitation: {diveWeather[date].hourly[time].precipInches}"  Dew Point-Fahrenheit: {diveWeather[date].hourly[time].DewPointF}  Visibility: {diveWeather[date].hourly[time].visibilityMiles} miles</p>
                  <p>Swell Height: {diveWeather[date].hourly[time].swellHeight_m} meters  Swell Direction: {diveWeather[date].hourly[time].swellDir16Point}  Swell Interval: {diveWeather[date].hourly[time].swellPeriod_secs} seconds</p>
                  <p>Water Temperature-Fahrenheit:  {diveWeather[date].hourly[time].waterTemp_F}  Wind Direction: {diveWeather[date].hourly[time].winddir16Point}  Wind Speed: {diveWeather[date].hourly[time].windspeedMiles}mph</p>
                </React.Fragment>
                :
                <p></p>
                }
                <button type="button" class="btn btn-primary btn-sm" onClick={() => cycleTimeBack()}>Previous Time</button>
                <button type="button" class="btn btn-primary btn-sm" onClick={() => cycleTimeForward()}>Next Time</button>
                </div>                
              :
              <div></div>}
            </InfoWindow>
            )}
            </GoogleMap>
            </LoadScript>
  )
}

export default MapContainer;



