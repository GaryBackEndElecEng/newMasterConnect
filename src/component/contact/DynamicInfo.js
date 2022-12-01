import React, {  useEffect, useState, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import {  Grid, Typography } from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider';



const CustGrid =styled(Grid)`
margin:auto;
margin-top:-1rem;
animation: showInfo 4.5s ease-in-out;
width:100%;
@keyframes showInfo {
from { opacity:0;transform:translateX(-20%);}
to{opacity:1;transform:translateX(0%);}
}
@media screen and (max-width:600px){
    position:absolute;
    top:0%;
    left:0%;
}

`;
const calling = "https://www.cbc.ca/gfx/topvideo/2015/ex2-mobile-bill-invu-vomiero-110816.jpg";

const DynamicInfo = () => {
    const theme = useTheme();
    const { turnOn,setRemoveText } = useContext(GeneralContext);
    const [showDisplay,setShowDisplay]=useState(false);
    // const girlSmile = `${staticImage}/girlLaugh.png`;

    useEffect(()=>{
        
            setTimeout(()=>{
                setShowDisplay(true);
            },2500)
        if(showDisplay===true){
            setTimeout(()=>{
                setRemoveText(true);
            },9000)
        }
        
      
    },[turnOn,setRemoveText,setShowDisplay,showDisplay])

    return (
        <>
       {
       showDisplay && 
       <CustGrid  container spacing={0}  >

            <Grid item xs={12} md={12}
                sx={{
                    padding: "auto 0.5rem", margin: "1rem", display: {  xs: "flex" },
                    position: "relative", flexDirection: { xs: "column", }, backgroundImage:`url(${calling})`,backgroundSize:"100% 100%",minHeight:{md:"10vh",sm:"15vh"}
                }}
            >
                   
                        <Typography component="h1" variant="h4"
                            sx={{
                                color: theme.palette.common.light,margin:"auto 0.5rem" 
                            }}
                        >
                            We are here to help <span style={{color:"red"}}>Contact Us,We'll chat</span>
                        </Typography>
                        <Typography component="h1" variant="h4" sx={{color:theme.palette.common.blueGrey, fontSize:{sm:"20px",xs:"12px"},width:"100%",padding:"0",margin:"0"}}>Our goal is to get it done right-
                        <span style={{color:"red"}}> The First Time!</span>
                        </Typography>
                       
                   
            </Grid>

        </CustGrid>
        }
        </>


    )
}

export default DynamicInfo