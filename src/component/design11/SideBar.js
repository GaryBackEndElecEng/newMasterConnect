import React from 'react'
import styles from './design11.module.css';
import {Avatar,Stack,Typography} from '@mui/material';
import styled from 'styled-components';
import StarIcon from '@mui/icons-material/Star';
import {useTheme} from "@mui/material/styles";

const SideBareMain= styled.div`
position:absolute;
inset:0;
padding:0.5rem;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
background:rgba(0,0,0,0.3);
@media screen and (max-width:900px){
    width:100%;
    
}
@media screen and (max-width:600px){}
`;

const AvatartSpoon=styled(Avatar)`
position:absolute;
z-index:100;
top:7%;
left:15%;
width:100px !important;
height:100px  !important;
border-radius:50%;
transform:rotate(45deg);
background-size:100% 100%;
background-position:50% 50%;
background:transparent;
animation: spinOnce 5.5s ease-in-out;
@keyframes spinOnce {
    from {transform:rotate(360deg);}
    to {transform:rotate(45deg);}
}
@media screen and (max-width:900px){
    left:5%;
    top:10%;
}
@media screen and (max-width:600px){}
`;

const SideBar = ({spoon}) => {
    const theme=useTheme();
    const arrStar=[1,2,3,4,5];
  return (
    <SideBareMain className={styles.sidebarMain}>
            <AvatartSpoon src={spoon}  />
            
        <Typography component="h1" variant="h1" sx={{ fontFamily: "great vibes",background:"rgba(0,0,0,0.5)",padding:"0.5rem",borderRadius:"10%" }}>Eitvell</Typography>
        
        <Stack direction="row">
            {arrStar.map(obj=>(<StarIcon key={obj} sx={{ ml: 1, color: theme.palette.common.darkBlue, fontSize: "26px" }} />))}
        </Stack>
        
    
        <Typography component="h1" variant="h4" sx={{ marginLeft: "10px", margin: "1rem auto" }}>Fine Cuisine</Typography>
        <Typography component="h1" variant="h6" sx={{ marginLeft: "10px" }}>123 my address,</Typography>
        <Typography component="h1" variant="h6" sx={{ marginLeft: "10px" }}>city, Country</Typography>
    </SideBareMain>
  )
}

export default SideBar