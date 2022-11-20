import React,{useState} from 'react'
import styled from 'styled-components';
import {  Typography, Grid, Container, Paper } from '@mui/material';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PaidIcon from '@mui/icons-material/Paid';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import GroupIcon from '@mui/icons-material/Group';
import { useEffect } from 'react';



const SpecialContainer=styled(Container)`
animation:showContainer 1.5s ease-in-out;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
@keyframes showContainer{
    from{ opacity:0;transform:translateX(-20%)};
    to{ opacity:1;transform:translateX(-%)};
}
`;


const ServiceList = ({ourServices}) => {
const [cat3,setCat3]=useState({loaded:false,data:[]})

  useEffect(()=>{
    const iconAllServiceArr=[{id:1,icon:<DesignServicesIcon sx={{ml:1,color:"red"}} />},{id:2,icon:<ManageHistoryIcon sx={{ml:1,color:"red"}} />},{id:3,icon:<ProductionQuantityLimitsIcon sx={{ml:1,color:"red"}} />},{id:4,icon:<PaidIcon  sx={{ml:1,color:"red"}}/>},{id:5,icon:<ScreenSearchDesktopIcon sx={{ml:1,color:"red"}} />},{id:6,icon:<PeopleAltIcon sx={{ml:1,color:"red"}} />},{id:7,icon:<GroupIcon sx={{ml:1,color:"red"}} />},]
        let arr=[];
        if(ourServices.loaded && ourServices.data){
          ourServices.data.forEach((obj,index)=>{
            let iconObj=iconAllServiceArr[index]
            arr.push({...obj,"icon":iconObj.icon})
          });
          setCat3({loaded:true,data:arr})
      }
  },[]);
 
  return (
<SpecialContainer maxWidth={'xl'} sx={{margin:"2rem auto"}}>
    <Grid container spacing={0} sx={{}}>
    {cat3.loaded && cat3.data.map((obj,index) => (
        <Grid key={`${obj.id}-${index}`} item xs={12} sm={6} md={4}
          sx={{
            margin:"auto ",padding:"0.5rem"
            
          }}
        >
          <Paper elevation={3} component="div" sx={{
            margin: "auto", display: "flex", justifyContent: "flex-start", alignItems: "center",
            flexDirection: "column", padding: "0.5rem"
          }}
          >
            <Typography component="h1" variant="h3"
              sx={{ fontFamily: "Roboto",fontSize:{xs:"30px",sm:"30px"} }}
            >
              {obj.title} {obj.icon}
            </Typography>
            <Typography component="h1" variant="h6"
              sx={{ padding: "auto 1rem" }}>{obj.content}</Typography>
          </Paper>

        </Grid>
      ))
      }
      </Grid>
      </SpecialContainer>
  )
}

export default ServiceList