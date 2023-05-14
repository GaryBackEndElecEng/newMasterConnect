import React from 'react';
import {Typography,Box} from '@mui/material';
import styles from "./home.module.css";
import styled from 'styled-components';

const CustBox = styled(Box)`
margin:auto;
opacity:${({opacity})=>opacity};
transform:translateY(${({translatey})=>translatey});
transition:all 1.75s ease-in;
width:100%;


@media screen and (max-width:900px){
    transition:all 1s ease-in;
}
@media screen and (max-width:600px){
    transition:all 2.2s ease-in;
}
`;

const HonorTypo=styled(Typography)`
margin:auto;
padding-inline:0.5rem;
transform:translateX(${({translatex})=>translatex});
transition: all 1.75s ease-in;
@media screen and (max-width:900px){
    transition:all 1s ease-in;
}
@media screen and (max-width:600px){
    transition:all 2.2s ease-in;
}
`;

const Unity = ({sizeLet2}) => {
    const unityRef=React.useRef(null);
    const [openUnity,setOpenUnity]=React.useState(null);
    const threshold=window.innerWidth <600 ? 0.2:0.8;
    React.useEffect(()=>{
const observer=new IntersectionObserver(entries=>{
    let entry=entries[0];
    
    if(entry.isIntersecting){
        setOpenUnity(true);
    }
},{threshold:threshold});
    if(unityRef.current){
        observer.observe(unityRef.current);
    }
    },[]);

    
  return (
    <CustBox
    opacity={openUnity ? "1":"0"}
    translatey={openUnity ? "0%":"-30%"}
    ref={unityRef}
    >
    <HonorTypo
     component="h1"
     variant={sizeLet2}
     translatex={openUnity ? "0%":"10%"}
    >
     <span className={styles.fontStyle}>U</span>nity
    </HonorTypo>
    <Typography component="h1" variant={sizeLet2} style={{width:"100%"}}>
    Understanding who your are, requires communication discoveries. With united talk, the act, allows us to design with uniqueness to meet your needs.
    </Typography>
    </CustBox>
  )
}

export default Unity