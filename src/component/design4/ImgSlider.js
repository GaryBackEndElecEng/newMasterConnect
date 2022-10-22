import React from 'react';
import { CardMedia, Box, Stack, Image, Container, Grid, Typography } from '@mui/material';
import { ImgArr } from './ImgArr'; //Image Array
import styled from 'styled-components';

const PictureEffect =styled.img.attrs({className:"PictureEffect"})`
src:${({src})=>src};
position:relative;
alt:"www.master-connect.com";
animation:easeIn 2.5s ease-in;
width:100%;
height:100%;
// aspect-ratio:4/3;
filter: contrast(126%);
@keyframes easeIn {

    from {
        transform:scale(0.85);
        opacity:0;
    }
    50%{
        transform:scale(1.2);
        opacity:1;
    }
    to{
        transform:scale(1);
        opacity:1;
    }
}
@media screen and (max-width:600px){
    width:120%;
    height:100%;
    transform:translateX(-10%);
    animation:easeIn 2.5s ease-in-out;

    @keyframes easeIn {

        from {
            transform:scale(0.75) translateX(-10%);
            opacity:0;
        }
        50%{
            transform:scale(1.2) translateX(-10%);
            opacity:1;
        }
        to{
            transform:scale(1) translateX(-10%);
            opacity:1;
        }
    }
}
`;


const ImgSlider = ({ count,getFlowers }) => {
    // console.log(getFlowers.filter(obj => (parseInt(obj.id) === parseInt(count))))
    return (
        <Box sx={{ width: "100%",padding:"0px",height:"100%",margin:{xs:"0px -20px"},overflow:"hidden" }}>
            {count && getFlowers ? getFlowers.filter(obj => (parseInt(obj.id) === parseInt(count))).map(selected => (
                <span key={selected.id} style={{margin:"0px",padding:"0px"}}>
                <PictureEffect src={selected.image} id={`pic-${selected.id}`}/>
                <Typography component="h1" variant="h4" 
                sx={{position:"absolute",top:"92.5%",left:{xs:"40%",sm:"45%"},textDecoration:"underline",color:"red", fontWeight:"bold"}}
                >
                    {selected.name}
                </Typography>
                </span>
            ))
                : <Typography component="h1" variant="h4"> no count or image array</Typography>}
        </Box>
    )
}

export default ImgSlider