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

const Integrity = ({sizeLet2,obj}) => {
    const integrityRef=React.useRef(null);
    const [openIntegrity,setOpenIntegrity]=React.useState(null);
    const threshold=window.innerWidth <600 ? 0.2:0.8;
    React.useEffect(()=>{
const observer=new IntersectionObserver(entries=>{
    let entry=entries[0];
    
    if(entry.isIntersecting){
        setOpenIntegrity(true);
    }
},{threshold:threshold});
    if(integrityRef.current){
        observer.observe(integrityRef.current);
    }
    },[]);

    
  return (
    <CustBox
    opacity={openIntegrity ? "1":"0"}
    translatey={openIntegrity ? "0%":"-30%"}
    ref={integrityRef}
    >
    <HonorTypo
     component="h1"
     variant={sizeLet2}
     translatex={openIntegrity ? "0%":"10%"}
    >
    <span className={styles.fontStyle}>{obj.letter}</span>{obj.name}
    </HonorTypo>
    <Typography component="h1" variant={sizeLet2} style={{width:"100%"}}>
    {obj.desc}
    </Typography>
    </CustBox>
  )
}

export default Integrity