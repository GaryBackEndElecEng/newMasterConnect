import React from "react";
import { GeneralContext } from "../../context/GeneralContextProvider";
import styles from "./design.module.css";
import {
  Typography,
} from "@mui/material";
import styled from "styled-components";

const CustGirl = styled.div`
margin:auto;
background-image:url(${({bgimage})=>bgimage});
opacity:${({turnon})=>turnon ? "1":"0"};
height:400px;
width:${({turnon})=>turnon ? "100":"50"}%;
background-position:50% 50%;
background-size:100% 100%;
transition:width 1.5s ease-in-out;
animation ${({turnon})=>turnon ? "slideIn" : "slideOut"} 1.5s ease-in-out;
// border:1px solid red;
z-index:200;
@keyframes slideIn {
  from { opacity:0;transform:translateX(-100%);background-size:200% 200%;}
  to { opacity:1;transform:translateX(0%);background-size:100% 100%;}
}
@keyframes slideOut {
  from { opacity:1;transform:translateX(0%);background-size:100% 100%;}
  to {opacity:0;transform:translateX(-100%);background-size:200% 200%;}
}

@media screen and (max-width:900px){
  width:100vw;
  height:600px;
  background-size:150% 100%;
  transform:translateX(0%);
  @keyframes slideIn {
    from { opacity:0;transform:translateX(-100%);background-size:300% 200%;}
    to { opacity:1;transform:translateX(0%);background-size:150% 100%;}
  }
  @keyframes slideOut {
    from { opacity:1;transform:translateX(0%);background-size:150% 100%;}
    to {opacity:0;transform:translateX(-100%);background-size:300% 200%;}
  }
  
}
@media screen and (max-width:600px){
height:400px;
background-size:200% 100%;
@keyframes slideIn {
  from { opacity:0;transform:translateX(-100%);background-size:400% 200%;}
  to { opacity:1;transform:translateX(0%);background-size:200% 100%;}
}
@keyframes slideOut {
  from { opacity:1;transform:translateX(0%);background-size:200% 100%;}
  to {opacity:0;transform:translateX(-100%);background-size:400% 200%;}
}

}
`;

const Girl = () => {
  const girlRef_ = React.useRef(null);
  const { staticImage } = React.useContext(GeneralContext);
  const [turnon,setTurnOn]=React.useState(false);
  const girl = `${staticImage}/beautyGirl.png`;
  const threshold= window.innerWidth < 900 ? 0.7 :1;

  React.useEffect(() => {
    const observer2 = new IntersectionObserver(
      (entries) => {
        let entry=entries[0];
          if (entry.target) {
            if (entry.isIntersecting) {
             setTurnOn(true)
            }else{
                setTurnOn(false);
            }
          }
    
      },
      { threshold: threshold }
    );
    
      observer2.observe(girlRef_.current);
    
  }, []);
  
  return (
    <div ref={girlRef_} style={{margin:"auto",width:"100%",height:"100%"}}>
    <CustGirl
    bgimage={girl}
    turnon={turnon}
    className={styles.girlOn }
    
    >
      <Typography
        component={"h1"}
        variant={"h2"}
        sx={{ backgroundColor: "rgba(0,0,0,.2)", padding: "5px" }}
        className={turnon ? styles.fontStyleGirlOn : styles.fontStyleGirlOff}
      >
        Why wait?
      </Typography>
    </CustGirl>
    </div>
  );
};

export default Girl;
