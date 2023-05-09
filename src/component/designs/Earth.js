import React from "react";
import { GeneralContext } from "../../context/GeneralContextProvider";
import styles from "./design.module.css";
import {
  Typography,
} from "@mui/material";
import styled from "styled-components";

const CustEarth=styled.div`
margin:0 auto;
opacity:${({turnon})=>turnon ? "1":"0"};
  padding:1rem;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  height:65dvh;
  background-size:200% 200%;
  background-position:50% 70%;
  @media screen and (max-width:900px){
    background-size:200% 200%;
    background-position:200% 70%;
    animation:${({turnon})=>turnon ? "growIn":""} 3.5s ease-in-out;
    @keyframes growIn { 
      from {opacity:0;background-position:200% 10%;}
      to {opacity:1;background-position:200% 70%;}
    }
  }
  @media screen and (max-width:600px){
    height:85dvh;
    background-size:400% 200%;
    background-position:30% 50%;
    @keyframes growIn { 
      from {opacity:0;background-position:90% 50%;}
      to {opacity:1;background-position:30% 50%;}
    }
  }
`;

const Earth = () => {
    const paraRightRef=React.useRef();
    const { staticImage } = React.useContext(GeneralContext);
    const [turnOn,setTurnOn]=React.useState(false);
    const earth = `${staticImage}/earth.png`;
    const max600=window.innerWidth < 600 ? "h5" :"h4";
    React.useEffect(()=>{
        const observer = new IntersectionObserver(
            (entries) => {
              let entry=entries[0];
                
                  if (entry.isIntersecting) {
                   setTurnOn(true)
                  }
                
          
            },
            { threshold: 1 }
          );
          
            observer.observe(paraRightRef.current);
    },[]);
    
  return (
    <CustEarth
            // className={styles.earthCont}
            style={{ backgroundImage: `url(${earth})` }}
            turnon={turnOn }
          >
            <div ref={paraRightRef}>
              <Typography
                component={"h1"}
                variant={max600}
                sx={{ backgroundColor: "rgba(0,0,0,.2)", padding: "5px" }}
                className={turnOn ? styles.fontStyle_2 : styles.fontType}
              >
                Do you have a great idea for your site?
              </Typography>
              <Typography
                component={"h1"}
                variant={max600}
                sx={{ backgroundColor: "rgba(0,0,0,.2)", padding: "5px" }}
                className={turnOn ? styles.fontStyle_2 : styles.fontType}
              >
                Are you missing effects on your site to increase exposure?
              </Typography>
              <Typography
                component={"h1"}
                variant={max600}
                sx={{ backgroundColor: "rgba(0,0,0,.2)", padding: "5px" }}
                className={turnOn ? styles.fontStyle_2 : styles.fontType}
              >
                Do you have a target idea, representitive of your company's
                mission statement?
              </Typography>
              <Typography
                component={"h1"}
                variant={max600}
                sx={{ backgroundColor: "rgba(0,0,0,.2)", padding: "5px" }}
                className={turnOn ? styles.fontStyle_2 : styles.fontType}
              >
                Do you desire increased emphasism on a particular page action?
              </Typography>
              <Typography
                component={"h1"}
                variant={max600}
                sx={{ backgroundColor: "rgba(0,0,0,.2)", padding: "5px" }}
                className={turnOn ? styles.fontStyle_2 : styles.fontType}
              >
                Are you tired of slow websites?
              </Typography>
              <Typography
                component={"h1"}
                variant={max600}
                sx={{ backgroundColor: "rgba(0,0,0,.2)", padding: "5px" }}
                className={turnOn ? styles.fontStyle_2 : styles.fontType}
              >
                Tired of not being found on Google?
              </Typography>
            </div>
          </CustEarth>
  )
}

export default Earth