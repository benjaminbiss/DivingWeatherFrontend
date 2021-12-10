import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TripCard = (props) => {

    const navigate = useNavigate();

    function navigation() {
        navigate(`http://localhost:3000/trip/${props.trip.id}`)
    }

    // function deleteTrip() {
    //     let response = await axios.delete(`http://127.0.0.1:8000/trips/${props.trip.id}`);
    //     response.save();
    // }

    return ( 
        <div className="card mb-3" style={{ maxWidth: "20rem" }}>
            <h3 className="card-header">{props.trip.trip_name}</h3>
            <div className="card-body">
                <h5 className="card-title">{props.trip.date}</h5>
            </div>
            <div clasclassNames="card-body">
                <a className="card-link" onClick={navigation}>View Trip</a>
                {/* <a class="card-link" onClick={deleteTrip}>Delete Trip</a> */}
            </div>
        </div>
     );
}
 
export default TripCard;