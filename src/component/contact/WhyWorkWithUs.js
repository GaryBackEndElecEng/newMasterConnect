import React, { useContext,useEffect,useState } from 'react'
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import {  Typography, Grid, Container, Paper } from '@mui/material';
import Styles from './contact.module.css';
import ScaleIcon from '@mui/icons-material/Scale';
import WebhookIcon from '@mui/icons-material/Webhook';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import StorageIcon from '@mui/icons-material/Storage';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import DnsIcon from '@mui/icons-material/Dns';
import PaidIcon from '@mui/icons-material/Paid';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';


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
    const { staticImage,whyWorkWithUs} = useContext(GeneralContext);
    const [cat2,setCat2]=useState({loaded:false,data:[]});
    const bgWork=`${staticImage}/work.png`;
    const white=`${staticImage}/white.png`;
    //THIS GETS THE ARRAY FROM THE SERVER

    useEffect(()=>{

      const iconArray=[{id:0,icon:<ScaleIcon sx={{ml:1,color:"red"}} />},{id:1,icon:<WebhookIcon sx={{ml:1,color:"red"}} />},{id:2,icon:<StorageIcon sx={{ml:1,color:"red"}} />},{id:3,icon:<CloudSyncIcon sx={{ml:1,color:"red"}} />},{id:4,icon:<PrecisionManufacturingIcon sx={{ml:1,color:"red"}} />},{id:5,icon:<DnsIcon sx={{ml:1,color:"red"}} />},{id:6,icon:<PaidIcon sx={{ml:1,color:"red"}} />},
      {id:7,icon:<ScreenSearchDesktopIcon sx={{ml:1,color:"red"}} />},{id:8,icon:<WebhookIcon sx={{ml:1,color:"red"}} />},{id:9,icon:<StorageIcon />}
      ]

      let arr2=[];
        if(whyWorkWithUs.loaded && whyWorkWithUs.data){
          whyWorkWithUs.data.forEach((obj,index)=>{
            let iconObj=iconArray[index]
            arr2.push({...obj,"icon":iconObj.icon})
          });
          setCat2({loaded:true,data:arr2})
      }
    },[whyWorkWithUs.loaded,whyWorkWithUs.data,setCat2]);
  
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
              {cat2.loaded && cat2.data.map(obj => (

                <Grid item xs={12} md={4} key={obj.id}
                  sx={{ margin: "auto" }}
                >
                  <Typography component="h1" variant="h5" className="text-center"
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
          </Container>
  )
}

export default WhyWorkWithUs