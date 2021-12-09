import React from 'react';
import NavBar from '../navbar/navbar';
import GenericChecklistView from './GenericCheckListView'
import './Checklist.css'

const Checklist = (props) => {
    return ( 
        <React.Fragment>
            <NavBar />
            <GenericChecklistView />
        </React.Fragment>
     );
}
 
export default Checklist;