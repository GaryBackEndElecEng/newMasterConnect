import React from 'react'
import { useTheme } from '@mui/material/styles';
import { Box,  Paper, Typography } from '@mui/material';
import styled from 'styled-components';

const GlobalBox = styled(Box)`
margin:auto;
top:0%;
right:0%;
position:absolute;
display: flex;
justify-content: flex-start;
align-items: center;
flex-direction: column;
padding: 0rem;
width:50%;
height:auto;


`;
const FactStatement = ({Fact}) => {
    const theme=useTheme();
    return (
        <GlobalBox
        sx={{width:{xs:"60%",sm:"40%",md:"50%"}}}
        >
            <Paper component="div" elevation={2} className="text-center" sx={{ width:"100%",height:"100%",padding:"0.5rem" }}>
                <Typography component="h1" variant="h4"
                    sx={{
                        fontFamily: "Roboto", textDecoration: "none",
                        padding: ".25rem", 
                    }}
                >
                    {Fact !== null && Fact.title}
                </Typography>
            </Paper>
            <Typography component="h1" variant="h6" sx={{
                fontFamily: "Roboto", color: theme.palette.common.light, '&:first-line': { fontWeight: "bold", color: "white" },background:theme.palette.common.background,padding:"0.5rem",fontSize:{xs:"100%",sm:"150%"}

            }}>
                {Fact !== null && Fact.content}

            </Typography>
        </GlobalBox>
    )
}

export default FactStatement