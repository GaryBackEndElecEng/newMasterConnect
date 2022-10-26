import React, {  useState, useContext, useRef,} from 'react';
// import { ContainerHomeFluid, } from '../../styled/Container.styled';
import styled from 'styled-components';
import { GeneralContext } from '../../context/GeneralContextProvider';
import Styles from './home.module.css';
import { Container, Grid, Paper, Stack, Typography } from '@mui/material';
import {useTheme} from '@mui/material/styles'

const BackgroundMiddle = styled.div`
background:${({bg})=>bg};
background-image:url(${({bg2})=>bg2});
background-size:100% 100%;
display:flex;
justify-content:center;
align-items:center;
min-height:30vh;
margin-top:2rem;
position:relative;
@media screen and (max-width:600px){
    
}
`;
const BeautyGirl = styled.img`
position:absolute;
width:280px;
z-index:1000;
left:-40px;
top:22%;
animation:smileAppear 2s ease-in-out;

@keyframes smileAppear {
    from {opacity:0;}
    to {opacity:1;}
}

@media screen and (max-width:900px){
    top:38%;
    width:300px;
}
@media screen and (max-width:600px){
    top:61%;
    left:-70px;
    width:200px;
}

`;


const MiddleBanner = ({bg}) => {
    
    const theme=useTheme();
    const MyRef2=useRef();
    const [makeAppear,setMakeAppear]=useState(false);
    const { staticImage } = useContext(GeneralContext);
    const bgImage = `${staticImage}/middlebannerWallPaper.png`;
    const beautyGirl = `${staticImage}/beautyGirl.png`;
    
    const observer = new IntersectionObserver(entries=>{
        entries.forEach((entry,index)=>{
            if(entry.isIntersecting){
                setMakeAppear(true);
            }else{
                setTimeout(()=>{setMakeAppear(false);},0);
            }
        });
        
        },{threshold:1});
    const observerFunc =(e)=>{
            if(e  ){
                
                observer.observe(e )
            }
    };

    return (
        <BackgroundMiddle bg={theme.palette.home.mediumCyan} bg2={bg} className={`container-fluid ${Styles.middleBanner}`}>
            
            <Container maxWidth={"xl"} sx={{margin:"auto" }}>
                <Paper elevation={10} ref={(e)=>observerFunc(e)}
                    sx={{background:theme.palette.home.emphasize,color:"white",position:"relative"}}
                >
                    { makeAppear && <BeautyGirl src={beautyGirl}   alt="www.master-connect.ca"/>}
                    <Stack direction={"row"} ref={MyRef2}>
                        <Grid container spacing={3} sx={{alignItems:"flex-start",justifyContent:"flex-start",}}>
                            <Grid item xs={12} md={6} sx={{margin:"0 auto",}}>
                                <Stack direction={"column"} sx={{}}>
                                    <Typography className={Styles.midBannerH3} component="h1" variant={"h3"}
                                    sx={{fontSize:{xs:"30px",sm:"40px"},selfPosition:"top", textAlign:"center"}}
                                    >
                                        Create Your Website that Stands Out
                                    </Typography>
                                    </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                
                                    <Stack direction={"column"}>
                                        <Typography className={Styles.midBannerH4} component="h1" variant={"h4"}
                                        sx={{fontSize:{xs:"25px",sm:"30px"},margin:"1rem auto"}}
                                        >
                                            Don't have the Time?
                                        </Typography>
                                        <Typography className={Styles.midBannerH4} component="h1" variant={"h4"}
                                        sx={{fontSize:{xs:"25px",sm:"30px"},margin:"1rem auto"}}
                                        >
                                            Get a Quote,
                                        </Typography>
                                        <Typography className={Styles.midBannerH4} component="h1" variant={"h6"}
                                        sx={{margin:"1rem auto"}}
                                        >
                                            we can help.
                                        </Typography>
                                        
                                    </Stack>
                                
                            </Grid>
                        </Grid>
                    </Stack>
                </Paper>
            </Container>

        </BackgroundMiddle>
    )
}

export default MiddleBanner