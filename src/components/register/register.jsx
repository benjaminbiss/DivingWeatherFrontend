import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";
import "./register.css";

const Register = (props) => {

    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFName] = useState('');
    const [lastName, setLName] = useState('');
    const [middleName, setMName] = useState('');
    const [email, setEmail] = useState('');
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let user = {
            'username': userName,
            'password': password,
            'email': email,
            'first_name': firstName,
            'last_name': lastName,
            'middle_name': middleName,
        }
        let response = await axios.post(`http://127.0.0.1:8000/api/auth/register/`, user);
        console.log(response.data);
        if (response) {
            navigate("/");
        }
    }

    return (
        <React.Fragment>
            <div className="container"> 
                <div className="account-form m-auto">
                    <h1>Dive Planner</h1>
                    <div className="ms-2 me-2">
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <legend>Register</legend>
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
                                <div className="form-group">
                                    <label className="form-label mt-4">Email</label>
                                    <div className="form-floating mb-3">
                                        <input type="email" 
                                        className="form-control" 
                                        name="email"
                                        id="floatingInput" 
                                        placeholder="email@example.com" 
                                        onChange={(e) => setEmail(e.target.value)}/>
                                        <label for="floatinInput">email@example.com</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label mt-4">First Name</label>
                                    <div className="form-floating mb-3">
                                        <input type="text" 
                                        className="form-control" 
                                        name="first_name"
                                        id="floatingInput" 
                                        placeholder="Bob" 
                                        onChange={(e) => setFName(e.target.value)}/>
                                        <label for="floatinInput">First Name</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label mt-4">Middle Initial</label>
                                    <div className="form-floating mb-3">
                                        <input type="text" 
                                        className="form-control" 
                                        name="middle_name"
                                        id="floatingInput" 
                                        placeholder="A" 
                                        onChange={(e) => setMName(e.target.value)}/>
                                        <label for="floatinInput">Middle Initial</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label mt-4">Last Name</label>
                                    <div className="form-floating mb-3">
                                        <input type="text" 
                                        className="form-control" 
                                        name="last_name"
                                        id="floatingInput" 
                                        placeholder="Smith" 
                                        onChange={(e) => setLName(e.target.value)}/>
                                        <label for="floatinInput">Last Name</label>
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </fieldset>
                        </form>
                        <Link to="/login">Return to Log In</Link>
                    </div> 
                </div>
            </div>
        </React.Fragment>
     );
}
 
export default Register;