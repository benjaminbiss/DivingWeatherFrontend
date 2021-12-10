import React from 'react';
import Modal from 'react-modal'
import { useEffect, useState } from 'react/cjs/react.development';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ModalForm = (props) => {

    const navigate = useNavigate();
    const [tripName, setTripName] = useState('');
    const [date, setdate] = useState('');

    useEffect(() => {

    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let trip = {
            'trip_name': tripName,
            'date': date,
            'diver_pk': props.user.user_id,
            'location_pk': props.location.id,
            'checklist_1': false,
            'checklist_2': false,
            'checklist_3': false,
            'checklist_4': false,
            'checklist_5': false,
            'checklist_6': false,
            'checklist_7': false,
            'checklist_8': false,
            'checklist_9': false,
            'checklist_10': false,
        }
        let response = await axios.post(`http://127.0.0.1:8000/trips/`, trip);
        console.log(response.data);
        navigate('/trips');
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
    };

    return ( 
        <Modal isOpen={props.toggle} style={customStyles}>
            <div className="container"> 
                <div className="account-form m-auto">
                    <h1>Plan a New Dive</h1>
                    <div className="ms-2 me-2">
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                            <div>
                                <legend>{props.location.name}</legend>
                                <div className="form-group">
                                    <label className="form-label mt-4">tripName</label>
                                    <div className="form-floating mb-3">
                                        <input type="text" 
                                        className="form-control" 
                                        name="tripName"
                                        id="floatingInput" 
                                        placeholder="tripName" 
                                        onChange={(e) => setTripName(e.target.value)}/>
                                        <label for="floatinInput">Name of trip</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label mt-4">Date</label>
                                    <div className="form-floating mb-3">
                                        <input type="date" 
                                        className="form-control" 
                                        name="date"
                                        id="floatingInput" 
                                        placeholder="date" 
                                        onChange={(e) => setdate(e.target.value)}/>
                                        <label for="floatinInput">Date</label>
                                    </div>
                                </div>
                            </div>
                                <div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                    <button className="btn btn-primary" onClick={() => props.toggleDisplay(false)}>Close</button>
                                </div>
                            </fieldset>
                        </form>
                    </div> 
                </div>
            </div>
        </Modal>
     );
}
 
export default ModalForm;