import React, { useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
// import styles from './home.module.css';
import styled from 'styled-components';
import { Box, Container, Fab, Stack, Typography } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import FunctionsIcon from '@mui/icons-material/Functions';
import CalculateBtn from './CalculateBtn';


const BannerBox = styled(Box)`
margin: 1rem auto;
width:100%;
height:36vh;
position:relative;
background-image:url(${({ bg_image }) => bg_image});
background-size:100% 100%;
@media screen and (max-width:900px){
    
}
@media screen and (max-width:600px){
    margin:3rem auto;
    height:26vh;
}
`;
const CustomImage = styled.img`
z-index:100;
position:absolute;
top:0%;
left:0%;
width:35%;
max-height:36vh;
opacity:1;
z-index:0;
@media screen and (max-width:900px){
    width:100%;
    height:auto;
}
@media screen and (max-width:600px){
    width:100%;
    height:40vh;
    opacity:1;
    transform:translateY(-10%);
}

`;
const CustomImage2 = styled.img`
display:block;
z-index:100;
position:absolute;
top:0%;
right:0%;
width:35%;
max-height:36vh;
opacity:1;
@media screen and (max-width:900px){
    width:58%;
    opacity:0;
    display:none;
}
@media screen and (max-width:600px){
    display:none;
    width:100%;
    height:30vh;
    opacity:0;
}
`;
const CalculateBanner = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { setChangePage,staticImage } = useContext(GeneralContext);
    const calcPic = `${staticImage}/images/calculator1.png`;
    const coffee = `${staticImage}/images/coffee1.JPG`;
    const [activatePrep,setActivatePrep]=useState(false);

    const handleActivateMsg = (e) => {
        e.preventDefault();
        setActivatePrep(true);
    }
    return (
        <BannerBox bg_image={calcPic}>
            <CustomImage src={coffee} alt="www.master-connect.ca" />
            <Container maxWidth="md"
                sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" ,height:"100%",position:"relative"}}
            >
                <Stack direction={{ xs: "column", sm: "row", md: "column" }} spacing={{ xs: 0, sm: 1, md: 2 }}
                    sx={{
                        justifyContent: { md: "center", xs: "center" },
                        alignItems: { md: "center", xs: "center" }, color: theme.palette.common.fadeCharcoal3,
                        padding: { md: "1rem", xs: "2rem" }, zIndex: "1",
                        background: { xs: theme.palette.common.blueFade, sm: theme.palette.common.blueFade, md: "transparent" },marginTop:{xs:"4rem",md:"1rem"}
                    }}
                >
                    <Stack direction="row" spacing={{ xs: 1, sm: 2 }}>
                        <CalculateIcon sx={{ mr: 2, color: "black", fontSize: { xs: "40px", sm: "40px", md: "60px" } }} />
                        <Typography component="h1" variant="h4"> Calculator</Typography>
                    </Stack>
                    <Typography component="h1" variant="h5" sx={{ color: { md: "blue", xs: "white", sm: "white" } }}> ( estimate your cost ),</Typography>
                    <Typography component="h1" variant="h5" sx={{ margin: "2rem auto", marginLeft: "2rem",color:{xs:"white"} }}>  with a coffee </Typography>
                </Stack>
                <Stack direction="column" spacing={{ xs: 0, sm: 1 }} sx={{
                    padding: "1rem", marginTop: { md: "2rem", sm: "4rem" },
                    marginBottom: { xs: "2rem", sm: "1rem" }
                }}>
                    { !activatePrep ? 
                    <Fab variant="extended" size="large" color="success"
                        onClick={(e) => handleActivateMsg(e)}
                        sx={{ padding: "1rem" }}
                    >
                        <FunctionsIcon sx={{ mr: 2, color: "red", }} /> let's calculate
                    </Fab>
                    
                    :
                    <CalculateBtn/>
                    }
                </Stack>
            </Container>
            <CustomImage2 src={coffee} alt="www.master-connect.ca" />
        </BannerBox>
    )
}

export default CalculateBanner