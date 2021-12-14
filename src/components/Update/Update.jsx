import React, { useState, useEffect } from 'react';
import NavBar from '../navbar/navbar';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

const User = (props) => {

    const [jwt, setJWT] = useState();
    const [user, userLogged] = useState();
    const [userInfo, setUserInfo] = useState();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFName] = useState('');
    const [lastName, setLName] = useState('');
    const [middleName, setMName] = useState('');
    const [email, setEmail] = useState('');
    
    useEffect(() => {
        getJWT();
    }, [])
    useEffect(() => {
        getUser();
    }, [jwt])
    useEffect(() => {
        console.log(user);
        if (user){
          getUserInfo();
        }
    }, [user])
    
    function getJWT() {
        const jwt = localStorage.getItem('token');
        setJWT(jwt);        
    }
    function getUser() {
        try{
            const user = jwtDecode(jwt);
            userLogged(user);
        } catch {}
    }
  
    const getUserInfo = async () => {
      let pk = user.user_id;
      const userInfo = await axios.get(`http://127.0.0.1:8000/api/auth/user/${pk}`, { headers: { Authorization: `Bearer ${jwt}` } });
      if(userInfo) {
          setUserInfo(userInfo.data);
      } else {console.log('no user found')}
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let userUpdate = {
            'username': userName,
            'email': email,
            'first_name': firstName,
            'last_name': lastName,
            'middle_name': middleName,
            'password': password
        }
        let pk = user.user_id;
        let response = await axios.put(`http://127.0.0.1:8000/api/auth/user/${pk}`, userUpdate, { headers: { Authorization: `Bearer ${jwt}` } });
        console.log(response.data);
        if (response) {
            navigate("/");
        }
    }
    
    return ( 
        <React.Fragment>
            <NavBar />
            <div className="container"> 
                <div className="account-form m-auto">
                    <h1>User Information</h1>
                    <div className="ms-2 me-2">
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <legend>Update</legend>
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
                                <div className="form-group">
                                    <label className="form-label mt-4">Password</label>
                                    <div className="form-floating mb-3">
                                        <input type="text" 
                                        className="form-control" 
                                        name="password"
                                        id="floatingInput" 
                                        placeholder="Smith" 
                                        onChange={(e) => setPassword(e.target.value)}/>
                                        <label for="floatinInput">Password</label>
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </fieldset>
                        </form>
                        <Link to="/user">Return to User Page</Link>
                    </div> 
                </div>
            </div>
        </React.Fragment>
     );
}
 
export default User;