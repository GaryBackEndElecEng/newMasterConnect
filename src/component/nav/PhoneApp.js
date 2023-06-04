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
animation: ${({animation})=>animation};
@keyframes turnRotate {
  from {transform: rotate(360deg);}
  to {transform: rotate(0deg);}
}
`;




const PhoneApp = () => {
    
    const {staticImage,getPhoneApp}=React.useContext(GeneralContext);
    const phoneRef=React.useRef(null);
    const logo=`${staticImage}/logo.png`;
    const [turn,setTurn]=React.useState(null);

    React.useEffect(()=>{
      const observer = new IntersectionObserver(entries=>{
        let entry= entries[0];
        if(entry.isIntersecting){
          setTurn(true);
        }
      },{threshold:1});
      if(phoneRef.current){
        observer.observe(phoneRef.current);
        return ()=>observer.disconnect();
      }
    },[]);

    const handleApp=(e)=>{
        if(getPhoneApp.loaded){
        window.open(getPhoneApp.obj.image)
        
        }
    }
   
  return (
    <CustStackPhone direction="column" 
    onClick={(e)=>handleApp(e)}
    ref={phoneRef}
    >

    <Typography component="h1" variant={"h5"}sx={{background:"rgba(0,0,0,0.2)",zIndex:"1"}}>Download</Typography>
    <Typography component="h1" variant={"h6"}sx={{background:"rgba(0,0,0,0.2)",zIndex:"1"}}>app</Typography>
    <CustImage
    src={logo} alt="www.masterconnect.ca"
    animation={turn ? "turnRotate 5s ease-in-out" : ""}
    />
    
    
    </CustStackPhone>
  )
}

export default PhoneApp