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
  const { callBackConfirmed, setChangePage, allCategory,setOpenGetQuote,openGetQuote,staticImage } = useContext(GeneralContext);
  const [getAQuote, setGetAQuote] = useState(false);
  const [myBool, setMyBool] = useState('false');
  const [getCheckoutPrices, setGetCheckoutPrices] = useState({loaded:false,data:[]});
  const display = (getAQuote && openGetQuote ) && !callBackConfirmed ? "block" : "none";
  const coffee = `${staticImage}/images/coffee1.JPG`;
 

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
  },[allCategory.loaded,allCategory.data]);
  
  const handleHover = () => {

    setMyBool('true');
    setTimeout(() => {
      setMyBool('false');
    }, 1500)
  }
  const handleRequestAQuote = (e) => {
    e.preventDefault();
    if(openGetQuote===false){setGetAQuote(false)}
    if ((getAQuote || openGetQuote) === false ) {
      setGetAQuote(true)
      setOpenGetQuote(true)
      setTimeout(() => {
        MyRef.current.style.animation = "slideInQuote 1.5s ease-in-out";
      }, 0);
    } else { setGetAQuote(false);setOpenGetQuote(false) }
  }
  const handleGoToWorks = (e) => {
    e.preventDefault();
    navigate("/works", setChangePage(true))
  }

  const handleLinkToPricing=(e)=>{
    e.preventDefault();
    navigate("/prices",setChangePage(true))
  }
const handleCalculator=(e)=>{
  e.preventDefault();
    navigate("/calculate",setChangePage(true))
}
  return (
    <Container component="div" maxWidth={"xl"}
      sx={{ margin: "1rem auto",position:"relative",padding:"1rem",paddingTop:"2rem",
    background:theme.palette.primary.lighter
    }}
    >
      <Grid container direction={"row"} spacing={{ md: 2, sm: 1, xs: 0 }}
        sx={{
          backgroundColor:"white",
          padding: "0.5rem", margin: "2rem auto", display: "flex",boxShadow:`1px 1px 8px 3px ${theme.palette.common.light}`, flexGrow: 1,

        }}
      >
        <Grid item xs={12} md={3} >
          <Typography componet="h1" variant={"h4"} onMouseOver={() => handleHover()}
            sx={{ fontFamily: "Roboto", fontWeight: "bold", position: "relative", cursor: "pointer", borberRight: "1px solid black",margin:"2rem auto" }}
          >
             Ready to get Started
             <Box sx={{display:{xs:"none",sm:"block"}}}><Checked bool={myBool} /></Box>
          </Typography>
          
          
          <GlobalBox>
          <Typography component="h1" variant="h6" sx={{color:"red",fontWeight:"bold"}}>Get a Quote!</Typography>
            <Typography componet="h1" variant={"body2"} sx={{ fontSize: "18px", display: "flex",position:"relative" }}>
              
              If it's complicated, we can help.
              
            </Typography>
            <Fab variant="extended" color='primary' onClick={(e) => handleRequestAQuote(e)} sx={{ marginLeft: "3rem", marginTop: "1rem" ,margin:"1rem auto"}}>
                Get a Quote 
                {(getAQuote && openGetQuote) ? <ArrowDownwardIcon sx={{ ml: 2 }} />
                  :
                  <ArrowUpwardIcon sx={{ ml: 2 }} />}
              </Fab>
          </GlobalBox>
        </Grid>
        <Grid item xs={12} md={3}
        sx={{backgroundImage:`url(${coffee})`,backgroundSize:"100% 100%",}}
        >
          <Typography component="h1" variant={"h4"} onMouseOver={() => handleHover()}
            sx={{ fontFamily: "Roboto", fontWeight: "bold", position: "relative", cursor: "pointer", borberRight: "1px solid black",margin:"2rem auto",background:"rgba(255,255,255,0.6)",padding:"0.5rem" }}
          >
            <Checked bool={myBool} />
             Calculate your cost with Coffee Calculator
             
          </Typography>
          
          
          <GlobalBox>
              <Fab variant="extended" color='warning' onClick={(e) => handleCalculator(e)} sx={{ marginLeft: "3rem", marginTop: "1rem",margin:{xs:"1rem auto"} }}>
                Calculate 
                 <CallMissedOutgoingIcon sx={{ ml: 2,mr:3 }} />
              </Fab>
              
          </GlobalBox>
        </Grid>
        <Grid item xs={12} md={3}
          sx={{ textAlign: "justify", padding: "0 10px", position: "relative",margin:"1rem auto" }}
        >
          <GlobalBox>
            <Typography component="h1" variant="h3" sx={{textAlign:'center',color:theme.palette.common.blueGrey}}>Designs</Typography>
            <Typography componet="h1" variant={"h4"} onMouseOver={() => handleHover()} sx={{
              fontSize: { xs: "25px", sm: "auto" }, display: "flex", flexDirection: "column", fontFamily: "Roboto", fontWeight: "bold", position: "relative", cursor: "pointer",
            }}>
              Checkout Our Designs to give you insight on what we can do for you.

              <Fab variant="extended" color='secondary' onClick={(e) => handleGoToWorks(e)} sx={{ marginLeft: "3rem", marginTop: "1rem", color: "white" }}>
                Go to Designs 

                <EastIcon />
                <Checked bool={myBool} />
              </Fab>
              
            </Typography>
          </GlobalBox>
        </Grid>
        <Grid item xs={12} md={3}
          sx={{
            textAlign: "justify", borderLeft: "1px solid black", padding: "0 10px",
            "&:hover": { content: `"${getCheckoutPrices.loaded && getCheckoutPrices.data.summary}"` },margin:"1rem auto"
          }}
        >
          <Typography component="h1" variant="h3" sx={{textAlign:'center',color:theme.palette.common.blueGrey}}>Prices</Typography>
          <GlobalBox>
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
          </GlobalBox>
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