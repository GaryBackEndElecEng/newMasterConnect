import React from 'react';
import {Typography} from '@mui/material';
// import styles from "./home.module.css";
import styled from 'styled-components';

const HonorTypo=styled(Typography)`
margin:0;
width:100%;
opacity:${({opacity})=>opacity};
font-family: var(--font-family);
justify-content:flex-start;
align-items:center;
flex-direction:row;
display:flex;
flex-wrap:wrap;
gap:0px;
transition: all 1.75s ease-in;
@media screen and (max-width:900px){
    transition:all 1s ease-in;
}
@media screen and (max-width:600px){
    transition:all 2.2s ease-in;
}
`;
const MasterSpan=styled.span`
opacity:${({opacity})=>opacity};
margin:auto;
align-self:center;
font-family: var(--font-family);
background-image: var(--background-image-1-left_1);
background-size:150% 100%;
-webkit-background-clip: text;
-moz-background-clip: text;
background-clip: text;
color: transparent;
margin-bottom:0.62rem;
font-size:300%;
animation:moveAlways2 30s linear infinite reverse;
@keyframes moveAlways2 {
    0% {background-position:0% 50%;}
    50% {background-position:150% 50%;}
    100% {background-position:0% 50%;}
  }

@media screen and (max-width:600px){
    font-size:200%;
}
`;
const ConnectingSpan =styled.span`
transform:translateX(${({translatex})=>translatex});
opacity:${({opacity})=>opacity};
transition:all 2.5s ease-in;
`;

const ConnectingYou = ({sizeLet2}) => {
    const masterRef=React.useRef(null);
    const [openMaster,setOpenMaster]=React.useState(null);
    const threshold=window.innerWidth <600 ? 0.2:0.8;
    React.useEffect(()=>{
const observer=new IntersectionObserver(entries=>{
    let entry=entries[0];
    
    if(entry.isIntersecting){
        setOpenMaster(true);
    }
},{threshold:threshold});
    if(masterRef.current){
        observer.observe(masterRef.current);
    }
    },[]);

    
  return (
    <HonorTypo
     component="h1"
     variant={sizeLet2}
     opacity={openMaster ? "1":"0"}
    ref={masterRef}
    >
    <MasterSpan
    opacity={openMaster ? "1":"0"}
     >
    Masterconnect
     </MasterSpan>
     <ConnectingSpan
     translatex={openMaster ? "0%":"-20%"}
     opacity={openMaster ? "1":"0"}
     > 
     - connecting you is what we do.
     </ConnectingSpan>
    </HonorTypo>
    
  )
}

export default ConnectingYou