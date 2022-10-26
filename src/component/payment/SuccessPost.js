import React, { useEffect, useContext, useState,useMemo } from 'react';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { Container,Typography } from '@mui/material';
import apiProtect from '../axios/apiProtect';
// import api from '../axios/api';
import styled from 'styled-components';
import styles from './payment.module.css';
import Particulars from '../checkout/Particulars';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RegisterPage from '../RegisterPage';
import ShowPayment from './ShowPayment';
import SuccessPostHelmet from './SuccessPostHelmet';

const CoverPage = styled(Container)`
position:relative;
margin:0 auto;
margin-top:5rem;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
min-height:40vh;
background-image:url(${({ image }) => image});
background-size: 100% 100%;
animation: showCover 2s ease-in-out;
@keyframes showCover {
  from {opacity:0;}
  to {opacity:1;}
}


`;

const SuccessPost = () => {
  
  const { postSession_id, staticImage, setTitle, setStyleName,setChangePage } = useContext(GeneralContext);
  const { user_id, loggedIn, setUserAccount,usersPostInvoice,setUsersPostInvoice,setLoggedIn, userAccount, setUser_id } = useContext(TokenAccessContext);
  const getSession_id = postSession_id ? postSession_id : localStorage.getItem("postSession_id");
  const [message, setMessage] = useState(false);
  const getLoggedIn = localStorage.getItem("loggedIn") ? JSON.parse(localStorage.getItem("loggedIn")) : loggedIn;
  const mainPic = `${staticImage}/mainDesign.png`
  const [growIn, setGrowIn] = useState(false);
  const [showPayment,setShowPayment]=useState(false);
  const getUser_id = localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")) : user_id;
  const getUsersInvoice = usersPostInvoice.loaded ? usersPostInvoice.data :null;
  


  
  
  useMemo(() => {
    const getInfoFromSession_id = async () => {
      try {
        const res = await apiProtect.post('/account/getPostInfoSession/', { "user_id": getUser_id, "postSession_id": postSession_id });
        const body = res.data
        // console.log(body)
        // setUserAccount({ loaded: true, data: body })
        setUsersPostInvoice({ loaded: true, data: body.postInvoice })
        setUser_id(getUser_id)
        setMessage("Success!!- Thank you for purchasing the our services. An email was sent to you. We will be contacting you in the next 24hrs to begin the deployment. Looking forward to talking to you.")
      } catch (error) {
        console.error(error.message)
      }
    }
    if (getLoggedIn && postSession_id) {
      // console.log("INSIDE)")
      setTimeout(()=>{
        getInfoFromSession_id();
      },500);
      
    } if(!getLoggedIn) { 
      setMessage("you need to signin again to check your account. You are not presently logged in.");
     } if(!getSession_id){
      setMessage("We did not recieved the confirmation payment from our financial services. An email will be sent to you to confirm your payment.If persists, we will contact you to sort this out. ");
     }
  }, [postSession_id, getLoggedIn]);

  useEffect(() => {
    setChangePage(false);
    setTitle("success");
    setStyleName("All that's left is to migrate and deploy!!")
    setTimeout(() => {
      setGrowIn(true);
    }, 2000);
    if(growIn){
      setTimeout(()=>{
        setShowPayment(true);
      },4000);
    }
  },[]);

  



  return (
    <Container maxwidth="xl"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "3rem" }}
    >
      <SuccessPostHelmet/>
      <RegisterPage/>
      <Particulars userAccount={userAccount} />
      <CoverPage image={mainPic} maxWidth="xl" sx={{ position: "relative" }}>

        {loggedIn ?
          <ShowPayment message={message} getUsersInvoice={getUsersInvoice}/>


          :


          <Typography className={growIn ? styles.showMessage : styles.noMessage} component="h1" variant="h3">
            You are not loggedIn.{message}.
          </Typography>
        }
      </CoverPage>
      <Container maxWidth="md">

      </Container>


    </Container >
  )
}

export default SuccessPost