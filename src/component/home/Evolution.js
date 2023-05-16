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

const Evolution = ({sizeLet2,obj}) => {
    const evolutionRef=React.useRef(null);
    const [openEvolution,setOpenEvolution]=React.useState(null);
    const threshold=window.innerWidth <600 ? 0.2:0.8;
    React.useEffect(()=>{
const observer=new IntersectionObserver(entries=>{
    let entry=entries[0];
    
    if(entry.isIntersecting){
        setOpenEvolution(true);
    }
},{threshold:threshold});
    if(evolutionRef.current){
        observer.observe(evolutionRef.current);
    }
    },[]);

    
  return (
    <CustBox
    opacity={openEvolution ? "1":"0"}
    translatey={openEvolution ? "0%":"-30%"}
    ref={evolutionRef}
    >
    <HonorTypo
     component="h1"
     variant={sizeLet2}
     translatex={openEvolution ? "0%":"10%"}
    >
   <span className={styles.fontStyle}>{obj.letter}</span>{obj.name}
    </HonorTypo>
    <Typography component="h1" variant={sizeLet2} style={{width:"100%"}}>
    {obj.desc}
    </Typography>
    </CustBox>
  )
}

export default Evolution