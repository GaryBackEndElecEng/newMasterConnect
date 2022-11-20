import React, {  useEffect, useState, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import {  Grid, Stack, Typography } from '@mui/material';
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

`;
const calling = "https://www.cbc.ca/gfx/topvideo/2015/ex2-mobile-bill-invu-vomiero-110816.jpg";

const DynamicInfo = () => {
    const theme = useTheme();
    const { turnOn,setRemoveText,staticImage } = useContext(GeneralContext);
    const [showDisplay,setShowDisplay]=useState(false);
    const girlSmile = `${staticImage}/girlLaugh.png`;

    useEffect(()=>{
        if(turnOn){
            setTimeout(()=>{
                setShowDisplay(true);
            },2500)
        if(showDisplay===true){
            setTimeout(()=>{
                setRemoveText(true);
            },9000)
        }
        
        }
    },[turnOn,setRemoveText,setShowDisplay,showDisplay])

    return (
        <>
       {showDisplay && 
       <CustGrid className={showDisplay ? "vanishInfo" :""} container spacing={1}  >

            <Grid item xs={12} md={5}
                sx={{
                    padding: "auto 0.5rem", margin: "1rem", display: { xs: "none", sm: "flex" },
                    position: "relative", flexDirection: { xs: "column", sm: "row" }, 
                }}
            >
                    <img src={calling}
                        style={{
                            position: "absolute", width: "100%", height: "100%", zIndex: "-1"
                        }}
                        alt="www.master-connect.ca"
                    />
                    <Stack direction="column">
                        <Typography component="h1" variant="h4"
                            sx={{
                                color: theme.palette.common.light,margin:"auto 0.5rem" 
                            }}
                        >
                            We are here to help
                        </Typography>
                        <Typography component="h1" variant="body2" sx={{ color: theme.palette.common.light,margin:"auto 0.5rem" }}>
                            We're friendly and available to chat. Reach out to us anytime and we'll happily answer your questions.
                        </Typography>
                    </Stack>
            </Grid>
            <Grid item xs={12} md={2}
                sx={{
                    position: "relative",  display: { xs: "none", sm: "flex" }, flexGrow: "1", flexDirection: { xs: "column", sm: "row" },
                }}
            >
                    
                    <img src={girlSmile} alt="www.master-connect.ca"
                        style={{
                            position: "absolute", zIndex: "-1",width:"35%",height:"100%", display: { xs: "none", sm: "display" },
                        }}
                    />
                    
            </Grid>
            <Grid item xs={12} md={4}
            sx={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <Typography component="h1" variant="h4" sx={{color:theme.palette.common.blueGrey, fontSize:{sm:"20px",xs:"12px"},width:"100%",padding:"0",margin:"0"}}>Our goal is to satisfy your evey need within reasonable pricing and clear understanding.</Typography>
            </Grid>

        </CustGrid>}
        </>


    )
}

export default DynamicInfo