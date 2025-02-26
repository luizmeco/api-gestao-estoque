import React from "react";
import './App.css'
import NavBar from './components/Navbar.jsx'
import { Outlet } from "react-router-dom";


const App = () => {
    return (
        <div className='bg-dark'>
            <NavBar />
            <div className='col-md-10 mx-auto text-center bg-primary bg-opacity-50 mt-5 rounded-4 fs-2'>
                <Outlet />
            </div>
        </div>
    )
};

export default App