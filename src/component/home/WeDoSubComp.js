import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';
import {  Box, Paper, Typography,  } from '@mui/material';
import Styles from './home.module.css';

const SliderBox = styled(Box).attrs({ className: "sliderBox" })`

display:flex;
position:absolute;
top:130%;
left:0%;
justify-content:flex-start;
align-items:center;
flex-direction:column;
width:100%;
height:300px;
z-index:1000;
transform:scale(0);
opacity:0;
overflow-y:hidden;
transform:translateX(0%);

animation: slider 4.8s infinite;
@keyframes slider {
    from {transform:scale(0);opacity:0;
    }
    50%{transform:scale(1);opacity:1;
    }
    to{opacity:0;
    }
}
`;
const WeDoSubComp = ({counterWatch,maxTime,counter}) => {
    const theme = useTheme();


    

    return (
       <SliderBox >
        <Box sx={{ textAlign: "center", width: { sm: "100%", xs: "100%" },height:"100%", position: "relative", overflow: "hidden" }}>
            <Paper elevation={10} sx={{ background: { xs: theme.palette.home.light, sm: "transparent" }, color: { xs: "black", sm: "white" },width:"100%" }}>
                <Typography component="h1" variant="h5" sx={{ fontFamily: "Roboto", textAlign: "center", marginLeft: { xs: "0.7rem", sm: "" }, color: theme.palette.home.letters, background: theme.palette.home.light2 }}>{counterWatch.content}</Typography>
            </Paper>
            <img src={counterWatch.image} alt="www.master-connect.ca"
                style={{  width: "100%",height:"100%",  opacity: "1" }}
            />
            <div className={Styles.counterWatchIcon}>{counterWatch.icon}</div>
        </Box>
        </SliderBox>
        
    )
}

export default WeDoSubComp