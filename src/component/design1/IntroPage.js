import React from 'react';
import {useLocation} from 'react-router-dom';
import { Typography,Container} from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider.js';
import styled from 'styled-components';
import styles from './design1.module.css';
import introArr from './intro';

const DivImageContainer=styled.div`
margin:4.5rem auto;
min-height:60dvh;
position:relative;
width:100%;
filter:saturate(1.5);
background-image:url(${({bgimage})=>bgimage});
box-shadow:var(--box-shadow-normal);
z-index:200;


@media screen and (max-width:900px){
height:40vh;
width:100%;
}
@media screen and (max-width:600px){
  // margin-top:-54px;
  width:100%;
  background-size:${({bgsizex})=>bgsizex}% ${({bgsizey})=>bgsizey}%;

}
`;
const IntroPage = ({one,staticImage,play,image1}) => {
  // const {staticImage2}=React.useContext(GeneralContext);
  const plank=`${staticImage}/design1/plank.png`;
  const [last,setlast]=React.useState(false);
  const[size600,setSize600]=React.useState(null);
  const[fontsize,setFontsize]=React.useState("h2");
  const stylelast= last  ? styles.imageContainerAnimateLast: play ? styles.imageContainerAnimate : styles.imageContainerClean;
  React.useEffect(()=>{
    if(window.innerWidth && window.innerWidth <600){
      setSize600(100);
      setFontsize("h4");
    }
  },[]);
  React.useEffect(()=>{
    if(one.name){
      if(parseInt(one.id)===9){
        setlast(true);
      }
  }
  },[one]);
  
  return (
   
    <Container maxWidth="xl" sx={{margin:0,padding:{xs:0,sm:"5px"},boxShadow:"var(--box-shadow-normal)",background:"rgba(255,255,255,0.4)"}} >
            
                
                <div style={{position:"relative",}}>
                  <DivImageContainer
                  bgimage={play ? `${staticImage}/${one.image}`: image1 }
                  bgsizex={size600}
                  bgsizey={200}
                  className={stylelast}
                  />  
                  <Typography component="h1" variant={fontsize} className={!play ? styles.imageContainerTitleOn : styles.imageContainerTitleOff}>{!play && one && one.name}</Typography>
                  </div>
                
              
          </Container>
  )
}

export default IntroPage