import React, { useState, useEffect } from 'react';
import ChecklistView from '../Checklist/ChecklistView';
import NavBar from '../navbar/navbar';
import axios from 'axios';
import jwtDecode from 'jwt-decode';



const Trip = (props) => {

    return ( 
        <div>
            <NavBar />
            <div className="container">
                <div className="trip-container">
                    <ChecklistView />
                </div>
            </div>
        </div>
     );
}
 
export default Trip;