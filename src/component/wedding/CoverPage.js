import React from 'react';
import {Stack,Typography} from "@mui/material";
import styled from "styled-components";
import styles from './wedding.module.css';
// import { useTheme } from '@mui/material/styles';

const CustCover=styled.div.attrs({className:"custCover"})`
margin:0 auto;
margin-top:0rem;
margin-bottom:-30px;
position:relative;
padding:0;
height:100vh;
display:flex;
justify-content:center;
// border:1px solid red;
align-items:center;
overflow:hidden;
flex-direction:column;
background-image:url(${({bgimage})=>bgimage});
background-size:150% 150%;
background-position:100% 50%;
animation: movecloud 30s ease-in-out alternate ${({stopsky})=>stopsky};
@keyframes movecloud {
    from {opacity:1;background-position:0% 50%;}
  50% {opacity:1;background-position:100% 50%;}
  to {opacity:1;background-position:0% 50%;}
}
@media screen and (max-width:900px){
    background-size:300% 100%;
    background-position:50% 50%;
    @keyframes movecloud {
        from {opacity:1;background-position:0% 50%;}
      50% {opacity:1;background-position:30% 50%;}
      to {opacity:1;background-position:0% 50%;}
    }
}
@media screen and (max-width:600px){
    background-size:400% 100%;
    background-position:100% 100%;
    @keyframes movecloud {
        from {opacity:1;background-position:0% 0%;}
      50% {opacity:1;background-position:50% 0%;}
      to {opacity:1;background-position:0% 0%;}
    }
}
`;
const WeddingTree = styled.img.attrs({className:"weddingTree"})`
position:absolute;
background:transparent;
// background:black;
left:0%;
top:0%;
width:100%;
height:100%;
transform: translateY(${({yscroll})=>yscroll < 60 ? yscroll : "60"}%);

transition:all 0.25s linear;

@media screen and (max-width:900px){
z-index:4000;
// top:0%;
left:-40%;
width:150%;
background-position: 50% ${({yscroll})=>yscroll < 100 ? yscroll : "50"}%;
}
@media screen and (max-width:600px){
// top:-10%;
background-position: 50% ${({yscroll})=>yscroll < 100 ? yscroll : "50"}%;
}
`;
const WeddingMsg = styled.div`
position:absolute;
opacity:${({shad})=>shad > 44 ? "0":30/(1+shad)};
top:20%;
left:33%; 
margin:auto;
background:linear-gradient(136deg, ${({bg})=>bg}, rgb(165, 235, 245) 50% );
// z-index:-200;
transform:translateY(${({ transY }) => transY}%);
box-shadow: 3px 5px ${({ shad }) => shad}px 1px  grey,-3px -5px ${({ shad }) => shad}px -1px  grey;

transition:all 0.15s linear;
max-width:600px;
display:flex;
justify-content:center;
align-items:center;
@media screen and (max-width:900px){
left:12%;
}
@media screen and (max-width:600px){
top:5%;
left:0%;
}
`;

const CoverPage = ({weddingSky,weddingTreePx,weddingTree,bg}) => {
    // const theme = useTheme();
    let adjustWedTreePerc=(-weddingTreePx *10/2/10);
    let adjustWedMsgPerc=(-weddingTreePx * 10/3/1);
    let shad=- weddingTreePx;
    const stopsky= shad > 40 ? "paused" :"infinite";
    
  return (
    <CustCover
    bgimage={weddingSky}
    stopsky={stopsky}
    >
        <WeddingTree
        yscroll={adjustWedTreePerc}
        boxdisp={Math.floor(weddingTreePx / 2)}
        className={styles.weddingTree} 
        src={weddingTree}
        />
        <WeddingMsg
        transY={adjustWedMsgPerc}
        shad={shad}
        bg={bg}
        >
        <Stack direction="column" >
              <Typography component="h1" variant="h1"
                sx={{ fontFamily: "Ibarra Real Nova", color: "white", ml: 2, }}
              >Wedding, Inspired by Love
              </Typography>
            </Stack>
        </WeddingMsg>
    </CustCover>
  )
}

export default CoverPage