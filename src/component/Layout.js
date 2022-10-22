import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from './Header';
import Footer from './footer/Footer'
import NavBar from './navbar/NavBar'
import {GeneralContextProvider} from '../context/GeneralContextProvider';
import {TokenAccessProvider} from '../context/TokenAccessProvider';
import {PriceContextProvider} from '../context/PriceContextProvider';


const Layout = () => {
  return (
    <div 
    style={{margin:"0px",padding:"0px",position:"relative",width:"100vw",diplay:"flex",justifyContent:"flex-start",alignItmes:"center",flexDirection:"column",}}
    
    >
      
      <GeneralContextProvider>
        <PriceContextProvider>
      <NavBar/>
       <Header />
       <TokenAccessProvider>
        <Outlet />
        </TokenAccessProvider>
        <Footer />
        </PriceContextProvider>
        </GeneralContextProvider>
    </div>
  )
}

export default Layout