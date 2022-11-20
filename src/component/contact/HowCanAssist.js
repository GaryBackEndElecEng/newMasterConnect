import React from 'react'
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import {  Typography,Container, Paper, } from '@mui/material';
import Styles from './contact.module.css';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const HowcanAssisistContainer=styled.div`
margin:0px;
position:relative;
margin-top:0px;
background:${({bg})=>bg};
width:100%;
z-index:1000;
animation: revealMain 1.5s ease-in;
@keyframes revealMain {
  from{transform:scale(0);}
  to {transform:scale(1);}
}
@media screen and (max-width:900px){
  margin-top:0px;
}
@media screen and (max-width:600px){
margin-top:-50px;
}
`;
const HowCanAssist = () => {
    const theme = useTheme();
 
  return (
    <HowcanAssisistContainer bg={theme.palette.common.background} className={`container-fluid `}>
          <Paper elevation={10} component="div" className={Styles.helpYouContainer}
            sx={{ background: theme.palette.common.blueGrey }}
          >
            <Container component="div" className={Styles.helpYou}
              sx={{ background: theme.palette.common.medium }}
            >
              <Typography className={Styles.helpYouTypo} component="h1" variant="h5"
                sx={{ background: theme.palette.common.light, fontFamily: "Roboto", fontSize:{ sm:"30px",xs:"20px" }}}
              >
                <div className={Styles.contactMsg} sx={{position:"relative"}}>
                  <AutoAwesomeIcon />
                  <span className={Styles.line}>-----</span>
                  How Can We Assist ?
                  <span className={Styles.line}>-----</span>
                  <AutoAwesomeIcon />
                </div>
              </Typography>

            </Container>
          </Paper>
        </HowcanAssisistContainer>
  )
}

export default HowCanAssist