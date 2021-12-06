import React from 'react';
import NavBar from '../navbar/navbar';
import ChecklistView from './ChecklistView';
import './Checklist.css'

const Checklist = (props) => {
    return ( 
        <React.Fragment>
            <NavBar />
            <ChecklistView />
        </React.Fragment>
     );
}
 
export default Checklist;