import React, { useContext, useEffect,useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './footer/Footer'
import NavBar from './navbar/NavBar'
import { TokenAccessContext, TokenAccessProvider } from '../context/TokenAccessProvider';
import { GeneralContext } from '../context/GeneralContextProvider';
import { Link } from '@mui/material';
import MyAccount from '../component/account/MyAccount';
import { SettingsRemoteSharp } from '@mui/icons-material';

const LayoutSecure = () => {
  const navigate = useNavigate();
  const {goToSignin} = useContext(TokenAccessContext);
  const { setChangePage } = useContext(GeneralContext);
  const [notAllowed,setNotAllowed]=useState(false);
  const tokenIsValid =localStorage.getItem("tokenIsValid") ? JSON.parse(localStorage.getItem("tokenIsValid")):false;
  
  useEffect(()=>{
    const handleSignin = () => {
      if(tokenIsValid==='true' || tokenIsValid) return setNotAllowed(false);
      if((!tokenIsValid || tokenIsValid ==="false")){
        navigate("/signin", setChangePage(false))
        setNotAllowed(true);
        return
      }
      
    }
    handleSignin();
    
      
   
  },[tokenIsValid,navigate,setChangePage,goToSignin]);


  return (
        <Outlet />

  )
}

export default LayoutSecure