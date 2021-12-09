import React from 'react';
import ChecklistView from '../Checklist/ChecklistView';
import NavBar from '../navbar/navbar';
import axios from 'axios';
import Checklist from '../Checklist/Checklist';


const Trip = (props) => {

    return ( 
        <div>
            <NavBar user={props.user}/>
            <div className="container">
                <div className="trip-container">
                    <ChecklistView />
                </div>
            </div>
        </div>
     );
}
 
export default Trip;