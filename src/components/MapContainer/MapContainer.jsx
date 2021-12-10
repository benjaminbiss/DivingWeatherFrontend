import React from 'react';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { GoogleApiWrapper } from './GoogleApiWrapper';
import { WorldWeatherWrapper } from './WorldWeatherWrapper';
import { useEffect, useState } from 'react/cjs/react.development';
import axios from 'axios';
import ModalForm from '../ModalForm/ModalForm';
import jwtDecode from 'jwt-decode';

const MapContainer = (props) => {

  const [selectedDive, setDive] = useState(null);
  const [diveWeather, setWeather] = useState();
  const [date, setDate] = useState(0);
  const [time, setTime] = useState(0);
  const [toggle, toggleDisplay] = useState(false);
  const [jwt, setJWT] = useState();
  const [user, userLogged] = useState();
  const [userInfo, setUserInfo] = useState();
  
  useEffect(() => {
      getJWT();
  }, [])
  useEffect(() => {
      getUser();
  }, [jwt])
  useEffect(() => {
      if (user){
        getUserInfo();
      }
  }, [user])
  
  function getJWT() {
      const jwt = localStorage.getItem('token');
      setJWT(jwt);        
  }
  function getUser() {
      try{
          const user = jwtDecode(jwt);
          userLogged(user);
      } catch {}
  }

  const getUserInfo = async () => {
    let pk = user.user_id;
    const userInfo = await axios.get(`http://127.0.0.1:8000/api/auth/user/${pk}`, { headers: { Authorization: `Bearer ${jwt}` } });
    if(userInfo) {
        setUserInfo(userInfo.data);
    } else {console.log('no user found')}
  }

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

  function formDisplay() {
    toggleDisplay(true);
    console.log(toggle)
}

  const mapStyles = {        
    height: "90vh",
    width: "100%"};

  const defaultCenter = {
    lat: 15.0000, lng: -100.0000
  } 
  useEffect(() =>{

  }, [selectedDive])

  return (
    <React.Fragment>
     <LoadScript
       googleMapsApiKey={GoogleApiWrapper}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={3}
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
                <h5>Detailed View:</h5>
                <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                  <div class="btn-group me-2" role="group" aria-label="First group">
                    <button type="button" class="btn btn-secondary" onClick={() => setTime(0)}>0000</button>
                    <button type="button" class="btn btn-secondary" onClick={() => setTime(1)}>0300</button>
                    <button type="button" class="btn btn-secondary" onClick={() => setTime(2)}>0600</button>
                    <button type="button" class="btn btn-secondary" onClick={() => setTime(3)}>0900</button>
                    <button type="button" class="btn btn-secondary" onClick={() => setTime(4)}>1200</button>
                    <button type="button" class="btn btn-secondary" onClick={() => setTime(5)}>1500</button>
                    <button type="button" class="btn btn-secondary" onClick={() => setTime(6)}>1800</button>
                    <button type="button" class="btn btn-secondary" onClick={() => setTime(7)}>2100</button>
                  </div>
                </div>
                {diveWeather[date].hourly[time] ?
                <React.Fragment>
                  <p>Temperature-Fahrenheit: {diveWeather[date].hourly[time].tempF}  Feels Like-Fahrenheit: {diveWeather[date].hourly[time].FeelsLikeF}  Heat Index-Fahrenheit: {diveWeather[date].hourly[time].HeatIndexF}  </p>
                  <p>Wind Chill-Fahrenheit: {diveWeather[date].hourly[time].WindChillF}  Wind Gust-MPH: {diveWeather[date].hourly[time].WindGustMiles}  Cloud Cover:  {diveWeather[date].hourly[time].cloudcover}%  Humidity: {diveWeather[date].hourly[time].humidity}% </p>
                  <p>Precipitation: {diveWeather[date].hourly[time].precipInches}"  Dew Point-Fahrenheit: {diveWeather[date].hourly[time].DewPointF}  Visibility: {diveWeather[date].hourly[time].visibilityMiles} miles</p>
                  <p>Swell Height: {diveWeather[date].hourly[time].swellHeight_m} meters  Swell Direction: {diveWeather[date].hourly[time].swellDir16Point}  Swell Interval: {diveWeather[date].hourly[time].swellPeriod_secs} seconds</p>
                  <p>Water Temperature-Fahrenheit:  {diveWeather[date].hourly[time].waterTemp_F}  Wind Direction: {diveWeather[date].hourly[time].winddir16Point}  Wind Speed: {diveWeather[date].hourly[time].windspeedMiles}mph</p>
                </React.Fragment>
                :
                <p></p>
              }
                <button type="button" class="btn btn-secondary" onClick={() => toggleDisplay(true)}>Plan a Trip Here</button>
                </div>                
              :
              <div></div>}

            </InfoWindow>
            )}
            </GoogleMap>
            </LoadScript>
            {selectedDive ?
            <ModalForm toggle={toggle} toggleDisplay={toggleDisplay} location={selectedDive} user={user}/>
            :
            <div></div>
            }
            </React.Fragment>
  )
}

export default MapContainer;



