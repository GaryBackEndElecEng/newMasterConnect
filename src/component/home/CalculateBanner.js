import React, { useContext, } from 'react';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
// import styles from './home.module.css';
import styled from 'styled-components';
import { Box, Container, Fab, Grid, Paper, Stack, Typography } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import FunctionsIcon from '@mui/icons-material/Functions';


const BannerBox=styled(Box)`
margin: 2rem auto;
width:100%;
height:30vh;
position:relative;
background-image:url(${({bg_image})=>bg_image});
background-size:100% 100%;
@media screen and (max-width:900px){
    overflow-y:hidden;
}
`;
const CustomImage=styled.img`
z-index:100;
position:absolute;
top:0%;
left:0%;
width:35%;
max-height:30vh;
opacity:0.3;
@media screen and (max-width:900px){
    width:100%;
    height:auto;
}
@media screen and (max-width:600px){
    width:100%;
    height:30vh;
    opacity:0.2;
}
`;
const CustomImage2=styled.img`
z-index:100;
position:absolute;
top:0%;
right:0%;
width:35%;
max-height:30vh;
opacity:0.3;
@media screen and (max-width:900px){
    width:58%;
    opacity:0;
}
@media screen and (max-width:600px){
    width:100%;
    height:30vh;
    opacity:0;
}
`;
const CalculateBanner = () => {
    const navigate=useNavigate();
    const theme=useTheme();
    const { setChangePage} =useContext(GeneralContext);
    const calcPic="https://new-master.s3.ca-central-1.amazonaws.com/static/images/calculator.png";
    const coffee="https://new-master.s3.ca-central-1.amazonaws.com/static/images/coffee1.JPG";

    const handleTransfer = (e)=>{
        e.preventDefault();
        navigate("/calculate",setChangePage(true))
    }
  return (
    <BannerBox bg_image={calcPic}>
        <CustomImage  src={coffee} alt="www.master-connect.ca"/>
        <Container maxWidth="md" 
        sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}
        >
            <Stack direction={{xs:"column",sm:"row"}} spacing={{xs:0,sm:1,md:2}}
            sx={{justifyContent:"center",alignItems:"center",color:"white",padding:"1rem",}}
            >
                <CalculateIcon sx={{mr:2,color:"white",fontSize:{xs:"20px",sm:"30px",md:"40px"}}}/>
                <Typography component="h1" variant="h4"> Calculator</Typography>
                <Typography component="h1" variant="h5"> ( estimate your cost )</Typography>
            </Stack>
            <Stack direction="column" spacing={{xs:0,sm:1}} sx={{padding:"1rem",marginTop:{md:"2rem",sm:"4rem"}}}>
                <Fab variant="extended" size="large" color="success"
                onClick={(e)=>handleTransfer(e)}
                >
                   <FunctionsIcon sx={{mr:2,color:"red",}}/> I want to Calculate my cost
                </Fab>
            </Stack>
        </Container>
        <CustomImage2  src={coffee} alt="www.master-connect.ca"/>
    </BannerBox>
  )
}

export default CalculateBanner