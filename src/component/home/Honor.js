import React from 'react';
import {Typography,Box} from '@mui/material';
import styles from "./home.module.css";
import styled from 'styled-components';

const CustBox = styled(Box)`
margin:auto;
opacity:${({opacity})=>opacity};
transform:translateY(${({translatey})=>translatey});
width:100%;
transition:all 1.75s ease-in;

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

const Honor = ({sizeLet2,obj}) => {
    const honorRef=React.useRef(null);
    const [openHonor,setOpenHonor]=React.useState(null);
    const threshold=window.innerWidth <600 ? 0.2:0.8;
    React.useEffect(()=>{
const observer=new IntersectionObserver(entries=>{
    let entry=entries[0];
    
    if(entry.isIntersecting){
        setOpenHonor(true);
    }
},{threshold:threshold});
    if(honorRef.current){
        observer.observe(honorRef.current);
    }
    },[]);

    
  return (
    <CustBox
    opacity={openHonor ? "1":"0"}
    translatey={openHonor ? "0%":"-30%"}
    ref={honorRef}
    >
    <HonorTypo
     component="h1"
     variant={sizeLet2}
     translatex={openHonor ? "0%":"10%"}
    >
    <span className={styles.fontStyle}>{obj.letter}</span>{obj.name}
    </HonorTypo>
    <Typography component="h1" variant={sizeLet2} style={{width:"100%"}}>
        {obj.desc}
    </Typography>
    </CustBox>
  )
}

export default Honor