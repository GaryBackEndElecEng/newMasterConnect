import React, { useContext, useEffect,} from 'react'
// import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
// import { PriceContext } from '../../context/PriceContextProvider';
// import { useTheme } from '@mui/material/styles';
import Amount from './Amount';
import CheckoutForm from './CheckoutForm';
import RegisterPage from '../RegisterPage';
import GetRegisterPages from '../utils/GetRegisterPages';

// import {  Stack,  } from '@mui/material';
import CoverPage from './CoverPage';

// import styles from './checkout.module.css';
import styled from 'styled-components';
import apiProtect from '../axios/apiProtect';
import CheckoutHelmet from './CheckoutHelmet';

const CusCheckout = styled.div`
position:absolute;
top:0%;
left:0%;
width:100%;
z-index:10000;


@media screen and (max-width:900px){
  margin-left:0%;
  top:0%;
}

@media screen and (max-width:800px){
  margin-left:8%;
  top:20%;
}
@media screen and (max-width:600px){
  width:100%;
  top:0%;
  margin-left:0%;
}



`;

const Checkout = () => {
    // const theme = useTheme();
    const {  user_id,  loggedIn,setPublicKey,showCheckout} = useContext(TokenAccessContext);
    const { setTitle, setStyleName, setChangePage, } = useContext(GeneralContext);
    // const { getProductList, getServiceList } = useContext(PriceContext);
    // const userID = user_id ? user_id : parseInt(localStorage.getItem("user_id"));
    // const userLoggedIn = loggedIn ? loggedIn : JSON.parse(localStorage.getItem("loggedIn"));
    
    
    
    useEffect(()=>{
        setTitle("Checkout");
        setStyleName("Checking out");
        setChangePage(false);
    },[setTitle,setStyleName]);

    useEffect(()=>{
        const getPublic= async ()=>{
          const userID = user_id ? user_id : parseInt(localStorage.getItem("user_id"))
            try {
                const params={"user_id":userID}
                const res = await apiProtect.post('/account/get_public/',params);
                const body=res.data.public_key
                setPublicKey(body);
            } catch (error) {
                console.error(error.message)
            }
        }
        if(loggedIn){
            getPublic();
        }
      },[user_id,loggedIn,setPublicKey]);



  return (
    <>
    <GetRegisterPages/>
    <CheckoutHelmet/>
    <RegisterPage/>
    <CoverPage/>
    <div style={{position:"relative"}}>
    <Amount/>
    {showCheckout &&
    <CusCheckout>
    <CheckoutForm/>
    </CusCheckout>
    }
    </div>
    </>
  )
}

export default Checkout