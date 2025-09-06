import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* The Outlet is where your page components (Home, Concerts, etc.) will be rendered */}
        <Outlet /> 
      </main>
    </>
  );
};

export default Layout;
