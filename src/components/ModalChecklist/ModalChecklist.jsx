import React, { useState, useEffect } from 'react';
import ChecklistView from '../Checklist/ChecklistView';
import { Modal } from 'react-responsive-modal';

const ModalChecklist = (props) => {

    return ( 
        <Modal open={props.isOpen} onClose={() => props.setIsOpen(false)}>
            <h2>{props.trip.trip_name}</h2>
            <h4>{props.trip.date}</h4>
            <ChecklistView trip={props.trip}/>
        </Modal>
     );
}
 
export default ModalChecklist;