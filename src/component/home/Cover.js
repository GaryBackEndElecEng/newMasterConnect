import React from "react";
import {GeneralContext} from "../../context/GeneralContextProvider";
import styled from "styled-components";
import { Stack,} from "@mui/material";

import styles from "./home.module.css";
// //start:Y:10% end -40%
const CustCover = styled.div.attrs({className:styles.mainSection})`
// margin:0 auto;
opacity:${({design})=>design ? "1" :"0"};
margin-bottom:0;
width:100%;
height:100vh;
position: sticky;
top:0px;
left:0px;
z-index:0;
display: flex;
flex-direction: column;
align-items: center;
justify-content:center;
background-image:url(${({bgimage})=>bgimage});
background-size:100% 150%;
background-position:50% 10%;  
transition:opacity 2s linear;
animation: ${({show})=>show ? "startEffect":""} 2s ease-in-out;
@keyframes startEffect {
    from {opacity:0;background-position:50% 70%;}
    to {opacity:1;background-position:50% 10%;}
}
@media screen and (max-width:900px){
    background-position:50%  0%;
    background-size:100% 100%;
    @keyframes startEffect {
        from {opacity:0;background-position:50% 70%;background-size:150% 150%;}
        to {opacity:1;background-position:50% 0%;background-size:100% 100%;}
    }
}
@media screen and (max-width:800px){
    height:80vh;
    background-position:50%  0%;
    background-size:120% 100%;
    @keyframes startEffect {
        from {opacity:0;background-position:50% 70%;background-size:150% 150%;}
        to {opacity:1;background-position:50% 0%;background-size:100% 100%;}
    }
}
@media screen and (max-width:600px){
    height:80vh;
    background-size:160% 100%;
    @keyframes startEffect {
        from {opacity:0;background-position:50% 70%;background-size:150% 150%;}
        to {opacity:1;background-position:50% 0%;background-size:160% 100%;}
    }
}


`;
const MainInnerCover = styled.div`
margin:" auto";
position:absolute;
opacity:${({design})=>design ? "1":"0"};
width:100%;
top:-61%;
left:-1%;

padding:10px;
animation:${({design})=>design ? "slideDownNow":""} 3.5s ease-in-out;
@keyframes slideDownNow {
    0% {opacity:0;transform:translateY(-150%) skew(45deg,45deg);}
    20% {opacity:0.1;transform:translateY(-100%) skew(45deg,45deg);}
    30% {opacity:0.2;transform:translateY(-10%) skew(45deg,45deg);}
    50% {opacity:0.4;transform:translateY(-0%) skew(45deg,45deg);}
    100% {opacity:1;transform:translateY(0%) skew(0deg,0deg);}
}
@media screen and (max-width:900px){
    top:-80%;
    left:3%;
}
@media screen and (max-width:800px){
    top:-102%;
    left:3%;
}
@media screen and (max-width:600px){
    top:-105%;
    left:0%;
}
@media screen and (max-width:400px){
    top:-95%;
    left:0%;
}

`;
const MainCoverFollow = styled(Stack)`
margin:" auto";
position:absolute;
opacity:${({opacity})=>opacity};
width:100%;
top:26%;
left:0%;

padding:10px;
animation:${({animation})=>animation };
@keyframes slideUp {
    0% {opacity:0;transform:scaleY(-1) translateY(-10%) ;}
    100% {opacity:1;transform:scaleY(1) translateY(0%);}
    
}
@media screen and (max-width:900px){
    top:18%;
}
@media screen and (max-width:800px){
    top:20%;
}
@media screen and (max-width:600px){
    top:26%;
}
@media screen and (max-width:400px){
    top:22%;
}

`;

const Cover = ({mainPic}) => {
    const {staticImage}=React.useContext(GeneralContext);
    const colorEffect=`${staticImage}/extra/color2Effect.png`;
    const cubeEffect=`${staticImage}/extra/cubeEffect.png`;
    const [show,setShow]=React.useState(false);
    const [design,setDesign]=React.useState(false);
    const [isdesign,setIsdesign]=React.useState(false);
    const [getWidth,setGetWidth]=React.useState(null);
    

    React.useEffect(()=>{
        setTimeout(()=>{setShow(true)},1500);
        if(window.innerWidth){
            setGetWidth(window.innerWidth);
        }
    },[]);

    React.useEffect(()=>{
        if(show){
        setTimeout(()=>{setDesign(true)},1200);
        }
        if(design){
            setTimeout(()=>{setIsdesign(true)},1200);
        }
        
    },[show,design]);
    
    
   
  return (
    <CustCover
    show={show}
    bgimage={mainPic}
    isWidth={getWidth && getWidth > 900 ? true:false}
    design={design}
    className={styles.mainSection}
    >
        <div style={{position:"relative",width:"100vw",margin:0,padding:0,height:"100vh",top:"0px",left:"0px",}}>
        <MainInnerCover
        design={design}
        className={styles.mainInnerCover}
        >
                <Stack direction="column" sx={{justifyContent:"flex-start",alignItems:"center",width:"100%",height:"100vh",}}>
                    
                    <p className={styles.fontStyleMedium} style={{backgroundImage:`url(${cubeEffect})`,fontFamily:"'Philosopher', sans-serif"}}>
                    Website
                    </p>

                </Stack>
            </MainInnerCover>
        <MainCoverFollow
        opacity={isdesign ? "1":"0"}
        animation={isdesign ? "slideUp 2.5s ease-in-out":null}
        className={styles.mainCoverFollow}
        >
                    <p className={styles.fontStylelarge} style={{backgroundImage:`url(${colorEffect})`,fontFamily:"'Philosopher', sans-serif"}}>
                    Design
                    </p>
            </MainCoverFollow>
            </div>
    </CustCover>
  )
}

export default Cover