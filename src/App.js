import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import "./bootstrap.min.css";
import "./App.css";

import LogIn from './components/login/login';
import Register from './components/register/register';
import Splash from './components/splash/splash';
import User from './components/User/User';
import Checklist from './components/Checklist/Checklist';

function App() {

    const [user, userLogged] = useState();

    function logUser() {
        const jwt = localStorage.getItem('token');
        try{
            const user = jwtDecode(jwt);
            userLogged(user);
        } catch {}
    }

    useEffect(() => {
        logUser();
    }, [])

    return (
            <div>
                <header>
                    <Routes>
                        <Route path="/" exact element={<Splash user={user}/>} />
                        <Route path="/login" exact element={<LogIn userLogged={logUser}/>} />
                        <Route path="/register" exact element={<Register />} />
                        <Route path="/user" exact element={<User />} />
                        <Route path="/checklist" exact element={<Checklist />} />
                    </Routes>
                </header>
            </div>
    )
}

export default App;