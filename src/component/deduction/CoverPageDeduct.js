import React,{useContext} from 'react';
import {GeneralContext} from '../../context/GeneralContextProvider';
import {TokenAccessContext} from '../../context/TokenAccessProvider';
import styled from 'styled-components';
import {Typography,Container,Stack, Grid} from '@mui/material';


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

const CoverPageDeduct = () => {
    const {staticImage,changePage}=useContext(GeneralContext);
    const {userAccount}=useContext(TokenAccessContext);
    const image=`${staticImage}/images/bannerBio.png`;

  return (
    <MainCover
    bg_image={image}
    >
        <Container maxWidth="sm">
        <Grid container spacing={{sx:0,sm:1}} sx={{margin:"auto",color:"white"}}>
            <Grid item xs={12} sm={12} md={12} sx={{color:"white",textAlign:"center"}}>
                <Typography component="h1" variant="h6">{userAccount.loaded && userAccount.data.name}</Typography>
                <Typography component="h1" variant="h6">{userAccount.loaded && userAccount.data.email}</Typography>
                <Typography component="h1" variant="h6">{userAccount.loaded && userAccount.data.cell}</Typography>
                <Typography component="h1" variant="h6">{userAccount.loaded && userAccount.data.address}</Typography>
            </Grid>
        </Grid>
        <Deduction direction="column" sx={{width:"100%",color:"white"}}>
            <Typography component="h1" variant="h3" sx={{margin:"1rem auto"}}>Deduction Page</Typography>
            <Typography component="h1" variant="body1">select the service and or Product you would like to remove and add a reduction of cost on your publish cost.</Typography>
        </Deduction>
        </Container>

    </MainCover>
  )
}

export default CoverPageDeduct