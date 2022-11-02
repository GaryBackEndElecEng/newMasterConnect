import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import { Stack,Typography, Grid, Container, Paper,Fab } from '@mui/material';
import { ContainerHomeFluid } from '../../styled/Container.styled';
import ImputForm from './ImputForm';
import ServiceList from './ServiceList';
import DrawSignature from './DrawSignature';
import DynamicInfo from './DynamicInfo';
import WhyWorkWithUs from './WhyWorkWithUs';
import ContactInfo from './ContactInfo';
import HowCanAssist from './HowCanAssist';
import ClickToSeeSvc from './ClickToSeeSvc';
import OurServices from './OurServices';
import RegisterPage from '../RegisterPage';
import GetRegisterPages from '../utils/GetRegisterPages';
import Styles from './contact.module.css';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import ContactHelmet from './ContactHelmet'

const DivEffect = styled.div`
margin:auto;
height:13vh;
background:${({bg})=>bg};
z-index:${({zIndex})=>zIndex};
animation: moveAppear 4s ease-in;
@keyframes moveAppear {
  from { opacity:0;height:0vh;}
  to { opacity:1;height:13vh;}
}
@media screen and (max-width:900px){
  height:24vh;
  @keyframes moveAppear {
    from { opacity:0;height:0vh;}
    to { opacity:1;height:24vh;}
  }
}
@media screen and (max-width:600px){
height:24vh;
@keyframes moveAppear {
  from { opacity:0;height:0vh}
  to { opacity:1;height:24vh;}
}
}

@media screen and (max-width:400px){
height:29vh;
@keyframes moveAppear {
  from { opacity:0;height:0vh}
  to { opacity:1;height:29vh;}
}
}
`;
const ContainerContact = styled(ContainerHomeFluid).attrs({className:"containerContact"})`
margin:2rem auto;
margin-bottom:5rem;
background-image:url(${({ bgImage }) => bgImage});
margin-top:0vh;
position:relative;
padding:2rem auto;
padding-bottom: 2rem;
animation: clearIn 1s ease-in-out;
@keyframes clearIn {
  from {opacity:0;}
  to {opacity:1;}
}
@media screen and (max-width:600px){
 margin-top:0px;
}

`;

const Contact = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setTitle, setStyleName, turnOn, zIndex, removeText, removeApp, setRemoveApp, setCheckHeight,ourServices,staticImage} = useContext(GeneralContext);
  const [showService,setShowService]=useState(false);
  const [clickToAnim,setClickToAnim]=useState(false);
  const [ keywords,setKeywords]=useState(null);
  const [ content,setContent]=useState(null);
  const getOurServices= ourServices.loaded ? ourServices.data : null;
 
  const bgImage = `${staticImage}/contactWallpaper2.png`;

  useEffect(()=>{
    if(getOurServices){
      setKeywords(
        getOurServices.map(obj=>(obj.title))
      )
      setContent(
        getOurServices.map(obj=>(obj.content))
      )
    }
   
  },[setKeywords,getOurServices]);

  useEffect(() => {
    //Not used setTitle
    setTitle("Contact")
    setStyleName("Contact Us")
    if (removeText) {
      setCheckHeight("auto")
      setTimeout(() => {
        setRemoveApp(true);
      }, 1000)
    }
    if(window.scrollY){
      window.scroll(0,0);
    }

  }, [setTitle, setStyleName, removeText, setCheckHeight, setRemoveApp]);

  useEffect(()=>{
    setShowService(false);
  },[])

  const handleShowService=(e)=>{
      e.preventDefault();
      setShowService(true);
  }
  const handleCloseService=(e)=>{
    e.preventDefault();
    setShowService(false);
  }
 const handleOnHoverToAnim =(e)=>{
  setClickToAnim(true)
 }
 const handleOnOutToAnim =(e)=>{
  setClickToAnim(false)
 }
// console.log("removeText",removeText)
  return (
    <>
    <RegisterPage/>
    <GetRegisterPages/>
    <ContactHelmet keywords={keywords} content={content} />
      {/* AUTOMATED WELCOME //HEADER */}
      {!removeApp ?
       <DivEffect
       bg={theme.palette.common.light}
       zIndex={zIndex}
        className={removeText ? Styles.removeAppBar : Styles.showAppBar}
        >
        <Grid container spacing={3} >
          <Grid item xs={12} md={3} sx={{padding:"0.5rem"}}>
            <DrawSignature />
          </Grid>
          <Grid item xs={12} md={9} sx={{marginTop:{xs:"0",sm:"1rem"},padding:"0.5rem"}}>
            {turnOn ? <DynamicInfo /> : <></>}
          </Grid>
        </Grid>

      </DivEffect> :
          
        <HowCanAssist/>
      

      }
      {/*---- END AUTOMATED WELCOME //HEADER---- */}
      {/* CONTENT */}
      <ContainerContact className={Styles.containerContact } bgImage={bgImage}>
        <Container maxWidth="lg"
          sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: { xs: "column", sm: "column" },marginTop:{xs:"1rem",sm:"1rem"} }}
        >
          {/* ---AUTOMATED SERVICE ICON  WITH SERVICE----*/}
          <OurServices/>
          {/*------ END AUTOMATED SERVICE ICON  WITH SERVICE-----*/}
        </Container>
        
          {/* WHY WORK WITH US */}
          <WhyWorkWithUs />
          {/* END WHY WORK WITH US */}
        {/* ---CONTACT INFO---- */}
         <ContactInfo/>
         {/* --- END CONTACT INFO---- */}
        {/* IMPUT FORM */}
            <ImputForm />

            <Stack direction={"column"} sx={{fontSize:{xs:"40px",sm:"50px",margin:"1rem auto"},ml:3,position:"relative"}} onMouseOver={(e)=>handleOnHoverToAnim(e)} onMouseOut={(e)=>handleOnOutToAnim(e)}>
              See services
             
              {
               
               !showService ? 
               <>
               <KeyboardDoubleArrowUpIcon sx={{fontSize:{xs:"40px",sm:"50px"}}} key={2000} onClick={(e)=>handleShowService(e)}/>
               {clickToAnim && <ClickToSeeSvc />}
              </>
                      :
              <>
                <KeyboardDoubleArrowDownIcon key={2221} sx={{fontSize:{xs:"40px",sm:"50px"}}} onClick={(e)=>handleCloseService(e)}/>
                
                <ServiceList ourServices={ourServices}/> 
                
                <hr style={{borderBottom:`2px solid ${theme.palette.common.background}`}}/>
              </>
              }
            </Stack>
            
          


      </ContainerContact>

    </>
  )
}


export default Contact