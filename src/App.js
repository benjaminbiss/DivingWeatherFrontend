import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import "./bootstrap.min.css";
import "./App.css";

import LogIn from './components/login/login';
import Register from './components/register/register';
import Splash from './components/splash/splash';
import User from './components/User/User';
import Checklist from './components/Checklist/Checklist';
import Trip from './components/Trip/Trip';
import Update from './components/Update/Update';
import Marker from './components/Marker/Marker';
import Trips from './components/Trips/Trips';

function App() {

    return (
            <div>
                <header>
                    <Routes>
                        <Route path="/" exact element={<Splash />} />
                        <Route path="/login" exact element={<LogIn />} />
                        <Route path="/register" exact element={<Register />} />
                        <Route path="/user" exact element={<User />} />
                        <Route path="/checklist" exact element={<Checklist />} />
                        <Route path="/trip" exact element={<Trip />} />
                        <Route path="/update" exact element={<Update />} />
                        <Route path="/marker" exact element={<Marker />} />
                        <Route path="/trips" exact element={<Trips />} />
                    </Routes>
                </header>
            </div>
    )
}

export default App;