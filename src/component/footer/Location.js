import React, { useContext,useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Divider, Link, Paper, Stack, Typography, Container, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ContainerFooterFluid } from '../../styled/Container.styled';
import { GeneralContext } from '../../context/GeneralContextProvider';

const Location = () => {
    const {staticImage,generalInfo}=useContext(GeneralContext);
    const getSiteArray= generalInfo.loaded ? generalInfo.data:null;
    const [sites,setSites]=useState({loaded:false,data:[]});
    const theme = useTheme();
    const profilePic=`https://new-master.s3.ca-central-1.amazonaws.com/finalMe.png`
    useEffect(()=>{
        if(getSiteArray){
            setSites({loaded:true,data:getSiteArray})
           
        }
    },[getSiteArray,generalInfo]);

    return (
        <ContainerFooterFluid>
            <Container maxWidth="md" >
            <Divider sx={{ margin: "1rem" }} />
                
                
                <Stack direction="row" sx={{ justifyContent: "center" ,alignItems:"center"}}>
                    <Typography component="h1" variant="h4" sx={{ fontFamily: "Roboto",color: theme.palette.footer.bannerWords,fontSize:{xs:"14px",sm:"30px"} }}>
                        Master-Connect:
                    </Typography>
                    <Typography component="h1" variant="h5" sx={{fontFamily: "Roboto", color: theme.palette.secondary.main, ml: 3, fontSize: { xs: "12px", sm: "30px" } }}>{sites.loaded && sites.data.address},</Typography>
                    <Typography component="h1" variant="h5" sx={{fontFamily: "Roboto", color: theme.palette.secondary.main, ml: 3, fontSize: { xs: "12px", sm: "30px" } }}>{sites.loaded && sites.data.country},</Typography>
                    <Typography component="h1" variant="h5" sx={{fontFamily: "Roboto", color: theme.palette.secondary.main, ml: 3, fontSize: { xs: "12px", sm: "30px" } }}>{sites.loaded && sites.data.provState},</Typography>
                </Stack>
                <Divider />
                <Stack direction={"row"} sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Typography component="h1" variant="body2" sx={{fontFamily: "Roboto", color: theme.palette.secondary.main, ml: 3,}}>{sites.loaded && sites.data.extra},</Typography>
                </Stack>
                <Divider />
            </Container>
        </ContainerFooterFluid>
    )
}

export default Location