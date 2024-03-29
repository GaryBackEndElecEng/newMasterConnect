import React from 'react';
import {GeneralContext} from '../../context/GeneralContextProvider';
import styles from './home.module.css';
import {Grid, Container, Typography, Stack, Fab} from '@mui/material';
import styled from "styled-components";
import Modal from './Modal';

const CustHelpingBrand= styled.div.attrs({className:styles.mainHelping})`
padding:5vh 10px;
width:100%;
position:relative;
place-items:center;
justify-content:center;
align-items:center;
flex-direction:center;
@media screen and (max-width:920px){
    margin: auto 1rem;
   
}
`;

const CustGrid=styled(Grid).attrs({className:styles.mainGrid})`
margin:auto;
  justify-content:center;
  align-items:center;
  opacity:${({opacity})=>opacity};
  transition: 1.5s ease-in;

`;

const HelpingBrands = () => {
    const {staticImage}=React.useContext(GeneralContext);
    const lightEffect=`${staticImage}/extra/lightEffect.png`;
    const helpingRef=React.useRef();
    const [textSize,setTextSize]=React.useState("h1");
    const [show11,setShow11]=React.useState(false);
    const [modal,setModal]=React.useState(false);
    const threshold= window.innerWidth < 600 ? 0.3 :0.5;

    React.useEffect(()=>{
        if(window.innerWidth <920){
            setTextSize("h3");
        }else if(window.innerWidth <600){
            setTextSize("h3");
        }else{
            setTextSize("h1");
        }
    },[]);
React.useEffect(()=>{
    const observer=new IntersectionObserver((entries)=>{
        let entry=entries[0];
        if(entry.isIntersecting){
            setShow11(true);
        }
    },{threshold:threshold});

    if(helpingRef.current){
        observer.observe(helpingRef.current);
        return ()=>observer.disconnect();
        
    }
},[setShow11]);

const handleContact =()=>{
setModal(true);
}

  return (
    <CustHelpingBrand
    className={styles.mainHelping}
    ref={helpingRef}
    // style={{zIndex:"100"}}
    >
        <Container maxWidth="xl">
            <CustGrid container opacity={show11 ? "1":"0"} spacing={{xs:1,sm:2}}>
                <Grid item xs={12} sm={6} >
                    <Typography component="h1" variant={textSize} className={styles.textStatement} sx={{backgroundImage:`url(${lightEffect})`}}>
                    Helping Your Brand Big or Small
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} className={styles.helpingChildGrid}>
                <Typography component="h1" variant="h5" className={styles.fontType}
                style={{color:"white"}}>
                    We are proud to work with you and have been designing and helping companies thrive for 5 years. With thirty years in the hightech business, we grow with our clients and technology. We are particularly well suited for start-ups and new brands with very reasonable rates.
                    </Typography>
                    <Stack direction="column" sx={{alignItems:"center",margin:"1rem auto"}}>
                <Fab color="primary" variant="extended" size="medium" onClick={(e)=>handleContact(e)}>
                    Learn more
                </Fab>
            </Stack>
                </Grid>
            </CustGrid>
            
        </Container>
       {modal && <Modal/>}
    </CustHelpingBrand>
  )
}

export default HelpingBrands