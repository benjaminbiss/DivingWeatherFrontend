import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const NavBar = (props) => {

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
  
  function refreshPage() {
    window.location.reload();
  }

  function deleteJWT() {
    localStorage.removeItem('token');
    refreshPage();
  }

    return ( 
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Dive Planner</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link" href="/checklist">Safety Info
                  <span className="visually-hidden">(current)</span>
                </a>
              </li>
              {!userInfo ?
              <ul className="navbar-nav me-auto">
              <li className="nav-item">
              <a className="nav-link" href="/login">Login
                  <span className="visually-hidden">(current)</span>
                </a>
              </li>
              <li className="nav-item">
              <a className="nav-link" href="/register">Register
                  <span className="visually-hidden">(current)</span>
                </a>
              </li></ul>
              :
              <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link" href="/trips">Plan a Trip</a>
              </li>
              <li className="nav-item">
              <a className="nav-link" href="/marker">New Map Marker</a>
              </li>
              <li className="nav-item">
              <a className="nav-link" href="/user">{userInfo.username}'s Profile</a>
              </li>
              <button type="button" class="btn btn-primary" onClick={deleteJWT}>Logout</button>
              </ul>}
              </ul>
          </div>
        </div>
      </nav>
     );
}
 
export default NavBar;