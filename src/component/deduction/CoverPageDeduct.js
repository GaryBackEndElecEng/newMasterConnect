import React,{useContext} from 'react';
import {GeneralContext} from '../../context/GeneralContextProvider';
import {TokenAccessContext} from '../../context/TokenAccessProvider';
import styled from 'styled-components';
import {Typography,Container,Stack, Grid} from '@mui/material';
import styles from './deduction.module.css'
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

const CoverPageDeduct = ({credited}) => {
    const theme=useTheme();
    const {staticImage}=useContext(GeneralContext);
    const {userAccount}=useContext(TokenAccessContext);
    const image=`${staticImage}/images/bannerBio.png`;

  return (
    <MainCover
    bg_image={image}
    >
        <Container maxWidth="sm">
        <Grid container spacing={{sx:0,sm:1}} sx={{margin:"auto",color:"white",position:"relative"}}>
            <Grid item xs={12} sm={12} md={12} sx={{color:"white",textAlign:"center",background:theme.palette.common.fadeCharcoal,padding:"1rem"}}>
                <Typography component="h1" variant="h6">{userAccount.loaded && userAccount.data.name}</Typography>
                <Typography component="h1" variant="h6">{userAccount.loaded && userAccount.data.email}</Typography>
                <Typography component="h1" variant="h6">{userAccount.loaded && userAccount.data.cell}</Typography>
                <Typography component="h1" variant="h6">{userAccount.loaded && userAccount.data.address}</Typography>
            </Grid>
            {credited && 
            <Typography className={styles.credit} component="h1" variant="h4"
            sx={{fontSize:{xs:"160%",sm:"230%", md:"auto"}}}
            >
                You have a credit of 
            ${credited.subTotal}.<sup>00</sup>
            </Typography>
            }
        </Grid>
        <Deduction direction="column" sx={{width:"100%",color:"white",background:theme.palette.common.fadeCharcoal,padding:"1rem"}}>
            <Typography component="h1" variant="h3" sx={{margin:"1rem auto"}}>Deduction Page</Typography>
            <Typography component="h1" variant="body1">select the service and or Product you would like to remove and add a reduction of cost on your publish cost.</Typography>
            <Typography component="h1" variant="body2" sx={{background:"white",color:"red",padding:"0.5rem",margin:"1rem auto"}}>Please Note: once payment has been completed and the developer has initiated your project, your items will show.</Typography>
        </Deduction>
        </Container>

    </MainCover>
  )
}

export default CoverPageDeduct