import React, { useContext, useEffect, useState, useRef } from 'react'

import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import { Box,  Paper, Typography } from '@mui/material';
import styled from 'styled-components';
import {  ContainerAboutFront, ContainerAboutFront2 } from '../../styled/Container.styled';
// import { loadGoogleFont as googleFont } from '../utils/loadGoogleFont';
import RegisterPage from '../RegisterPage';
import CheckOutStuffQuote from './CheckOutStuffQuote';
// import styles from './about.module.css'
import { Container } from '@mui/system';
import DottedWorld from './DottedWorld';
import Stripe1 from './Stripe1';
import GetRegisterPages from '../utils/GetRegisterPages';
import AboutHelmet from './AboutHelmet';
import MyAccountDesc from './MyAccountDesc';
var preCount = 0;

const ContainerAboutFluid=styled.div.attrs({className:" container-fluid "})`
width:100vw;
position:relative;
margin:0;
// margin-top:4rem;
padding:10px;
display:flex;
flex-direction:column;
align-items:space-between;
justify-content:center;
overflow:hidden;
animation: clearIn 1s ease-in-out;
@keyframes clearIn {
  from {opacity:0;}
  to {opacity:1;}
}

@media screen and (max-width:900px){
   margin-top:0;
}
@media screen and (max-width:600px){
   margin-top:-50px;
}

`;

const GlobalBox = styled(Box)`
margin:auto;
display: "flex";
justify-content: "flex-start";
align-items: "center";
flex-direction: "column";
padding: "0.5rem";
width: "100%";
height:"auto";
`;


const About = () => {
  const theme = useTheme();
  const { setTitle, setStyleName,allCategory,setChangePage,generalInfo,conical,getPathLocation } = useContext(GeneralContext);
  const [about,setAbout]=useState([]);
  const [counter, setCounter] = useState(0);
  const [allcatHelmet,setAllcatHelmet]=useState([]);
  const scrollRef = useRef(null);
 const missionContent= about.length>0 && about.filter(obj=>(obj.title==="Mission")) ? about.filter(obj=>(obj.title==="Mission"))[0] : null;
 const Fact = about.length>0 && about.filter(obj=>(obj.title==="Fact")) ? about.filter(obj=>(obj.title==="Fact"))[0]:null;
 const getGeneralInfo = generalInfo.loaded ? generalInfo.data:null;
  
useEffect(()=>{
  if(allCategory.loaded){
  const getData=allCategory.data.filter(obj=>(obj.section==="about"))[0].categories
  // console.log(getData)
  setAllcatHelmet(getData)
      if(getData){
        let newArr=[];
        getData.forEach((obj,index)=>{
          newArr.push({...obj,id:index})
        });
        return setAbout(newArr)
      }
  
  
  }
},[allCategory.loaded,allCategory.data]);

// console.log(about)

  useEffect(() => {
    setTimeout(() => {
      setCounter(incPreCount());
      // if(window.scrollY===800){
      // incPreCount();
      // }
    }, 0)
    function incPreCount() {
      if (preCount < 361) {
        return preCount++
      } else { return preCount = 0 }
    }
  }, [])

  useEffect(() => {
    setTitle("About Us");
    setStyleName("Who We Are");
    setChangePage(false);
    if(window.scrollY){
      window.scroll(0,0);
      
  }
  }, [setTitle,setStyleName,setChangePage]);

 
  return (
    <ContainerAboutFluid>
      <AboutHelmet categories={allcatHelmet} getGeneralInfo={getGeneralInfo}  getPathLocation={getPathLocation.loaded ? getPathLocation.data :""}/>
      <RegisterPage/>
      <GetRegisterPages/>
      <ContainerAboutFront
        alpha={counter}
      >
      </ContainerAboutFront>
      <Container component="div" max-width="xl">
        <Paper component="div"
          elevation={10}
          sx={{
            margin: "auto",
            display: "flex", jusitifyContent: "center",
            alignItems: "center",
            flexDirection: "column", justifyContent: "center",
            padding: "10px", width: "100%",
          }}
        >
          <Typography component="h1" variant="h3" sx={{ fontFamily: "Playfair Display", fontStyle: "italic", margin: "auto" }}>Mission</Typography>
          <Typography component="h1" variant="body2" sx={{ fontFamily: "Roboto", fontSize: "20px", margin: "auto" }}>
            {missionContent !==null && missionContent["content"]}
          </Typography>
        </Paper>
      </Container>
      <Container maxWidth="xl" component="div"
        sx={{
          position: "relative", margin: "6rem auto", display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column",

        }}
      ><Paper component="div" elevation={5}
        sx={{
          width: "100%", borderRadius: "3%",
          background: theme.palette.common.transparent,
          display: "flex", jusitifyContent: "center",
          alignItems: "center",
          flexDirection: "column", justifyContent: "center",
          padding: "10px", margin: "auto"
        }}>
          <Box component="div" sx={{
            width: "100%", height: "50vh", margin: "auto", position: "relative"

          }}
          >
            <DottedWorld count={counter} Fact={Fact} />
          </Box>
        </Paper>
        
      </Container>
      <ContainerAboutFront2
        alpha={counter}
      ></ContainerAboutFront2>

      <Container maxWidth="xl"
        sx={{
          position: "relative", margin: { xs: "7rem auto", sm: "auto" }, display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column", width: "100%", marginBottom: { xs: "1rem", sm: "3rem" }

        }}
      >
        <GlobalBox ref={scrollRef}
          sx={{
            alignSelf: "flex-end", justifySelf: "flex-start",
            width: "100%", height: "auto",
            position: "relative",
            boxShadow: `1px 2px 3px  ${theme.palette.common.dark}`,
            borderRadius: "2%",
            background: { sm: theme.palette.common.background2, xs: theme.palette.common.dark },
            marginBottom: { xs: "1rem", sm: "auto" }, margin: { xs: "2rem auto", sm: "auto" }
          }}
        >
          <Stripe1 scrollRef={scrollRef} />
        </GlobalBox>
      </Container>
      <MyAccountDesc />
      <CheckOutStuffQuote/>
    </ContainerAboutFluid>
  )
}

export default About
