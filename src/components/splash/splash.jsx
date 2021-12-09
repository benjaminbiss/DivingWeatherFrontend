import React, { useState, useEffect } from 'react';
import NavBar from '../navbar/navbar';
import MapContainer from '../MapContainer/MapContainer';
import axios from 'axios';


const Splash = (props) => {
    let markers = [];
    const [locations, setLocations] = useState([]);
    const [stateMarkers, setMarkers] = useState([]);

    useEffect(() => {
        getLocations();
    }, [])
    useEffect(() => {
      setDecimals();
      setMarkers(markers);
    }, [locations])

    const getLocations = async () => {
        const locationList = await axios.get(`http://127.0.0.1:8000/locations/`);
        if(locationList) {
            setLocations(locationList.data);
        } else { }
      }
    
      function setDecimals() {
        for (let i = 0; i < locations.length; i++){
            markers.push( 
              {
                id: i,
                lat: parseFloat(locations[i].latitude),
                lng: parseFloat(locations[i].longitude),
                name: locations[i].name
            }
          )
        }
        console.log(markers)
      }

    return ( 
        <div>
            <NavBar />
            <div className="map_containter">
                <MapContainer markers={stateMarkers}/>
            </div>
        </div>
     );
}
 
export default Splash;