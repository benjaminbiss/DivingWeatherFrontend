import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";

const Marker = (props) => {

    const navigate = useNavigate();
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState('');    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let location = {
            'latitude': lat,
            'longitude': lng,
            'name': name,
        }
        let response = await axios.post(`http://127.0.0.1:8000/locations/`, location);
        console.log(response.data);
        if (response) {
            navigate("/");
        }
    }

    return (
        <React.Fragment>
            <div className="container"> 
                <div className="account-form m-auto">
                    <h1>Add Location</h1>
                    <div className="ms-2 me-2">
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <legend>Enter Information</legend>
                                <div className="form-group">
                                    <label className="form-label mt-4">Name</label>
                                    <div className="form-floating mb-3">
                                        <input type="name" 
                                        className="form-control" 
                                        name="name"
                                        id="floatingInput" 
                                        placeholder="Monterey Bay" 
                                        onChange={(e) => setName(e.target.value)}/>
                                        <label for="floatinInput">Name</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label mt-4">Latitude</label>
                                    <div className="form-floating mb-3">
                                        <input type="text" 
                                        className="form-control" 
                                        name="latitude"
                                        id="floatingInput" 
                                        placeholder="000.0000" 
                                        onChange={(e) => setLat(e.target.value)}/>
                                        <label for="floatinInput">Latitude</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label mt-4">Longitude</label>
                                    <div className="form-floating mb-3">
                                        <input type="text" 
                                        className="form-control" 
                                        name="longitude"
                                        id="floatingInput" 
                                        placeholder="000.0000" 
                                        onChange={(e) => setLng(e.target.value)}/>
                                        <label for="floatinInput">Longitude</label>
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </fieldset>
                        </form>
                        <Link to="/">Return to Map</Link>
                    </div> 
                </div>
            </div>
        </React.Fragment>
     );
}
 
export default Marker;