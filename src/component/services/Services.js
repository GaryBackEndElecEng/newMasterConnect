import React from "react";
import { GeneralContext } from "../../context/GeneralContextProvider";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {  Typography, Container, Grid, Box, CardMedia } from "@mui/material";
import styles from "./services.module.css";
import serviceObj from "./serviceArr";
import ServiceItem from './ServiceItem';
import StarProjContact from './StarProjContact';
import FAQS from './FAQS';

const CustImgSeal=styled(CardMedia)`
margin:auto;
width:${({width})=>width };
opacity:${({opacity})=>opacity };
height:${({height1})=>height1 };
animation:${({animation})=>animation};
@keyframes startSeal {
  from {opacity:0;}
  to {opacity:1;}
}
@keyframes removeSeal {
  from {opacity:1;height:50%;width:100%}
  to {opacity:0;height:0;width:0}
}

`;
const CustImgConnection=styled(CardMedia)`
margin:auto;
width:${({width})=>width};
opacity:${({opacity})=>opacity };
height:${({height1})=>height1};
animation:${({animation})=>animation};

@keyframes connection {
  from {opacity:0;transform:translateX(-63%);height:0;width:0%;}
  to {opacity:1;transform:translateX(0%);height:100%;width:100%;}
}
@media screen and (max-width:600px){
  width:${({widthxs})=>widthxs};
  
}
`;

const Services = () => {
  const {staticImage}=React.useContext(GeneralContext);
  const seal=`${staticImage}/seal.PNG`;
  const connection=`${staticImage}/extra/connection2Effect.png`;
  const [arr, setArr] = React.useState({ loaded: false, data: {} });
  const [textSize, setTextSize] = React.useState("h1");
  const [getWidth,setGetWidth]=React.useState(null);
  const [servStart,setServStart]=React.useState(null);

  React.useEffect(() => {
    setArr({ loaded: true, data: serviceObj });
    if (window.innerWidth < 900) {
      setTextSize("h2");
    } else if (window.innerWidth < 600) {
      setTextSize("h3");
    } else {
      setTextSize("h1");
    }
  }, []);
  React.useEffect(()=>{
    if(window.scrollY){
      window.scroll(0,0);
    }
    setGetWidth(window.innerWidth);
    setTimeout(()=>{
      setServStart(true);
    },6000);
  },[]);

  return (
    <div
      style={{ background: "var( --background-111)", marginTop: "0px",margin:"auto 0px" }}
      className={`container-fluid ${styles.backgroundMain}`}
    >
      <Container maxWidth="xl">
        <Box
          className={styles.alignColunm}
          
        >
          {arr.loaded &&
        
              <Box sx={{marginTop:"10vh",padding:"auto 10px",marginRight:{xs:"auto",sm:"auto"}}}>
                <Box style={{ margin: {md:" 2vh auto",xs:"auto"},overflow:"hidden", }}>
                  <Typography component="h1" variant="h5" >
                   {arr.data.subname}
                  </Typography>
                  <p className={styles.title}>{arr.data.name}</p>
                </Box>
                <Grid
                  container
                  spacing={0}
                  sx={{
                    margin:{xs: "auto 0",},
                    alignSelf: "center",
                    justifySelf: "flex-start",
                    alignItems:"center",
                    width:{xs: "100%",sm:"100%"},
                    paddingInline:{xs:1}
                   
                  }}
                >
                  <Grid item xs={12} sm={12} md={4} >
                    
                    <CustImgConnection 
                    servstart={servStart}
                    width={servStart ? "100%":"0%"}
                    widthxs={servStart ? "90%":"0%"}
                    opacity={servStart ? "1":"0"}
                    height1={servStart ? "100%":"0"}
                    animation={servStart ? "connection 2s ease-in-out":"" }
                     component="img"
                     src={connection}
                     alt="www.masterconnect.ca" 
                    height={"400px"} 
                    sx={{width:{md:"100%",xs:"100%"},padding:"1rem"}}
                     />
                    
                    <CustImgSeal 
                    width={servStart ? "0":"100%"}
                    opacity={servStart ? "0":"1"}
                    height1={servStart ? "0":"100%"}
                    animation={servStart ? "removeSeal 2s ease-in-out" : "startSeal 2s ease-in-out"}
                    component="img"
                     src={seal} 
                    alt="www.masterconnect.ca" height={"400px"}
                     sx={{width:{md:"100%",xs:"100%"},padding:"1rem"}} 
                    />
                  
                  </Grid>
                  <Grid item xs={12} sm={12} md={8} className={styles.ourSpeciality} sx={{padding:"1rem"}}>
                    <Typography component="h1" variant="h5" sx={{color:"white",fontFamily:"var(--font-family)"}}>
                    {arr.data.subname2}
                    </Typography>
                    {arr.data.desc.map(((obj,index)=>(
                    <Box key={index}>
                    <Typography
                      component="h2"
                      variant="h5"
                      sx={{ margin: "5rem auto",color:"white",paddingLeft:{sm:"10px",md:"auto",xs:"5px"},paddingRight:{sm:"10px",md:"auto",xs:"5px"},fontFamily:"var(--font-family)" }}
                    >
                      {obj}
                    </Typography>
                    </Box>
                    )))}
                  </Grid>
                  <Grid item xs={0} sm={5}>
                    <Box sx={{ width: "100%" }}></Box>
                  </Grid>
                </Grid>
                { arr.data.items.map((obj,index)=>(
                  <Box  key={`${obj.id}--items--${index}`}>
                <ServiceItem obj={obj}/>
                </Box>
                ))}
              </Box>
            }
        </Box>
      </Container>
      <FAQS getWidth={getWidth} />
      <div style={{margin:"2rem auto"}}>

      <StarProjContact getWidth={getWidth}/>
      </div>
    </div>
  );
};

export default Services;
