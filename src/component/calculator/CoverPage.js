import React from 'react';
import { useTheme } from '@mui/material/styles';
import styles from './calculate.module.css';
import styled from 'styled-components';
import { Box, Container,Stack, Typography } from '@mui/material';

const MainCoverPage = styled(Box)`
margin:auto;
margin-top:-20px;
width:100vw;
z-index:0;
position:relative;
background-image:url(${({ bg_image }) => bg_image});
background-size: 100% 100%;
min-height:40vh;
animation: appearIn 1s ease-in;
@keyframes appearIn {
    from {opacity:0;}
    to {opacity:1;}
}
@media screen and (max-width:900px){

}
@media screen and (max-width:600px){
    min-height:53vh;
}
@media screen and (max-width:380px){
    min-height:66vh;
}

`;
const SlideInContainer = styled(Container)`
position:absolute;
margin: 3rem auto;
left:28%;
display:flex;
justify-content:center;
alignItems:center;
flex-direction:column;
color:white;
padding:1rem;
box-shadow:1px 1px 13px 7px grey;
background:rgba(0,0,0,.7);
animation: slideIn 2s ease-in-out;
@keyframes slideIn {
    from {opacity:0;transform:translateX(-100%);}
    to {opacity:1;}
}
@media screen and (max-width:900px){
left:0%;

}
@media screen and (max-width:600px){
    margin:auto;
}

`;
const CoverPage = () => {
    const theme = useTheme();
    const coffee = "https://new-master.s3.ca-central-1.amazonaws.com/static/images/coffee1.JPG";
    return (
        <MainCoverPage
            bg_image={coffee}
        >
            <SlideInContainer maxWidth={"md"}>
                <Typography component="h1" variant="h4" sx={{margin:"0.5rem auto"}}>Welcome to the Calculator</Typography>
                <Typography component="h1" variant="h5" sx={{margin:"0.5rem auto"}}>Choose from the drop-downs</Typography>
                <Stack direction="column" sx={{ margin: "1rem auto" }} spacing={{ xs: 1, sm: 2 }}>
                    <Typography component="h1" variant="h6">Services have dependancies and should remain together - reason to why we are asking questions on what you want or require.</Typography>
                    <Typography className={styles.relaxTypo} component="h1" variant="h3"
                    sx={{fontFamily:"Tangerine"}}
                    > sit back with a coffee and let the system guide you.</Typography>
                </Stack>
            </SlideInContainer>

        </MainCoverPage>
    )
}

export default CoverPage