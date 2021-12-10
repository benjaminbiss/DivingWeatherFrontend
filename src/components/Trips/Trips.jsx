import React, { useState, useEffect } from 'react';
import ChecklistView from '../Checklist/ChecklistView';
import NavBar from '../navbar/navbar';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import TripCard from '../TripCard/TripCard';
import Modal from '../Modal/Modal';
import TripDisplay from '../TripDisplay/TripDisplay';


const Trip = (props) => {

    const [trips, setTrips] = useState([]);
    const [userTrips, setUserTrips] = useState([]);
    const [jwt, setJWT] = useState();
    const [user, userLogged] = useState();
    const [userInfo, setUserInfo] = useState();
    const [toggle, toggleDisplay] = useState(false);
    
    useEffect(() => {
        getJWT();
        getTrips();
    }, [])
    useEffect(() => {
        getUser();
    }, [jwt])
    useEffect(() => {
        if (user){
            getUserInfo();
        }
    }, [user])
    useEffect(() => {
        getUserTrips();
    }, [userInfo, trips])
    useEffect(() => {
        //force rerender when trips is updated
    }, [trips, userTrips])
    
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

    const getTrips = async () => {
        const result = await axios.get(`http://127.0.0.1:8000/trips/`);
        if(result) {
            setTrips(result.data);
        } else {console.log('no trips found')}
      }

    function getUserTrips() {
        let trippy = [];
        trips.map((trip) => {
            if(trip.diver_pk_id === user.user_id){
                trippy.push(trip);
            } else { }
        })
        setUserTrips(trippy);
    }

    function formDisplay() {
        
    }


    return ( 
        <React.Fragment>
        <div>
            <NavBar user={props.user}/>
            <div className="container">
                <div className="trip-container">
                    <button className="btn btn-primary">Add new Trip</button>
                </div>
                <br />
                <div className='row'>
                    <TripDisplay trips={trips}/>
                </div>
            </div>
        </div>
        {toggle === true ?
        <Modal />
        :
        <div></div>
        }
        </React.Fragment>
     );
}
 
export default Trip;