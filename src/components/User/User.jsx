import React, { useState, useEffect } from 'react';
import NavBar from '../navbar/navbar';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import './User.css'
import { Link } from 'react-router-dom';

const User = (props) => {

    const [jwt, setJWT] = useState();
    const [user, userLogged] = useState();
    const [userInfo, setUserInfo] = useState();
    
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
    
    return ( 
        <div>
            <NavBar />
            <div className="logincontainer">
                <div className="account-form m-auto">
                    <h1>User Information</h1>
                    <br />
                    {!userInfo ?
                    <div>
                    <p className="lead">Username: </p>
                    <p className="lead">Password: </p>
                    <p className="lead">Email: </p>
                    <p className="lead">First Name: </p>
                    <p className="lead">Last Name: </p>
                    </div>
                    :
                    <div>
                    <p className="lead">Username: {userInfo.username}</p>
                    <p className="lead">Email: {userInfo.email}</p>
                    <p className="lead">First Name: {userInfo.first_name}</p>
                    <p className="lead">Last Name: {userInfo.last_name}</p>
                    <p className="lead">Password: {userInfo.password}</p>
                    </div>}
                    <br />
                    <Link to="/">Return to main page</Link>
                    <a> __________ </a>
                    <Link to="/update">Update Information</Link>
                </div>
            </div>
        </div>
     );
}
 
export default User;