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
position:relative;
align-items:center;
flex-direction:column;
min-height:46vh;
background-image:url(${({bg_image})=>bg_image});
background-size:100% 100%;

`;
const Deduction=styled(Stack)`
margin:auto;
animation: slideIn 2s ease-in-out;
background:${({bg})=>bg};
z-index:100;
@keyframes slideIn {
    from {transform:translateX(-100%);}
    to {transform:translateX(0%);}
}

`;
const SpecialImage=styled.img`
height:100%;
z-index:99999;
margin:0 auto;
margin-top:0;
position:absolute;
top:1%;
left:calc(${50-30}%);
animation: GrowImageIn 6s ease-in-out;
@keyframes GrowImageIn {
    from {opacity:0;transform:translateX(-30%);}
    to {opacity:1;}
}
@media screen and (max-width:900px){
    left:calc(${50-55}%);
    z-index:2;
}
`;
const SpecialImage11=styled.img`
height:100%;
z-index:99999;
margin:0 auto;
margin-top:0;
position:absolute;
top:1%;
right:calc(${50-30}%);
animation: GrowImageIn 6s ease-in-out;
@keyframes GrowImageIn {
    from {opacity:0;transform:translateX(-30%);}
    to {opacity:1;}
}
@media screen and (max-width:1100px){
    display:none;
}

`;

const CoverPage = () => {
    const theme=useTheme();
    const {staticImage}=useContext(GeneralContext);
    const image=`${staticImage}/images/bannerBio.png`;
    const specialImg=`${staticImage}/specialImg.png`;
    const specialImg1=`${staticImage}/specialImg1.png`;

  return (
    <MainCover
    bg_image={image}
    >
        <SpecialImage src={specialImg}/>
        <Container maxWidth="sm">
        <Stack direction="column" sx={{margin:"auto",color:"white",position:{sm:"relative",xs:"absolute"},textAlign:"center",background:theme.palette.common.fadeCharcoal,padding:"0.25rem",top:"0%",left:{sm:"20%",xs:"50%",md:"0%"},zIndex:{xs:"0"}}}>
                <Typography component="h1" variant="h1"
                sx={{fontSize:{xs:"250%"}}}
                >
                    
                    Packages
                
                </Typography>
           
        </Stack>
        <Deduction direction="column" 
        sx={{color:"white",
        padding:"0.25rem",
    
    }}
        >

            <Typography component="h1" variant="h5" 
            sx={{margin:" auto",
            position:{sm:"relative",xs:"absolute"},
            top:"55%",
            left:{xs:"1%",sm:"20%",md:"0%"},
            zIndex:{xs:"10",sm:"0"},
            background:{md:theme.palette.common.fadeCharcoal,xs:theme.palette.common.fadeCharcoal3},
        }}
            >
                Choose the Right Package For You
            </Typography>
            
        </Deduction>

        </Container>
        <SpecialImage11 src={specialImg1}/>
    </MainCover>
  )
}

export default CoverPage