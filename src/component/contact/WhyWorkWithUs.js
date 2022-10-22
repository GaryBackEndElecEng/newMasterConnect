import React, { useContext, useEffect, useState } from 'react'
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import { Box, Stack, AppBar, Typography, Grid, Container, Paper } from '@mui/material';
import { ContainerHomeFluid } from '../../styled/Container.styled';
import Styles from './contact.module.css';
import ScaleIcon from '@mui/icons-material/Scale';
import WebhookIcon from '@mui/icons-material/Webhook';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import StorageIcon from '@mui/icons-material/Storage';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import DnsIcon from '@mui/icons-material/Dns';
//This doesnt return is stores array in getServiceArray
import GetOurServices from './GetOurServices'; 


const CustPaper=styled(Paper)`
position:relative;
z-index:1;
background-image:url(${({bg})=>bg});
background-size:100% 100%;
margin:1rem auto;
display:flex;
color:white;
justify-content:center;
align-items:center;
flex-direction:column;
width:100%;
margin-bottom:2rem;
`;
const WhyWorkWithUs = () => {
    const theme = useTheme();
    const { staticImage,getServiceArray,loaded,whyWorkWithUs} = useContext(GeneralContext);
    const bgWork=`${staticImage}/work.png`;
    const white=`${staticImage}/white.png`;
    //THIS GETS THE ARRAY FROM THE SERVER
    const whyWorkWithUsArr2= whyWorkWithUs.loaded ? whyWorkWithUs.data:null;

  
  return (
    <Container maxWidth={"xl"}>
    <CustPaper elevation={10} bg={bgWork}
          >
            <img src={white} className={Styles.whiteImage} alt="www.master-connect.ca"/>
            <Typography component="h1" variant="h3"
              sx={{
                fontFamily: "Roboto", fontSize: {xs:"40px",sm:"50px"}, margin: "auto",color:theme.palette.common.blueGreyDark,
                background:theme.palette.common.transparent,zIndex:1000,
              }}
            >
              Why Work With Us?
            </Typography>
            <Grid container spacing={0}
              sx={{
                padding: "1rem", margin: "1rem auto",zIndex:1000,
              }}
            >
              {whyWorkWithUsArr2 && whyWorkWithUsArr2.map(obj => (

                <Grid item xs={12} md={4} key={obj.id}
                  sx={{ margin: "auto" }}
                >
                  <Typography component="h1" variant="h4" className="text-center"
                    sx={{
                      margin: "auto", fontFamily: "Roboto", fontSize:{xs:"36px",sm:"40px"},
                      background:theme.palette.common.transparent
                    }}
                  >
                    {obj.title} {obj.icon}
                  </Typography>
                  <Typography component="h1" variant="body2"
                    sx={{
                      margin: "auto 0.5rem",background:theme.palette.common.background3,
                      fontSize:{xs:"20px",sm:"20px"},
                      color:theme.palette.common.lighter,padding:"0.5rem"
                    }}

                  >
                    {obj.content}
                  </Typography>
                </Grid>

              ))
              }
            </Grid>
          </CustPaper>
          <div>
            <GetOurServices/>
          </div>
          </Container>
  )
}

export default WhyWorkWithUs