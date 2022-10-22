import React, { useContext, useEffect, useState, useRef } from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import { GeneralContext } from '../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles'
import StripePaymentRedirect from './StripePaymentRedirect';
import styled from 'styled-components';

const HeaderEffect = styled.div.attrs({ className: "HeaderEffect" })`
display:${({ show }) => show};
text-align:center;
color:${({ color }) => color};
background:${({ bg }) => bg};
padding:0 1.5rem;
border-radius:5%;
width:100%;
margin:0 auto;
animation: shiftHeader 1.5s ease-in;

@keyframes shiftHeader {
    from {
        opacity:0;
        transform:scale(0) ;
    }
    to {
        opacity:1;
        transform:scale(1) ;
    }
}
`;

const Header = () => {
  const MyRef = useRef();
  const theme = useTheme();
  const [start, setStart] = useState(false);
  const { title, } = useContext(GeneralContext);
  const show = start ? "block" : "none";
  

  useEffect(() => {
    setStart(true)
  }, [setStart])

  useEffect(() => {
    // LoadFonts("Play",600)
  }, [])

  return (
    <><StripePaymentRedirect />
      <Container component="div" maxWidth="sm" className="container-fluid Header" sx={{ position: "relative", marginTop: { xs: "3.5rem", sm: "0rem", md: "-60px" }, marginBottom: "0rem" }} >
        <Box className="headerBox"
          sx={{
            justifyContent: "flex-start", alignItems: "center", flexDirection: "column",
            position: { sx: "relative", sm: "relative" },
            zIndex: "1000",display:{xs:"none",md:"block"}
          }}
        >
          <HeaderEffect
            color={theme.palette.common.dark}
            bg={""}
            show={show}
            style={{
              fontSize: { xs: "30px", md: "35px", lg: "40px" },
              opacity: { xs: 0, sm: 0, md: 1 }
            }}
            ref={MyRef}
          >
            <Paper sx={{ padding: "0 1rem", background: theme.palette.background.light }} component="div" elevation={0}><Typography component="h1" variant="h3" sx={{ fontFamily: "Roboto", display: { xs: "none", sm: "block" }, opacity: { sm: 0, md: 1 } }} >{title}</Typography></Paper>
          </HeaderEffect>
        </Box>
      </Container>
    </>
  )
}

export default Header