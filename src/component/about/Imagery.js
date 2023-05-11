import React from "react";
import styles from "./about.module.css";
import styled from "styled-components";

import {
  Typography,
  Container,
} from "@mui/material";

const HappyOffice = styled.div`
opacity:1;
position:relative;
margin:auto 0px;
padding:auto 0px;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
background-size:100% 100%;
background-position:50% 50%;
background-image:url(${({bgImage})=>bgImage});
/* (0-100,0,100) */
width:100%;
height:100%;
box-shadow:1px 1px 8px 1px black;
animation: appear 10s ease-in-out;
@keyframes appear {
    from {opacity:0;transform:scale(0.5);}
    50% {opacity:1;transform:scale(1);}
    to {opacity:0;}
}
`;

const CombineStylesAppear =styled.div`
opacity:1;
margin:auto 0px;
padding:auto 0px;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
background-size:100% 100%;
background-position:50% 50%;
background-image:url(${({bg})=>bg});
/* (0-100,0,100) */
width:100%;
height:100%;
box-shadow:1px 1px 8px 1px black;
animation: appear 5s ease-in-out;
@keyframes appear {
    from {opacity:0;}
    to {opacity:1;}
}
`;
const TypoEffectMain=styled(Typography)`
  font-family: var(--font-family);
    background-image: var(--background-image-2-left);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    color: transparent;
    margin:1.5rem auto;
  `;

const Imagery = ({slide,happyOffice,happyMain,goText,getWidth,fontSize}) => {
  const thisRef=React.useRef();
  const [activate,setActivate]=React.useState(false);
  

  React.useEffect(()=>{
    const observer= new IntersectionObserver((entries)=>{
      let entry=entries[0]
      setActivate(entry.isIntersecting);
      
      if(entry.isIntersecting){
        
      }
    },{threshold:0.8});
    observer.observe(thisRef.current);
  },[]);

  return (
    <Container maxWidth="xl" sx={{height:"50vh",overflow:"hidden",marginTop:"10vh"}} className={styles.subContainer} ref={thisRef}>

      {!slide  ?
      
      <HappyOffice 
      bgImage={happyOffice}
      >
      <div className={styles.WeWantToGrow}  >
        <Typography component="h1" 
        variant={window.innerWidth <600 ? "h4":"h1"}
        >
          Digital Master Connect</Typography>
        <Typography component="h1" 
        variant={window.innerWidth <600 ? "h6":"h4"}
        >
          We want to grow with you</Typography>
      </div>
      </HappyOffice>
      
      :
      
      <CombineStylesAppear bg={happyMain}>
        { goText && activate &&
        <div style={{margin:"auto"}} className={styles.textSlideIn}>
        <TypoEffectMain component="h1" variant="h1">Imagery</TypoEffectMain>
        <Typography component="h1" variant="h3" className={styles.secondSlideIn}>We apply presentation to your client through effects</Typography>
        </div>
        }
      </CombineStylesAppear>
      
      }

      </Container>
  )
}

export default Imagery