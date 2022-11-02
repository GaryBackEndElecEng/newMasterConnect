import React, { useContext, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import { Box, Container, Fab, Grid, Stack, Typography } from '@mui/material';
import styled from 'styled-components';
import styles from './about.module.css'
// import api from '../axios/api';
import GetAQuote from './GetAQuote';
import CallBackRequest from './CallBackRequest';
import Checked from './Checked';
import EastIcon from '@mui/icons-material/East';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import { useEffect } from 'react';

const GlobalBox = styled(Box)`
margin:auto;
position:relative;
display: "flex";
justify-content: "flex-start";
align-items: "center";
flex-direction: "column";
padding: "0.5rem";
width: "100%";
height:"auto";
`;
const CustDiv = styled.div`
display:block;
position:relative;
width:100%;
animation:slideInQuote ease-in-out;
@keyframes slideInQuote {
  from {opacity:0;
      transform:translateX(-20%);
  }
  to{opacity:1;transform:translateX(0%);}
  }
  @media screen and (max-width:600px){
    box-shadow:1px 1px 8px 5px grey;
  }
`;

const CheckOutStuffQuote = () => {
  const theme = useTheme();
  const MyRef = useRef();
  const navigate = useNavigate();
  const { callBackConfirmed, setChangePage, allCategory } = useContext(GeneralContext);
  const [getAQuote, setGetAQuote] = useState(false);
  const [myBool, setMyBool] = useState('false');
  const [getCheckoutPrices, setGetCheckoutPrices] = useState({loaded:false,data:[]});
  const display = getAQuote && !callBackConfirmed ? "block" : "none";
 

  useEffect(()=>{
    const getPrices= async ()=>{
      try {
        let allCatTemp= await allCategory.data.filter(obj => (parseInt(obj.id) === 11))[0].categories[0]
        let allCatTemp1=allCatTemp;
        setGetCheckoutPrices({loaded:true,data:allCatTemp1})
      } catch (error) {
        
      }
    }
    if(allCategory.loaded && allCategory?.data){
      getPrices();
    }
  },[allCategory.loaded]);
  
  const handleHover = () => {

    setMyBool('true');
    setTimeout(() => {
      setMyBool('false');
    }, 1500)
  }
  const handleRequestAQuote = (e) => {
    e.preventDefault();
    if (getAQuote === false) {
      setGetAQuote(true)
      setTimeout(() => {
        MyRef.current.style.animation = "slideInQuote 1.5s ease-in-out";
      }, 0);
    } else { setGetAQuote(false) }
  }
  const handleGoToWorks = (e) => {
    e.preventDefault();
    navigate("/works", setChangePage(true))
  }

  const handleLinkToPricing=(e)=>{
    e.preventDefault();
    navigate("/prices",setChangePage(true))
  }

  return (
    <Container component="div" maxWidth={"xl"}
      sx={{ margin: "1rem auto" }}
    >
      <Grid container direction={"row"} spacing={{ md: 2, sm: 1, xs: 0 }}
        sx={{
          backgroundColor: theme.palette.secondary.light,
          padding: "10px", margin: "1rem auto"
        }}
      >
        <Grid item xs={12} md={4} >
          <Typography componet="h1" variant={"h4"} onMouseOver={() => handleHover()}
            sx={{ fontFamily: "Roboto", fontWeight: "bold", position: "relative", cursor: "pointer", borberRight: "1px solid black",margin:"2rem auto" }}
          >
             Ready to get Started
             <Box sx={{display:{xs:"none",sm:"block"}}}><Checked bool={myBool} /></Box>
          </Typography>
          
          
          <GlobalBox>
            <Typography componet="h1" variant={"body2"} sx={{ fontSize: "18px", display: "flex",position:"relative" }}>
              Get a Quote:
              <Fab variant="extended" color='primary' onClick={(e) => handleRequestAQuote(e)} sx={{ marginLeft: "3rem", marginTop: "1rem" }}>
                Get a Quote 
                {getAQuote ? <ArrowDownwardIcon sx={{ ml: 2 }} />
                  :
                  <ArrowUpwardIcon sx={{ ml: 2 }} />}
              </Fab>
              
            </Typography>
          </GlobalBox>
        </Grid>
        <Grid item xs={12} md={4}
          sx={{ textAlign: "justify", padding: "0 10px", position: "relative",margin:"1rem auto" }}
        >
          <GlobalBox>
            
            <Typography componet="h1" variant={"h4"} onMouseOver={() => handleHover()} sx={{
              fontSize: { xs: "25px", sm: "auto" }, display: "flex", flexDirection: "column", fontFamily: "Roboto", fontWeight: "bold", position: "relative", cursor: "pointer",
            }}>
              Checkout Our Works

              <Fab variant="extended" color='secondary' onClick={(e) => handleGoToWorks(e)} sx={{ marginLeft: "3rem", marginTop: "1rem", color: "white" }}>
                Go to Works 

                <EastIcon />
              </Fab>
              <Checked bool={myBool} />
            </Typography>
          </GlobalBox>
        </Grid>
        <Grid item xs={12} md={4}
          sx={{
            textAlign: "justify", borderLeft: "1px solid black", padding: "0 10px",
            "&:hover": { content: `"${getCheckoutPrices.loaded && getCheckoutPrices.data.summary}"` },margin:"1rem auto"
          }}
        >
          <Stack direction={{sm:"row",xs:"column"}} spacing={{xs:0,sm:1,md:2}}>
              <Typography component="h1" variant="h4"
                sx={{
                  fontFamily: "Roboto", fontWeight: "bold", position: "relative", cursor: "pointer",
                  fontSize: { xs: "25px", sm: "auto" }
                }}
                onMouseOver={() => handleHover()}
              >

                {getCheckoutPrices.loaded && getCheckoutPrices.data.title}
                
              </Typography>
              <Fab variant="extended" color="primary" onClick={(e)=>handleLinkToPricing(e)}
              sx={{marginLeft:{xs:"10px",sm:"1rem",md:"10px"},margin:"1rem auto"}}
              >
                pricing <CallMissedOutgoingIcon sx={{ml:1,color:"red"}}/>
              </Fab>
              <Checked bool={myBool} />
          </Stack>
          <Typography component="h1" variant="h6">
            {getCheckoutPrices.loaded && getCheckoutPrices.data.content}
          </Typography>

        </Grid>


      </Grid>
      
        <CustDiv ref={MyRef} style={{ display: display }}>
          <GetAQuote />
          <Typography component="h1" variant="h4" className={styles.msg} sx={{ fontSize: { xs: "18px", sm: "30px" } }}>"Connection starts with communication"</Typography>
        </CustDiv>
      
      {callBackConfirmed && <CallBackRequest />}
    </Container>
  )
}

export default CheckOutStuffQuote