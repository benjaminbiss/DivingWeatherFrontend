import React from 'react';
import axios from 'axios';
import ModalChecklist from '../ModalChecklist/ModalChecklist';
import { useState } from 'react/cjs/react.development';
import ReactDom from 'react-dom';
import 'react-responsive-modal/styles.css';

const TripCard = (props) => {

    const [isOpen, setIsOpen] = useState(false);

    // function deleteTrip() {
    //     let response = await axios.delete(`http://127.0.0.1:8000/trips/${props.trip.id}`);
    //     response.save();
    // }

    return ( 
        <div className="card mb-3" style={{ maxWidth: "30rem" }}>
            <h3 className="card-header">{props.trip.trip_name}</h3>
            <div className="card-body">
                <h5 className="card-title">{props.trip.date}</h5>
                <br />
                <p>Check Weather: {props.trip.checklist_3 === false ? "Incomplete" : "Complete"}</p>
                <p>BCD: {props.trip.checklist_4 === false ? "Incomplete" : "Complete"}</p>
                <p>Weights: {props.trip.checklist_5 === false ? "Incomplete" : "Complete"}</p>
                <p>Release: {props.trip.checklist_6 === false ? "Incomplete" : "Complete"}</p>
                <p>Air: {props.trip.checklist_7 === false ? "Incomplete" : "Complete"}</p>
                <p>Final OK: {props.trip.checklist_8 === false ? "Incomplete" : "Complete"}</p>
                
            </div>
            <div clasclassNames="card-body">
                <a className="card-link" onClick={() => setIsOpen(true)}>View Trip</a>
            </div>
            <ModalChecklist isOpen={isOpen} setIsOpen={setIsOpen} trip={props.trip} />
        </div>
     );
}
 
export default TripCard;