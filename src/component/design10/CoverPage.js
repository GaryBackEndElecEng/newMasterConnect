import React, {  useState } from 'react'
import styled from 'styled-components';
// import styles from './design10.module.css';
import { Box, Fab,Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import TwitterIcon from '@mui/icons-material/Twitter';

const MainCover = styled.div`
width:100%;
margin:auto;
position:relative;
display:flex;
z-index:${({z_index})=>z_index};
opacity:${({opacity})=>opacity};
flex-direction:column;
marginBottom:0px;
// height:100vh;
justify-content:flex-start;
align-items:center;
background:${({ bg }) => bg};
overflow-x:hidden;
animation: fadeIn 1.5s ease-in-out;
@keyframes fadeIn {
    from {opacity:0;}
    to {opacity:1;}
}
@media screen and (max-width:900px){
    margin-top:0px;
}
@media screen and (max-width:600px){
    margin-top:0px;
}
@media screen and (max-width:500px){
    margin-top:0px;
}
@media screen and (max-width:400px){
    // height:95vh;
}
`;
const MainImage = styled.img.attrs({className:"mainImg"})`
z-index:${({z_index})=>z_index};
display:${({display})=>display};
animation:${({ keyEffect }) => keyEffect} 4s ease-in-out;
@keyframes slideIn {
    from {opacity:0;transform:scale(0.9);}
    to {opacity:1;transform:scale(1);}
}
@media screen and (max-width:900px){
    animation:${({ keyEffect }) => keyEffect} 9.5s ease-in-out;
    height:83.5vh;
    @keyframes slideIn {
        from {opacity:0;transform:scale(0.9) translateX(-19%);}
        50% {opacity:1;transform:scale(1) translateX(16%);}
        to {opacity:1;transform:scale(1) translateX(0%);}
    }
}
@media screen and (max-width:800px){
    animation:${({ keyEffect }) => keyEffect} 9s ease-in-out;
    height:83.5vh;
    @keyframes slideIn {
        from {opacity:0;transform:scale(0.9) translateX(-19%);}
        50% {opacity:1;transform:scale(1) translateX(16%);}
        to {opacity:1;transform:scale(1) translateX(0%);}
    }
}
@media screen and (max-width:600px){
    animation:${({ keyEffect }) => keyEffect} 9s ease-in-out;
    height:86vh;
    @keyframes slideIn {
        from {opacity:0;transform:scale(0.9) translateX(-25%);}
        50% {opacity:1;transform:scale(1) translateX(25%);}
        to {opacity:1;transform:scale(1) translateX(0%);}
    }
}
@media screen and (max-width:400px){
    animation:${({ keyEffect }) => keyEffect} 9.5s ease-in-out;
    height:84vh;
    @keyframes slideIn {
        from {opacity:0;transform:scale(0.9) translateX(-26%);}
        50% {opacity:1;transform:scale(1) translateX(20%);}
        to {opacity:1;transform:scale(1) translateX(0%);}
    }
}
`;
const MediaBox=styled(Box)`
max-width:35%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
position:absolute;
z-index:1000;
top:20%;
left:0%;
box-shadow:1px 1px 8px 2px rgba(150,50,150,0.5);
@media screen and (max-width:900px){
top:0%;
}
@media screen and (max-width:800px){
top:0%;
}
@media screen and (max-width:600px){
    top:0%;

}
@media screen and (max-width:500px){
    top:0%;

}
`;
const WordBox=styled(Box)`
width:100%;
margin:auto 2rem;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
position:absolute;
z-index:100;
top:10%;
animation:showHere 4s ease-in-out;
@keyframes showHere {
    from {opacity:0;}
    to {opacity:1;}
}
@media screen and (max-width:900px){
    margin:auto 0.5rem;
}
@media screen and (max-width:800px){
    marginTop:0px;
}
@media screen and (max-width:600px){
    margin:auto 0.5rem;
}
`;
const BtnBox = styled(Box)`
display:flex;

@media screen and (max-width:800px){
    position:absolute;
    top:88%;
    left:auto;
}
@media screen and (max-width:500px){
    position:absolute;
    top:92%;
    left:auto;
}
@media screen and (max-width:400px){
position:absolute;
top:90%;
left:auto;
}

`;

let count = 0;
const CoverPage = ({arr,opacity,loadArr}) => {
    const theme = useTheme();
    const [image, setImage] = useState(arr[0]);
    const [transition, setTransition] = useState(false);
    const z_index=opacity===0 ? "-100000":"3";
    const rmBlock = opacity === 0 ? "none": "block";


    const handleRight = () => {
        if (transition === true) {
            setTransition(false)
            setTimeout(() => { setTransition(false); }, 0);
        }

        if (count < 8) {
            setTimeout(() => { setTransition(true); }, 0);
            count++;
            setImage(arr[count]);
            // setTransition(true);
        } else {
            count = 0;
            setImage(arr[count]);
            setTimeout(() => { setTransition(true); }, 0);
        }
    };
    const handleLeft = () => {
        if (transition === true) {
            setTransition(false)
            setTimeout(() => { setTransition(false); }, 0);
        }
        if (count > 0) {
            setTimeout(() => { setTransition(true); }, 0);
            count--;
            setImage(arr[count]);
            // setTransition(true);
        } else {
            count = 8;
            setImage(arr[count]);
            setTimeout(() => { setTransition(true); }, 0);
        }
    };

    return (
        <MainCover
            bg={theme.palette.common.lighter}
            opacity={opacity}
            z_index={z_index}
        >
            <MediaBox sx={{background:theme.palette.common.fadeCharcoal2,padding:"0.25rem",cursor:"pointer"}}>
                <FacebookIcon sx={{margin:"0.25rem auto",color:theme.palette.common.orangeFade2}}/>
                <GoogleIcon sx={{margin:"0.25rem auto",color:theme.palette.common.orangeFade2}}/>
                <AttachEmailIcon sx={{margin:"0.25rem auto",color:theme.palette.common.orangeFade2}}/>
                <TwitterIcon sx={{margin:"0.25rem auto",color:theme.palette.common.orangeFade2}}/>
            </MediaBox>
            {transition && <WordBox
            >
                <Typography component="h1" variant="h3" sx={{fontSize:{xs:"190%",sm:"320%"}}}>{loadArr.loaded && loadArr.data[count].title}</Typography>
                </WordBox>
            }
                {image && <MainImage src={image} alt="www.master-connect.ca" keyEffect={transition ? "slideIn" : ""} z_index={z_index} display ={rmBlock} />}
                <BtnBox
                    sx={{ margin: {sm:"2rem auto",xs:"0.25rem auto"}, }}
                >
                    <Fab variant="circle" color="secondary" sx={{ mr: 3 }} onClick={() => handleLeft()}>
                        <ArrowBackIosIcon sx={{ margin: "auto", fontSize: { xs: "20px", sm: "30px", md: "40px" } }} />
                    </Fab>
                    <Fab variant="circle" color="secondary" sx={{ ml: 3 }} onClick={() => handleRight()}>
                        <ArrowForwardIosIcon sx={{ margin: "auto", fontSize: { xs: "20px", sm: "30px", md: "40px" } }} />
                    </Fab>
                </BtnBox>
            

        </MainCover>
    )
}

export default CoverPage