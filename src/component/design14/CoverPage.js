import React, { useState } from 'react';
// import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import { Box, CardMedia, Container, Grid, Stack, Typography, } from '@mui/material';
import { useEffect } from 'react';
import styles from './design14.module.css';

const MainCover = styled(Container)`
width:100%;
position:relative;
height:86dvh;
margin-top:0px;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
// overflow:hidden;
// border:1px solid red;
@media screen and (max-width:900px){
    height:60vh;
}
@media screen and (max-width:600px){
    margin-top:-50px;
    height:60dvh;
}
`;
const CustChildGrid = styled(Grid)`
width:100%;
display:flex;
justify-content:center;
align-items:center;
position:relative;
flex-direction:column;
background-image:url(${({bgimage})=>bgimage});
background-size:100% 100%;
background-position:50% 50%;
animation:scroll1 4s ease-in-out;
@keyframes scroll1{
    0% {background-position:0% 50%; background-size:200% 200%;}
    50% {background-position:100% 50%; background-size:150% 150%;}
    100% {background-position:50% 50%; background-size:100% 100%;}
}

`;



const CoverPage = ({ sliderArray }) => {
    const [getWidth, setGetWidth] = useState(null);
    const [start,setStart]=useState(null);
    const [start1,setStart1]=useState(null);
    const [commence,setCommence]=useState(false);
    const picArray = sliderArray.length > 0 ? sliderArray : null;
    const picLength=sliderArray.length > 0 ? sliderArray.length:7;

    React.useEffect(()=>{
        setTimeout(()=>{
            setStart(true);
        },4000);
    },[]);
    React.useEffect(()=>{
        if(start){
        setTimeout(()=>{
            setStart1(true);
        },4000);
    }
    },[start]);

    useEffect(() => {
        if (window.innerWidth < 400) {
            setGetWidth(400);
        } else if (window.innerWidth > 400 && window.innerWidth < 600) {
            setGetWidth(500);
        } else if (window.innerWidth > 600 && window.innerWidth < 980) {
            setGetWidth(800);
        } else {
            setGetWidth(1000);
        }
        setCommence(true);
        setTimeout(()=>{setCommence(false)},10000);
    }, [setGetWidth, getWidth]);

    

    return (
        <MainCover maxWidth="xl" >
            
            <Grid container spacing={0}
            sx={{width:"100%"}}
            >
                {picArray && picArray.map((obj, index) => (
                    <CustChildGrid bgimage={obj.image} item xs={4} sm={4} md={4} key={`${index}-slider-${obj.id}`}
                     sx={{height:{md:"37vh",sm:"25vh",xs:"20vh"}}}
                     
                    >
                        <Typography 
                        component='h1'
                         variant={window.innerWidth <600 ? "h6" :"h6"} 
                        

                        className={start ? styles.showtextOn : styles.showtextOff}
                        >
                            {obj.name}
                        </Typography>
                  
                    
                    </CustChildGrid>
                ))}
              


            </Grid>
           
                    <Stack direction="column" sx={{width:"100%",justifyContent:"center",alignItems:"center"}}>
                        <Typography component="h1" variant={window.innerWidth <900 ? (window.innerWidth <600 ? "h4": "h3"):"h1"}
                        className={start1 ? styles.showmsg : styles.hide}
                        >
                            Display Products for your interests
                        </Typography>
                    </Stack>

        </MainCover>
    )
}

export default CoverPage