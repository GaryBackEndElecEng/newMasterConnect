import React from "react";
import {Link} from 'react-router-dom'
import { GeneralContext } from "../../context/GeneralContextProvider";
import styles from "./process.module.css";
import { Container, Typography,Grid, Box } from "@mui/material";
import styled from "styled-components";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const CustBoxRef=styled(Box)`
margin:auto;
position:relative;
background-image:url(${({bgimage})=>bgimage});
background-position:50% 50%;
background-size:${({backgroundsize})=>backgroundsize};
filter:saturate(${({saturate})=>saturate});
display:flex;
justifyContent:flex-start;
alignItems:center;
flexDirection:column;
animation:${({animation})=>animation};
@keyframes growInDive {
  from {background-size:100% 100%;filter:saturate(1);}
  to {background-size:120% 120%;filter:saturate(2);}
}
@keyframes growOutDive {
  from {background-size:120% 120%;filter:saturate(2);}
  to {background-size:100% 100%;filter:saturate(1);}
}

`;



const DiveIn = () => {
    const box1Ref=React.useRef();
    const {staticImage}=React.useContext(GeneralContext);
    const [isMousover,setIsmouseover]=React.useState(false);
    const [scroll,setScroll]=React.useState(35);
    const lepard=`${staticImage}/lepard.png`;
    const lions=`${staticImage}/lions.png`;
    const [iswidth,setIswidth]=React.useState(false);
    const [openThis,setOpenThis]=React.useState(false);
    const letterSize= window.innerWidth < 900 ? (window.innerWidth < 600 ? "h5" : "h4") : "h3" ;

    React.useEffect(()=>{
        if(window.innerWidth && window.innerWidth <900){
            setIswidth(true);
        }
    },[]);

    React.useEffect(()=>{
        const observer= new IntersectionObserver((entries)=>{
            let entry=entries[0];
                
                    setOpenThis(entry.isIntersecting);
                    setIsmouseover(entry.isIntersecting)
              
    
        },{threshold:0.7});
        //OBSERVING
        if(box1Ref.current){
        observer.observe(box1Ref.current);
        return ()=>observer.disconnect();
        }
       
    },[]);
   
  return (
    <Container maxWidth="xl">
        <div className={styles.diveInMain}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
                <Typography component="h1" variant="h2" className={styles.fontStyle}>Take a Dive</Typography>
                <Typography component="h1" variant="h4">Symbiotic relations is our thing</Typography>
                <div style={{margin:"2rem auto"}} className={styles.startProject}>
                    <Link to="/start-project" >
                <Typography component="h1" variant="h1" className={styles.fontStyle_2}>Start a Project</Typography>
                <ArrowOutwardIcon sx={{color:"red",fontSize:"48px"}}/>
                </Link>
                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={9}>
        <CustBoxRef
        bgimage={lepard} 
        ref={box1Ref}
        backgroundsize={openThis ? "120% 120%":"100% 100%"}
        animation={openThis ? "growInDive 2s ease-in-out" : "growOutDive 2s ease-in-out"}
        saturate={openThis ? "2": "1"}
        
        sx={{
            height:{xs:"400px",sm:"600px",md:"800px"},
            width:{xs:"350px",sm:"780px",md:"1000px"},
            }}
        >
          <Link to="/contact" className={isMousover ? styles.moveLettersOn : styles.moveLettersOff}>
            <div >
            <Typography component={"h1"} variant={letterSize} className={isMousover ? styles.fontType : styles.fontStyle}
            sx={{textAlign:"center"}}>Dive In</Typography>
            <Typography component={"h1"} variant={letterSize}>Improve your hit rates and exposure</Typography>
            </div>
            </Link>
        </CustBoxRef>
        </Grid>
        </Grid>
        </div>
    </Container>
  )
}

export default DiveIn