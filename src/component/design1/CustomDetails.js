import React, { useContext, useEffect, useState } from 'react'
import { Box, Container, Stack, Grid, Typography } from '@mui/material';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';

const CustomBox=styled(Box)`
width:100%;
position:absolute;
margin:auto;
background:${({bg})=>bg};
padding:1rem;
left:0%;
top:-25%;
animation: sweepIn 3.5s ease-in-out;
@keyframes sweepIn {
    from {opacity:0;transform:translateY(-120%);}
    to {opacity:1;transform:translateY(0%);}
}
@media screen and (max-width:900px){
    top:-7%;
}
@media screen and (max-width:600px){
    top:-16%;
}
`;
const CustomDetails = () => {
    const theme=useTheme();
    return (
        <CustomBox bg={theme.palette.common.cyanPale}>
            <Typography component="h1" variant="h3"
                sx={{ width: "100%", textAlign: "center" }}
            >
                Custom details
            </Typography>
            <Typography component="h1" variant="body2"
                sx={{
                    padding: { xs: "1rem 0.25rem" },
                    transform: { xs: "scale(1)", sm: "scale(1)" },
                    width: { xs: "80%", sm: "100%" },
                    fontFamily: "Roboto",
                    // fontStyle: "italic",
                    fontSize: { xs: "14px", sm: "30px", md: "30px" }
                }}
            >
                This Short Term Rental Design is adjustable to the client's interests. The pictures are sample pictures and are randomly selected for staging purposes and tailered to draw viewers.
            </Typography>
        </CustomBox>
    )
}

export default CustomDetails