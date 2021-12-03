import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import "./bootstrap.min.css";
import "./App.css";

import LogIn from './components/login/login';
import Register from './components/register/register';
import Splash from './components/splash/splash';

function App() {

    const [user, userLogged] = useState();

    return (
            <div>
                <header>
                    <Routes>
                        <Route path="/" exact element={<Splash />} />
                        <Route path="/login" exact element={<LogIn />} />
                        <Route path="/register" exact element={<Register />} />
                    </Routes>
                </header>
            </div>
    )
}

export default App;