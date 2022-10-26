import React, { useEffect, useContext, useState} from 'react';
import {useNavigate,useLocation} from 'react-router-dom';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { Container, Fab, Stack, Typography } from '@mui/material';
import apiProtect from '../axios/apiProtect';
import styled from 'styled-components';
import styles from './payment.module.css';
import Particulars from '../checkout/Particulars';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import RegisterPage from '../RegisterPage';


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
const Cancelled = () => {
  const navigate =useNavigate();
  
  const { staticImage, setTitle, setStyleName,setChangePage, } = useContext(GeneralContext);
  const { user_id, loggedIn,  setLoggedIn, userAccount,} = useContext(TokenAccessContext);
  const [message, setMessage] = useState(false);
  const getLoggedIn = localStorage.getItem("loggedIn") ? JSON.parse(localStorage.getItem("loggedIn")) : loggedIn;
  const mainPic = `${staticImage}/mainDesign.png`
  const [growIn, setGrowIn] = useState(false);
  
  const [recievedCanceled,setRecievedCanceled]=useState({});
  const getUser_id = localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")) : user_id;
  const getRecievedCanceled= recievedCanceled.loaded ? recievedCanceled.data.canceledCount : null;


  useEffect(() => {
    setTitle("Canceled");
    setStyleName("Send Us a message please!");
    setChangePage(false);
    setTimeout(() => {
      setGrowIn(true);
    }, 2000);
  });
  

  useEffect(() => {

    setLoggedIn(getLoggedIn);
    const getCancelledUser_id = async () => {
      try {
        const res = await apiProtect.post('/account/CanceledPurchase/', { "user_id": getUser_id,});
        const body = res.data
        //sends data:{"id","canceled","canceledCount"}
        setRecievedCanceled({loaded:true,data:body});
      } catch (error) {
        console.error(error.message)
      }
    }
    if (getLoggedIn && user_id) {
      console.log("INSIDE)")
      getCancelledUser_id();
    } if (getLoggedIn === false) { setMessage("you need to signin again to check your account. You are not presently logged in.") }
  }, [ getLoggedIn,user_id]);

  const handleSignin = (e)=>{
      if(getLoggedIn && (getRecievedCanceled > 1 && getRecievedCanceled < 4)){
        navigate("/contact",setChangePage(true))
      }else{
        navigate("/signin",setChangePage(true))
      }
  }


  return (
    <Container maxwidth="xl"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "3rem" }}
    >
      <RegisterPage/>
      <Particulars userAccount={userAccount} />
      <CoverPage image={mainPic} maxWidth="xl" sx={{ position: "relative" }}>

        {loggedIn ?
        <Stack direction="column" spacing={0}>
          <Typography className={growIn ? styles.showMessage : styles.noMessage} component="h1" variant="h3" sx={{ marginTop: { sm: "4rem", xs: "4rem" }, fontSize: { xs: "100%", sm: "130%", md: "170%" }, padding: "2rem auto" }}>
            Sorry!!- it seems that your order was canceled.
          </Typography>
          <Stack direction="column">
          {(getRecievedCanceled > 1 && getRecievedCanceled < 4) ?
          <Fab variant="extended" color={"danger"} onClick={(e)=>handleSignin(e)}>
            Sign back IN <ExitToAppIcon sx={{ml:1,color:"blue"}}/>
          </Fab>
          :
          <Fab variant="extended" color={"danger"} onClick={(e)=>handleSignin(e)}>
            Contact <ExitToAppIcon sx={{ml:1,color:"blue"}}/>
          </Fab>}
          </Stack>
          </Stack>

          :

            <Stack direction="column">
          <Typography className={growIn ? styles.showMessage : styles.noMessage} component="h1" variant="h3">
            There seems to be a problem of your reciept.
          </Typography>
          <Typography className={growIn ? styles.showMessage : styles.noMessage} component="h1" variant="h3">
            {message}.
          </Typography>
          <Stack direction="column">
          {(getRecievedCanceled > 1 && getRecievedCanceled < 4) ?
          <Fab variant="extended" color={"danger"} onClick={(e)=>handleSignin(e)}>
            Sign back IN <ExitToAppIcon sx={{ml:1,color:"blue"}}/>
          </Fab>
          :
          <Fab variant="extended" color={"danger"} onClick={(e)=>handleSignin(e)}>
            Contact <ExitToAppIcon sx={{ml:1,color:"blue"}}/>
          </Fab>}
          </Stack>
          </Stack>
        }
      </CoverPage>
      <Container maxWidth="md">

      </Container>


    </Container >
  )
}

export default Cancelled