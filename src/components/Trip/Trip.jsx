import React from 'react';
import ChecklistView from '../Checklist/ChecklistView';
import NavBar from '../navbar/navbar';
import axios from 'axios';


const Trip = (props) => {

    return ( 
        <div>
            <NavBar user={props.user}/>
            <div className="container">
                <div className="trip-container">
                    <p>lsit of users trips</p>
                    <p>links to the trip info WITH checklist</p>
                </div>
            </div>
        </div>
     );
}
 
export default Trip;