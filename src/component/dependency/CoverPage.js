import React,{useContext,useState,useEffect} from 'react';
import {useTheme} from '@mui/material/styles';
import {Stack,Paper,Card,Container, Typography} from '@mui/material';
import styled from 'styled-components';

const MainCover=styled.div`
margin: auto;
width:100%;
margin-top:0px;
margin-bottom:1rem;
display:flex;
align-items:center;
position:relative;
background-image:url(${({bg_image})=>bg_image});
background-size:100% 100%;
justify-content:center;
flex-direction:column;
position:relative;
height:40vh;
@medi screen and (max-width:900px){
    mergin-top:0px;
}
@medi screen and (max-width:800px){
    mergin-top:0px;
}
@medi screen and (max-width:600px){
    mergin-top:0px;
}
`;
const CustStack=styled(Stack)`
top:30%;
left:auto;
position:absolute;
animation: slideIn 2s ease-in-out;
@keyframes slideIn {
    from {opacity:0;transform:translateX(-300%);}
    50% {opacity:1;transform:translateX(-100%);}
    to {opacity:1;transform:translateX(0%);}
}
@media screen and (max-width:900px){
top:30%;
left:0%;
}
@media screen and (max-width:600px){
top:20%;
left:0%;
width:100%;

}
@media screen and (max-width:500px){
top:10%;
left:0%;
width:100%;


}
`;
const CoverPage = ({coverImage}) => {
    const theme=useTheme();
    
  return (
    <MainCover
    bg_image={coverImage}
    >
        <CustStack direction="column"
        sx={{background:"rgba(255,255,255,0.3)",
        padding:"1rem",textAlign:"center"
        }}
        >
            <Typography component="h1" variant="h2"
            sx={{color:theme.palette.common.orangeFade3,
            fontSize:{xs:"300%",sm:"400%"}
            }}
            >
                Products and Services
            </Typography>
            <Typography component="h1" variant="h4"
            sx={{color:theme.palette.common.orangeFade2,
            fontSize:{xs:"150%",sm:"200%"},padding:{sm:"1rem"}
            }}
            >
                Understanding the relationship to help you better decide
            </Typography>
        </CustStack>

    </MainCover>
  )
}

export default CoverPage