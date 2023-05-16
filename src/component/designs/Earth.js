import React from "react";
import { GeneralContext } from "../../context/GeneralContextProvider";
import styles from "./design.module.css";
import {
  Typography,
} from "@mui/material";
import styled from "styled-components";

const CustEarth=styled.div`
margin:0 auto;
opacity:${({opacity})=>opacity };
background-image:url(${({bgimage})=>bgimage});
width:100%;
  padding:1.5rem;
  padding-block:3rem;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  height:100%;
  background-size:200% 200%;
  background-position:50% 70%;
  @media screen and (max-width:900px){
    background-size:200% 200%;
    background-position:200% 70%;
    animation:${({animation})=>animation};
    @keyframes growIn1 { 
      from {opacity:0;background-position:200% 10%;}
      to {opacity:1;background-position:200% 70%;}
    }
  }
  @media screen and (max-width:900px){
    min-height:75vh;
    padding:0;
  }
  @media screen and (max-width:600px){
    min-height:85vh;
    animation:${({animation})=>animation};
    background-size:300% 200%;
    background-position:50% 80%;
    @keyframes growIn1 { 
      from {opacity:0;background-position:90% 50%; background-size:300% 200%;}
      to {opacity:1;background-position:50% 80% ; background-size:300% 200%;}
    }
  }
`;

const Earth = () => {
    const paraRightRef=React.useRef();
    const { staticImage } = React.useContext(GeneralContext);
    const [turnOn,setTurnOn]=React.useState(null);
    const earth = `${staticImage}/earth.png`;
    const max600=window.innerWidth < 600 ? "h5" :"h4";
    const threshold= window.innerWidth < 1000 ? 0.5:0.8;

    React.useEffect(()=>{
        const observer = new IntersectionObserver(
            (entries) => {
              let entry=entries[0];
                
                  if (entry.isIntersecting) {
                   setTurnOn(true)
                  }
                
          
            },
            { threshold: threshold }
          );
          
            observer.observe(paraRightRef.current);
    },[]);
    
  return (
    <CustEarth
            bgimage={earth}
            animation={turnOn ? "growIn1 3.5s ease-in-out":""}
            opacity={turnOn ? "1":"0"}
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