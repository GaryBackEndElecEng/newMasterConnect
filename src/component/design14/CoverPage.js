import React, { useState } from 'react';
// import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import { Box, CardMedia, Container, Stack, Typography, } from '@mui/material';
import { useEffect } from 'react';
import styles from './design14.module.css';

const MainCover = styled(Container)`
width:100vw;
position:relative;
min-height:76vh;
margin-top:0px;
display:flex;
justify-content:flex-start;
align-items:center;
flex-direction:column;
overflow:hidden;
@media screen and (max-width:900px){
    min-height:50vh;
}
@media screen and (max-width:600px){
    margin-top:-50px;
    min-height:40vh;
}
`;
const SlidesStack = styled(Stack)`
width:100%;
justify-content:flex-start;
align-items:flex-start;

cursor:pointer;

-webkit-overflow-scrolling:${({ touch }) => touch};
// animation:scroll1 40s ease-in-out;
// @keyframes scroll1{
//     0% {transform:translateX(0%) scaleX(1);}
//     50% {transform:translateX(-25%) scaleX(-1);}
//     100% {transform:translateX(0%) scaleX(1);}
// }

`;



const CoverPage = ({ sliderArray }) => {
    const [getWidth, setGetWidth] = useState(null);
    const [start,setStart]=useState(false);
    const [commence,setCommence]=useState(false);
    const picArray = sliderArray.length > 0 ? sliderArray : null;
    const picLength=sliderArray.length > 0 ? sliderArray.length:7;

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

    const handleClick=(e)=>{
        e.preventDefault();
        if(!start){
            setStart(true);
        }else{setStart(false);}
    }

    return (
        <MainCover >
            <Box 
            sx={{position:"absolute",top:"1%",left:{md:"15%",xs:"0%"},maxWidth:{md:"50vw",xs:"100vw"},overflowX:"hidden"}}
            >
            <SlidesStack
                direction="row"
                spacing={{ xs: 0, sm: 1,md:2 }}
                onClick={(e)=>handleClick(e)}
                width={`${picLength*100}%`}
                
            >
                {picArray && picArray.map((obj, index) => (
                    <Stack direction="column" key={`${index}-slider-${obj.id}`}
                     sx={{justifyContent:"center",alignItems:"center",maxWidth:"950px",backgroundImage:`url(${obj.image})`,backgroundPosition:"50% 50%",backgroundSize:"100% 100%",minHeight:{md:"50vh",xs:"30vh",sm:"40vh"},minWidth:{md:"50vw",xs:"100vw"}}}
                     className={start || commence ? styles.slideStack : styles.slideStackNone}
                    >
                        <Typography component='h1' variant='h3' sx={{color:"white",padding:"1rem",background:"rgba(0,0,0,.3)"}}>{obj.name}</Typography>
                  
                    
                    </Stack>
                ))}
              


            </SlidesStack>
            </Box>


        </MainCover>
    )
}

export default CoverPage