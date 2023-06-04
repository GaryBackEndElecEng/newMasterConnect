import React from "react";
import { GeneralContext } from "../../context/GeneralContextProvider";
import styled from "styled-components";
import { Stack, Typography, Fab } from "@mui/material";
import styles from "./home.module.css";
import Services from "../ultils/Services";

const CustService=styled.section.attrs({className:styles.afterZebraWhiteMain})`
position:relative;
  margin: auto;
    background-size:150% ${({show2})=>show2 ? 150 :100}%;
    background-position:${({show2})=>show2 ? 0 : 50}% 0%;
    // background-color:var(--background-111);
    z-index:100;
    min-height:85vh;
    width:90vw;
    overflow:hidden;
    opacity:${({show})=>show ? 1:0};
    background-image:url(${({bgimage})=>bgimage});
    filter:saturate(1.75);
    display:flex;
    flex-direction:column;
    justify-content:center;
    // border:1px solid red;
    padding-bottom:10vh;
   animation:${({animation})=>animation};
   
  @keyframes showMsgBango{
    from { opacity:0;background-size:100% 100%;background-position:50% 50%;}
    to { opacity:1;background-size:150% 100%;background-position:50% 0%;}
  }
  @keyframes showMsgBangoOn{
    from { background-size:150% 100%;background-position:50% 0%;}
    to {background-size:150% 150%;background-position:0% 0%;}
  }
  @media screen and (max-width:920px){
    padding:5vh auto;
    min-height:65vh;
    background-size:150% 100%;
    background-position:50% 0%;
    @keyframes showMsgBango{
      from { opacity:0;background-size:100% 100%;background-position:50% 50%;}
      to { opacity:1;background-size:150% 100%;background-position:0% 0%;}
    }
    @keyframes showMsgBangoOn{
      from { background-size:150% 100%;background-position:0% 0%;}
      to {background-size:150% 150%;background-position:50% 0%;}
    }
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
    background-size:${({show})=>show ? 300 :160}% 120%;
    background-position:12% 30%;
    min-height:86vh;
    width:100%;
    transition:all 1.5s ease-in;
  }
  @media screen and (max-width:385px){
    min-height:110vh;
    
  }
`;


const MainServices = ({pic,pic2,black}) => {
    const serviceRef=React.useRef();
    const [show,setShow]=React.useState(false);
    const [show2,setShow2]=React.useState(false);
    const { isServiceClicked } =React.useContext(GeneralContext);

    React.useEffect(()=>{
        if(show){
            setTimeout(()=>{setShow2(true);},4000);
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
    className={styles.afterZebraWhiteMain}
    bgimage={pic2}
    ref={serviceRef}
    show={show}
    show2={show2}
    hasClicked={isServiceClicked}
    black={black}
    animation={show2 ? 
      "showMsgBangoOn 1.5s ease-in-out"
    :
    (show ? "showMsgBango 1.5s ease-in-out" :"")
  }
  >
    <div
    className={styles.headServices}
    >
      <div>
        <Typography component="h1" variant="h2"
        className={styles.fontServices}
        >
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