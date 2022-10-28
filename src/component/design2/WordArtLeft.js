import React from 'react';
import { Box, Stack, Container, Paper, Grid, Typography } from '@mui/material';
import styled from 'styled-components';
import styles from './design2.module.css'

const Sidebar = styled(Paper)`
transform:rotate(90deg) translate(326px,345px);
width:47vw;

@media screen and (max-width:900px){
    transform:rotate(90deg) translate(518px,529px);
    width:133vw;
}
@media screen and (max-width:800px){
    transform:rotate(90deg) translate(438px,457px);
    width:123vw;
}
@media screen and (max-width:600px){
    transform:rotate(90deg) translate(158px,180px);
    width:100vw;
}


`;


const WordArtLeft = () => {
    return (
        <Sidebar 
            elevation={2}
            sx={{
                background: "black",
                color: "white",
                textAlign: "center",
                // width:{xs:"60vw",md:"auto",}
            }}
        >
           <Typography component="h1" variant="h6">Page Design</Typography> 
           </Sidebar>
    )
}

export default WordArtLeft