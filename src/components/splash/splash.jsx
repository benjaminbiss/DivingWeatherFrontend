import React, { useEffect, useState } from 'react';
import NavBar from '../navbar/navbar';
import MapContainer from '../MapContainer/MapContainer';
import jwtDecode from 'jwt-decode';


const Splash = (props) => {

    const [user, userLogged] = useState();
    const [jwt, setJWT] = useState();

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

    useEffect(() => {
        getJWT();
    }, [])
    useEffect(() => {
        console.log(jwt);
        getUser();
    }, [jwt])
    useEffect(() => {
        console.log(user);
    }, [user])

    return ( 
        <div>
            <NavBar />
            <div className="map_containter">
                {/* <MapContainer /> */}
            </div>
        </div>
     );
}
 
export default Splash;