import React from 'react'
import {Outlet} from 'react-router-dom';
import Navbar from './nav/Navbar';
import '../App.css'
import Copywright from './nav/Copywright';
import {GeneralContextProvider} from '../context/GeneralContextProvider';

const Layout = () => {
  return (
    <div className="Appcenter"  >
      <GeneralContextProvider>
        <Navbar/>
        <Outlet/>
        <Copywright/>
        </GeneralContextProvider>
    </div>
  )
}

export default Layout