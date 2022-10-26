import React, { useEffect, useState, useContext, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import loadP5 from './scripts/loadP5.js';
// import { ContainerHomeFluid, } from '../../styled/Container.styled';
import styled from 'styled-components';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { Container, Stack, Paper, Typography, Fab,  } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RequestAQuote from './RequestAQuote';
import { useTheme } from '@mui/material/styles';
import Styles from './home.module.css';

const CustQuoteContainer = styled(Container).attrs({ className: "getAQuote" })`
display:${({display})=>display} !important;
max-height:40vh;
position:absolute;
z-index:1000;
height:100%;
width:100%;
// background:${({bg})=>bg};
top:-20%;
left:0px;
animation: showUp 1.5s ease-in-out;
@keyframes showUp {
    from { opacity:0;}
    to {opacity:1;}
}
@media screen and (max-width:900px){
    left:0%;
    top:-18%;
}
@media screen and (max-width:800px){
    left:0px;
    top:-30%;
}
@media screen and (max-width:780px){
    left:0px;
    top:-20%;
}
@media screen and (max-width:600px){
    left:0px;
    top:-18%;
}

`;

const ShowGetQuoteForm = () => {
    const { issues} = useContext(GeneralContext);
    const theme = useTheme();
    const getQuoteRef = useRef();
    const innerW=window.innerWidth;
    const [open1, setOpen1] = useState(false);
    let showQuote=open1 ? "block":'none';
    const animate= open1 ? "openQuote":"closeQuote";
    const shiftQuoteBtn=open1 ? "-100%":"0%";
    const shiftQuoteBtnY=open1 ? ((innerW>680 && innerW < 1200) ? "-100%" :(innerW>1200) ? "-10%":"8%"):"0%";
    const btnColor= open1 ? "primary":"info";

    
    useEffect(() => {
        if(issues){
        getQuoteRef.current.style.display = "block";
        }

    }, [getQuoteRef,issues])

    const handleShowForm = (e) => {
        e.preventDefault();
        getQuoteRef.current.style.display="block ";
            return setOpen1(true);
    }

    const handleCloseForm = (e) => {
        e.preventDefault();
        getQuoteRef.current.style.display="none ";
            return setOpen1(false);
    }

    return (
        <Container maxWidth="xl" >
            <Stack direction={"row"} sx={{ mb: 3 }}>
                <Typography component="h1" variant="h4"
                    sx={{ color: "black", fontFamily: "Roboto", mr: 3 }}
                >
                    Request a Quote.
                </Typography>
                {/* FORM FOR QUOTE */}
                {!open1 ? <Fab
                variant="extended"
                    aria-label="arrowRight"
                    onClick={(e) => handleShowForm(e)}
                    // open={open1}
                    color={btnColor}
                    size="large"
                    sx={{
                        color: theme.palette.common.light, padding: "20px",
                    }}>open
                    <ArrowForwardIcon sx={{ fontSize: "40px",  }} />
                </Fab>

                    :

                    <Fab
                    variant="extended"
                    color={btnColor}
                        aria-label="arrowRight"
                        onClick={(e) => handleCloseForm(e)}
                        // open={open1}
                        sx={{
                            color: theme.palette.common.red, padding: "20px",transform:`translate(${shiftQuoteBtn},${shiftQuoteBtnY})`
                        }}> close
                        <KeyboardArrowUpIcon sx={{ fontSize: "40px", margin: "1px 1rem", }} />
                    </Fab>
                }

            </Stack>
            <CustQuoteContainer
            display={showQuote}
            bg={theme.palette.common.blueGrey}
            ref={getQuoteRef} 
            className={Styles.getAQuote1}>
                    <Paper elevation={20} component="div" sx={{ borderRadius: "2%",background:theme.palette.home.mediumCyan,zIndex:"10000" }}>
                        <RequestAQuote />
                    </Paper>
            </CustQuoteContainer>
        </Container>
    )
}

export default ShowGetQuoteForm