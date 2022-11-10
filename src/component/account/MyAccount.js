import React, { useContext, useEffect, useState, } from 'react'
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
// import { PriceContext } from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import { Container,Fab } from '@mui/material';
// import { ContainerHomeFluid } from '../../styled/Container.styled';
// import styles from './account.module.css';
// import styled from 'styled-components';
import apiProtect from '../axios/apiProtect';
import GetProductList from './GetProductList';
// import DeleteIcon from '@mui/icons-material/Delete';
import CoverPage from './CoverPage';
import Particulars from './Particulars';
import GetServiceList from './GetServiceList';
import AdditionalAfterPostService from './AdditionalAfterPostService';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import RegisterPage from '../RegisterPage';
import GetPage from './GetPage';
import GetRegisterPages from '../utils/GetRegisterPages';
import MyAccountHelmet from './MyAccountHelmet';
import ProductInfo from './ProductInfo';
import OrderFormBanner from './OrderFormBanner';



const MyAccount = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setSignin, goToSignin, setSignout, setGoToSignin,usersInvoice,usersPostInvoice,usersExtraInvoice,signin } = useContext(TokenAccessContext);
  const { setTitle, setStyleName, setLoggedIn,  setChangePage,setExtraServices,extraServices,productInfo } = useContext(GeneralContext);
  const [activate, setActivate] = useState(false);
  const [invoice, setInvoice] = useState(false);
  const [postInvoice, setPostInvoice] = useState(false);
  const [extraInvoice, setExtraInvoice] = useState(false);
 
  const tokenIsValid = localStorage.getItem("tokenIsValid") ? JSON.parse(localStorage.getItem("tokenIsValid")) : false;
  
  

  useEffect(() => {
//THIS IS ONLY USED WHEN THE CLIENT LOGS IN, MAINLY FOR invoice.paid,postInvoice.paid triggers(CALL INFO FROM SERVER) 
    if (usersInvoice.loaded && usersInvoice.data) {
      setInvoice(usersInvoice.data)
    }
    if (usersPostInvoice.loaded && usersPostInvoice.data.paid) {
      setPostInvoice(usersPostInvoice.data)
    }
    if (usersExtraInvoice.loaded && usersExtraInvoice.data.paid) {
      setExtraInvoice(usersExtraInvoice.data)
    }
  }, [usersInvoice.loaded,usersPostInvoice.loaded,usersInvoice.data,usersPostInvoice.data]);

  
  useEffect(() => {

    if (tokenIsValid) {
      setSignin(false);
      setActivate(true);
      setLoggedIn(true);
    }
    if(window.scrollY){
      window.scroll(0,0);
      
  }
  }, [tokenIsValid]);

  useEffect(()=>{
    const getExtraServices = async()=>{
      try {
        const res= await apiProtect.get('/account/extraServices/');
        const body= res.data;
        if(body.length>0){
        setExtraServices({loaded:true,data:body})
        }
      } catch (error) {
        console.error(error.message)
      }
    }
    getExtraServices();
  },[])


  useEffect(() => {
    setTitle("My Account");
    setStyleName("My Account");
    setChangePage(false);
    if(window.scrollY){
      window.scroll(0,0);
    }
  }, [setTitle, setStyleName]);

 
  const handleSignin = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('user_id');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('csrftoken');
    localStorage.removeItem('page');
    localStorage.removeItem("tokenIsValid");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("goToSignin");
    setSignout(true);
    setActivate(false);
    setLoggedIn(false);
    setGoToSignin(true);
    navigate("/signin", setChangePage(true))
  }


  return (
    <>
      {activate ?
        <>
        <MyAccountHelmet/>
        <GetPage/>
        <RegisterPage/>
        <GetRegisterPages/>
          <CoverPage />
          <Particulars 
          invoicePaid={invoice}
           postInvoicePaid={postInvoice}
           extraInvoicePaid={extraInvoice}
           />
          {(usersInvoice.loaded && usersInvoice.data.paid) && <OrderFormBanner />}

         {!invoice.paid && <GetProductList/>}
          
            
          { !invoice.paid &&<GetServiceList paid={invoice.paid} postPaid={postInvoice.paid} />}

         {(postInvoice.paid && !usersExtraInvoice.data.paid) && <AdditionalAfterPostService extraServices={extraServices}/> }
            
            {productInfo.loaded && <ProductInfo productInfo={productInfo} />}
            
         
        </>
        :
        <Container maxWidth="md" sx={{ textAlign: "center", margin: "3rem auto" }}>
          <Fab variant="extended" color="warning" sx={{ ml: 3 }} onClick={() => handleSignin()} >
            Go to Signin please
            <ExitToAppIcon sx={{ fontSize: "24px", color: theme.palette.secondary.dark, ml: 3 }} />
          </Fab>
        </Container>
      }
    </>
  )
}


export default MyAccount