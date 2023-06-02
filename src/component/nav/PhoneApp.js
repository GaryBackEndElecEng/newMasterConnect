import React from 'react';
import {GeneralContext} from '../../context/GeneralContextProvider';
import {Typography,Box,Stack} from '@mui/material';
import styled from 'styled-components';


const CustStackPhone = styled(Stack)`
margin:auto;
position:relative;
justify-content:center;
align-items:center;
max-width:125px;
max-height:125px;
cursor:pointer;
@media screen and (max-width:600px){
    max-width:100px;
max-height:100px;
}
`;
const CustImage = styled.img`
margin:auto;
width:100%;
height:100%;
position:absolute;
inset:0;
z-index:0;
`;




const PhoneApp = () => {
    
    const {staticImage,getPhoneApp}=React.useContext(GeneralContext);
    const logo=`${staticImage}/logo.png`;

    const handleApp=(e)=>{
        if(getPhoneApp.loaded){
        window.open(getPhoneApp.obj.image)
        
        }
    }
   
  return (
    <CustStackPhone direction="column" 
    onClick={(e)=>handleApp(e)}
    >

    <Typography component="h1" variant={"h5"}sx={{background:"rgba(0,0,0,0.2)",zIndex:"1"}}>Download</Typography>
    <Typography component="h1" variant={"h6"}sx={{background:"rgba(0,0,0,0.2)",zIndex:"1"}}>app</Typography>
    <CustImage
    src={logo} alt="www.masterconnect.ca"
    />
    
    
    </CustStackPhone>
  )
}

export default PhoneApp