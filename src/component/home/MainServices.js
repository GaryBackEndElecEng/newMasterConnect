import React from "react";
import { GeneralContext } from "../../context/GeneralContextProvider";
import styled from "styled-components";
import { Stack, Typography, Fab } from "@mui/material";
import styles from "./home.module.css";
import Services from "../ultils/Services";

const CustService=styled.section.attrs({className:styles.afterZebraWhiteMain})`
position:relative;
  margin: auto;
    background-size:130% ${({show2})=>show2 ? 120 :100}%;
    background-position:${({show2})=>show2 ? 0 : 50}% 50%;
    background:var(--background-111);
    z-index:100;
    min-height:85vh;
    width:90vw;
    overflow:hidden;
    opacity:${({show})=>show ? 1:0};
    background-image:url(${({bgimage})=>bgimage});
    display:flex;
    flex-direction:column;
    justify-content:center;
    transition:all 1.5s ease-in;
    // border:1px solid red;
    margin-bottom:10vh;
   animation: ${({show,show2,})=>show || show2 ? "showMsgLionOn" : "showMsgLionOff"} 1.5s ease-in:
   
   @keyframes showMsgLionOff{
    from { opacity:1;}
    to { opacity:0;}
  }
  @keyframes showMsgLionOn{
    from { opacity:0;}
    to { opacity:1;}
  }
  @media screen and (max-width:900px){
    margin:5vh auto;
    min-height:25vh;
    background-size:120% 100%;
      height:43vh;
      width:100%;
      flex-direction:column;
      transition:all 1.5s ease-in;
      background-image:url(${({hasClicked,bgimage,black})=>hasClicked ? black : bgimage});
      animation:${({hasClicked})=>hasClicked ? "showMsgLionOff" : "showMsgLionOn" };
      @keyframes showMsgLionOff{
        from { opacity:1;}
        to { opacity:0;}
      }
      @keyframes showMsgLionOn{
        from { opacity:0;}
        to { opacity:1;}
      }
  }
  @media screen and (max-width:600px){
    background-size:${({show2})=>show2 ? 300 :160}% 120%;
    background-position:12% 30%;
    min-height:78vh;
    width:100%;
    transition:all 1.5s ease-in;
  }
`;


const MainServices = ({pic,pic2,black}) => {
    const serviceRef=React.useRef();
    const [show,setShow]=React.useState(false);
    const [show2,setShow2]=React.useState(false);
    const { isServiceClicked } =React.useContext(GeneralContext);

    React.useEffect(()=>{
        if(show){
            setTimeout(()=>{setShow2(true);},5000);
        }
    },[show]);
    
    React.useEffect(()=>{
        let threshold=window.innerWidth <900 ? 0.5 :0.7;
          const observer=new IntersectionObserver((entries)=>{
              let entry=entries[0];
              if(entry.isIntersecting){
                  setShow(true);
              }
          },{threshold:threshold});
          if(serviceRef.current){
              observer.observe(serviceRef.current);
              return () => {
                observer.disconnect();
              };
          }
      },[]);
  return (
    <div className={styles.mainService} style={{width:"100%"}}>
    <CustService
    bgimage={show2 ? pic2 :pic}
    ref={serviceRef}
    show={show}
    show2={show2}
    hasClicked={isServiceClicked}
    black={black}
  >
    <div
    
    >
      <div>
        <Typography component="h1" variant="h2">
          Services
        </Typography>
      </div>

      <Services />
    </div>
  </CustService>
  </div>
  )
}

export default MainServices