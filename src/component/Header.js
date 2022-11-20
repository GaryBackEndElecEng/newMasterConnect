import React, { useContext, useEffect, useState, useRef } from 'react';
import {useLocation} from 'react-router-dom';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import { GeneralContext } from '../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles'
import StripePaymentRedirect from './StripePaymentRedirect';
import styled from 'styled-components';
import FunctionsIcon from '@mui/icons-material/Functions';

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
  const location=useLocation();
  const pathName=location.pathname;
  const MyRef = useRef();
  const theme = useTheme();
  const [start, setStart] = useState(false);
  const { title,average,loadProduct } = useContext(GeneralContext);
  const show = start ? "block" : "none";
  const [isOnPage,setIsOnPage]=useState(false);
  

  useEffect(() => {
    setStart(true);
    if(loadProduct.loaded && loadProduct.data){
      let filterPage=loadProduct.data.filter(obj=>(obj.extra_kwargs===pathName))
      let onPage=filterPage && filterPage.length >0 ? filterPage[0] : null;
      if(onPage){
        setIsOnPage(true);
      }else{setIsOnPage(false)}
    }
  }, [setStart,loadProduct.loaded,loadProduct.data,setIsOnPage,pathName]);

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
            <Paper
            sx={{ padding: "0 1rem", background: theme.palette.background.light }}
             component="div" elevation={3}>
              <Stack direction="row" spacing={2} sx={{alignItems:"center",justifyContent:"center"}}>
              <Typography component="h1" variant="h3" sx={{ fontFamily: "Roboto", display: { xs: "none", sm: "block" }, opacity: { sm: 0, md: 1 } }} >
                {title} 
              </Typography>
              {isOnPage && <Typography component="h1" variant="h5">av:<FunctionsIcon sx={{color:"red",ml:1}}/>{average}</Typography>}
              </Stack>
              </Paper>
          </HeaderEffect>
        </Box>
      </Container>
    </>
  )
}

export default Header