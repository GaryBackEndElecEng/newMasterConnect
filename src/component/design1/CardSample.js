import React, { useState, useRef, useEffect } from 'react'
import { useTheme } from '@mui/material/styles';
import { Card, CardMedia, Paper, Typography, CardContent, CardActions,Box, Container, Grid } from '@mui/material';
import Message from './Message'
import styled from "styled-components";


const TextSlider=styled.div.attrs({className:"TextSlider"})`
position:absolute;
opacity:1;
top:0%;
left:0px;
width:100%;
display:${({show})=>show};
z-index:1000;
color:white;
animation: name2 1s ease-in;


@keyframes name2 {
    from { 
        opacity:0;
        transform:translateX(100%);
    }
    to{
        opacity:1;
        transform:translateX(0%);
    }
}
`;

const CardSample = ({ fade,comment,title }) => {
    const [show, setShow] = useState("none");
    const [showPhrase,setShowPhrase]=useState(false)
    const myRef = useRef();
    const theme = useTheme();
    const pic = myRef.current ? myRef.current : null;
    const handleEffectMouseOver = () => {
        setShow("block")
        setShowPhrase(true)
        myRef.current.style.filter="blur(2px)";
    }
    const handleCloseMouseOut = () => {
        setShow("none")
        setShowPhrase(false)
        myRef.current.style.filter="blur(0)";
    }


    return (
        <Container maxWidth="xl" sx={{margin:"auto",display:"flex"}}>
            <Paper component="div" elevation={10} className="cardArray" sx={{ background: theme.palette.card.light, opacity: fade ,margin:"auto"}}>
                <Grid container spacing={0}>
                <Card 
                sx={{ maxWidth: "100%", width: "100%",position:"relative",margin:"0.5rem 0"}}>

                    <CardMedia 
                    sx={{position:"relative"}} 
                    ref={myRef} 
                    
                    onMouseOver={handleEffectMouseOver} 
                    onMouseOut={handleCloseMouseOut} 
                    component="img" 
                    image="https://source.unsplash.com/random/" alt="www.master-connect.ca" 
                    height="auto" />
                    {showPhrase === true ? (
                        <TextSlider show={show}>
                            <Message comment={comment} title={title}/>
                        </TextSlider>
                    ) :<Typography component="h1" variant="h5"
                     sx={{position:"absolute",top:"15%",left:"25%",background:theme.palette.common.transparent,boxShadow:"3px 5px 10px solid black", padding:"5px",borderRadius:"4%"}}>
                        hover over
                    </Typography>
                    }
                    
                </Card>
                </Grid>
            </Paper>
        </Container>
    )
}

export default CardSample