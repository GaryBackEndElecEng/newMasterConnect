import React from 'react';
import { Box, Stack, Container, Paper, Grid, Typography } from '@mui/material';
import styled from 'styled-components';
import styles from './design2.module.css'

const Sidebar = styled(Paper)`
transform:rotate(270deg) translate(-47%,-1630%);
@media screen and (max-width:900px){
    transform:rotate(270deg) translate(-225px,-235px);
}
@media screen and (max-width:800px){
    transform:rotate(270deg) translate(-205px,-215px);
}
@media screen and (max-width:600px){
    transform:rotate(270deg) translate(-98px,-105px);
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
                width:{xs:"60vw",md:"auto"}
            }}
        >
           <Typography component="h1" variant="h6">Page Design</Typography> 
           </Sidebar>
    )
}

export default WordArtLeft