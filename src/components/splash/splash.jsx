import React, { useEffect, useState } from 'react';
import NavBar from '../navbar/navbar';
import MapContainer from '../MapContainer/MapContainer';


const Splash = (props) => {

    return ( 
        <div>
            <NavBar user={props.user}/>
            <div className="map_containter">
                <MapContainer />
            </div>
        </div>
     );
}
 
export default Splash;