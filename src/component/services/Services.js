import React from "react";
import { GeneralContext } from "../../context/GeneralContextProvider";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {  Typography, Container, Grid, Box, CardMedia, Stack, Fab } from "@mui/material";
import styles from "./services.module.css";
import serviceObj from "./serviceArr";
import ServiceItem from './ServiceItem';
import StarProjContact from './StarProjContact';
import FAQS from './FAQS';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const CustService=styled.div.attrs({className:"container-fluid"})`
margin:auto;
background:var( --background-111);
justify-content:center;
align-items:center;
flex-direction:column;
place-items:center;
padding-bottom:5vh;
animation:appearIn 1.5s ease-in-out;
@keyframes appearIn { 
  from {opacity:0;}
  to {opacity:1;}
}
`;

const CustImgSeal=styled(CardMedia)`
margin:auto;
width:100%;
filter:saturate(2);
opacity:${({opacity})=>opacity };
animation:${({animation})=>animation};
@keyframes startSeal {
  from {opacity:0;transform:scaleY(0);filter:saturate(0.5);}
  to {opacity:1;transform:scaleY(1);filter:saturate(2);}
}
// @keyframes removeSeal {
//   from {opacity:1;height:50%;width:100%}
//   to {opacity:0;height:0;width:0}
// }

`;


const Services = () => {
  const {staticImage}=React.useContext(GeneralContext);
  const seal=`${staticImage}/seal.PNG`;
  const connection=`${staticImage}/extra/connection2Effect.png`;
  const [arr, setArr] = React.useState({ loaded: false, data: {} });
  const [textSize, setTextSize] = React.useState("h1");
  const [getWidth,setGetWidth]=React.useState(null);
  const [servStart,setServStart]=React.useState(null);
  const [more,setMore]=React.useState(null);
  const [openFAQS,setOpenFAQS]=React.useState(null);

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
    },3000);
  },[]);
  const handleMore=()=>{
      setMore(true);
  }

 

  return (
    <CustService
    className={styles.backgroundMain}
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
                  <Grid item xs={12} sm={12} md={4}
                  sx={{position:"relative",isolation:"isolate"}}
                  className={ servStart ? styles.childGridSeal :styles.hide}
                  >
                    
                    <CustImgSeal 
                    opacity={servStart ? "1":"0"}
                    animation={servStart ? "startSeal 2s ease-in-out" : ""}
                    component="img"
                     src={seal} 
                    alt="www.masterconnect.ca" height={"400px"}
                     style={{width:"100%",padding:"1rem"}} 
                     className={styles.custImgSeal}
                    />
                  
                  </Grid>
                  <Grid item xs={12} sm={12} md={8} className={styles.ourSpeciality} sx={{padding:"1rem"}}>
                    <Typography component="h1" variant="h5" sx={{color:"white",fontFamily:"var(--font-family)"}}>
                    {arr.data.subname2}
                    </Typography>
                    {arr.data.desc.map(((obj,index)=>(
                    <Box key={index}>
                    {
                      !more ? 
                      (
                  
                        <Typography
                          component="h2"
                          variant="h5"
                          sx={{ margin: "5rem auto",color:"white",paddingLeft:{sm:"10px",md:"auto",xs:"5px"},paddingRight:{sm:"10px",md:"auto",xs:"5px"},fontFamily:"var(--font-family)" }}
                        >
                          {obj.slice(0,100)}...
                          <span onClick={()=>handleMore()}
                          style={{color:"blue",textDecoration:"underline",fontSize:"26px",cursor:"pointer"}}
                          >more</span>
                          </Typography>
                          )
                      :
                      (
                        <Typography
                        component="h2"
                        variant="h5"
                        sx={{ margin: "5rem auto",color:"white",paddingLeft:{sm:"10px",md:"auto",xs:"5px"},paddingRight:{sm:"10px",md:"auto",xs:"5px"},fontFamily:"var(--font-family)" }}
                        className={styles.servIntro}
                      >
                        {obj}
                        </Typography>
                  

                      )
                    }
                    </Box>
                    )))
                  }
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
      <Stack direction="column" sx={{width:"100%",justifyContent:"center",alignItems:"center",margin:"2rem auto"}}>
        <div className={styles.hr_line}/>
          {!openFAQS ?
          <Fab color="secondary" size="large" variant="extended" onClick={(e)=>setOpenFAQS(true)}>
              See FAQS? <ArrowDropUpIcon sx={{ml:1,color:"white"}}/>
          </Fab>
          :
          <Fab color="primary" size="large" variant="extended" onClick={(e)=>setOpenFAQS(null)}>
              hide FAQS? <ArrowDropDownIcon sx={{ml:1,color:"white"}}/>
          </Fab>
            }
      </Stack>
      { openFAQS && 
        <div
      className={ openFAQS ? styles.openFAQSOpen : styles.openFAQSClose}
      >
      <FAQS getWidth={getWidth} />
      </div>
      }
     
      <div style={{margin:"2rem auto"}}>

      <StarProjContact getWidth={getWidth}/>
      </div>
    </CustService>
  );
};

export default Services;
