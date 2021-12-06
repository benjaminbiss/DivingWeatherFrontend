import React, { useState } from 'react';
import axios from 'axios'
import './login.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";


const LogIn = (props) => {
    
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        let user = {
            'username': userName,
            'password': password
        }
        let response = await axios.post(`http://127.0.0.1:8000/api/auth/login/`, user);
        console.log(response.data);
        const token = response.data;
        localStorage.setItem('token', token.access);
        if (response) {
            navigate("/");
        }
    }

    return ( 
        <div className="logincontainer">
            <div className="account-form m-auto">
                <h1>Dive Planner</h1>
                <div className="ms-2 me-2">
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend>Log In</legend>
                            <div className="form-group">
                                <label className="form-label mt-4">Username</label>
                                <div className="form-floating mb-3">
                                    <input type="text" 
                                    className="form-control" 
                                    name="username"
                                    id="floatingInput" 
                                    placeholder="Username" 
                                    onChange={(e) => setUserName(e.target.value)}/>
                                    <label for="floatinInput">Username</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label mt-4">Password</label>
                                <div className="form-floating mb-3">
                                    <input type="password" 
                                    className="form-control" 
                                    name="password"
                                    id="floatingInput" 
                                    placeholder="Password" 
                                    onChange={(e) => setPassword(e.target.value)}/>
                                    <label for="floatinInput">Password</label>
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </fieldset>
                    </form>
                    <Link to="/register">Register Now</Link>
                </div>
            </div>
        </div>
     );
}
 
export default LogIn;