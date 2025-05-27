import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from"../Components/Navbar"
import Footer from"../Pages/Footer"
const Main = () => {
    return (
        <div>
          <Navbar></Navbar>
            <main  className='min-h-[calc(100vh-306px)]'>
                <Outlet></Outlet>
            </main>
        <Footer></Footer>
        </div>
    );
};

export default Main;