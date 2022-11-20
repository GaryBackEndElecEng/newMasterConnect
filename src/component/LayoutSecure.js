import React, { useContext, useEffect,useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { TokenAccessContext, } from '../context/TokenAccessProvider';
import { GeneralContext } from '../context/GeneralContextProvider';


const LayoutSecure = () => {
  const navigate = useNavigate();
  const {goToSignin} = useContext(TokenAccessContext);
  const { setChangePage } = useContext(GeneralContext);
  const tokenIsValid =localStorage.getItem("tokenIsValid") ? JSON.parse(localStorage.getItem("tokenIsValid")):false;
  
  useEffect(()=>{
    const handleSignin = () => {
      if(tokenIsValid==='true' || tokenIsValid) return;
      if((!tokenIsValid || tokenIsValid ==="false")){
        navigate("/signin", setChangePage(false))
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