import React,{useContext} from 'react';
import {GeneralContext} from '../../context/GeneralContextProvider';
import {TokenAccessContext} from '../../context/TokenAccessProvider';
import styled from 'styled-components';
import {Typography,Container,Stack, Grid} from '@mui/material';
import {useTheme} from '@mui/material/styles';


const MainCover= styled.div`
width:100vw;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
min-height:40vh;
background-image:url(${({bg_image})=>bg_image});
background-size:100% 100%;

`;
const Deduction=styled(Stack)`
margin:auto;
animation: slideIn 2s ease-in-out;
@keyframes slideIn {
    from {transform:translateX(-100%);}
    to {transform:translateX(0%);}
}

`;

const CoverPage = () => {
    const theme=useTheme();
    const {staticImage}=useContext(GeneralContext);
    const {userAccount}=useContext(TokenAccessContext);
    const image=`${staticImage}/images/bannerBio.png`;

  return (
    <MainCover
    bg_image={image}
    >
        <Container maxWidth="sm">
        <Stack sx={{margin:"auto",color:"white",position:"relative"}}>
            <Grid item xs={12} sm={12} md={12} sx={{color:"white",textAlign:"center",background:theme.palette.common.fadeCharcoal,padding:"1rem"}}>
                <Typography component="h1" variant="h1">Packages</Typography>
            </Grid>
           
        </Stack>
        <Deduction direction="column" sx={{width:"100%",color:"white",background:theme.palette.common.fadeCharcoal,padding:"1rem"}}>
            <Typography component="h1" variant="h5" sx={{margin:"1rem auto"}}>Choose the Right Package For You</Typography>
            
        </Deduction>
        </Container>

    </MainCover>
  )
}

export default CoverPage