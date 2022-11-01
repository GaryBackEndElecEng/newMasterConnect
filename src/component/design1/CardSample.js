import React, { useState, useRef, } from 'react'
import { useTheme } from '@mui/material/styles';
import { Card, CardMedia, Paper, Typography, CardContent, CardActions, Box, Container, Grid, CardActionArea, Fab } from '@mui/material';
import Message from './Message'
import styled from "styled-components";
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import { Stack } from '@mui/system';
import ShowBook from './ShowBook';


const TextSlider = styled.div.attrs({ className: "TextSlider" })`
position:absolute;
opacity:1;
top:0%;
left:0px;
width:100%;
display:${({ show }) => show};
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

const CardSample = ({ fade, comment, title, image }) => {
    const [show, setShow] = useState("none");
    const [showPhrase, setShowPhrase] = useState(false)
    const [btnClick, setBtnClick] = useState({ loaded: false, title: "" });
    const myRef = useRef();
    const theme = useTheme();
    const handleEffectMouseOver = () => {
        setShow("block")
        setShowPhrase(true)
        setBtnClick({ loaded: false, title: {} });
        myRef.current.style.filter = "blur(2px)";
    }
    const handleCloseMouseOut = () => {
        setShow("none")
        setShowPhrase(false);
        setBtnClick({ loaded: false, title: {} });
        myRef.current.style.filter = "blur(0)";
    }

    const handleBtnClick = (e, title) => {
        if (btnClick.loaded === false) {
            setBtnClick({ loaded: true, title: title });
        }
        if (btnClick.loaded === true) {
            setBtnClick({ loaded: false, title: {} });
        }
    }
    return (


        <Grid container spacing={{ xs: 0, sm: 1, md: 2 }} >
            <Card elevation={20}
                sx={{
                    maxWidth: "100%", width: "100%", position: "relative", margin: "0.5rem 5px",
                    background: theme.palette.common.mediumBlue2,
                }}>

                <CardMedia
                    sx={{
                        position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center",maxHeight:"50vh"

                    }}
                    ref={myRef}

                    onMouseOver={handleEffectMouseOver}
                    onMouseOut={handleCloseMouseOut}
                    component="img"
                    image={image} alt="www.master-connect.ca"
                    />
                {showPhrase === true ? (
                    <TextSlider show={show}>
                        <Message comment={comment} title={title} />
                    </TextSlider>
                ) : <Typography component="h1" variant="h6"
                    sx={{ position: "absolute", top: { md: "80%", xs: "70%" }, left: "0%", background: theme.palette.common.orangeFade2, boxShadow: "3px 5px 10px solid black", padding: "5px", borderRadius: "4%", width: "100%", textAlign: "center" }}>
                    {title}
                </Typography>
                }
                <Stack direction="column"
                    sx={{
                        display: "flex", alignItems: "center",
                        margin: "1rem auto"
                    }}>
                    <Fab variant="extended" color="secondary" size="small"
                        sx={{ padding: "0.5rem" }}
                        onClick={(e) => handleBtnClick(e, title)}
                    >
                        book:{title.slice(0, 19)}
                        <CardMembershipIcon sx={{ color: "blue", ml: 2 }} />
                    </Fab>
                </Stack>
                {btnClick.loaded && <ShowBook title={title} />}
                

            </Card>
        </Grid>
            
            
       
        
    )
}

export default CardSample