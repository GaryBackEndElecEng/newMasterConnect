import React from 'react';
import {GeneralContext} from '../../context/GeneralContextProvider';
import styles from './home.module.css';
import styled from 'styled-components';
import {Typography,Avatar,CardMedia} from "@mui/material";

const CustSection=styled.section.attrs({className:styles.afterZebraWhite})`
min-height:50vh;
opacity:${({show})=>show ? "1":"0"};
background-image:url(${({bgimage})=>bgimage});
transform:translateY(${({show})=>show ? "0":"50"}%);
background-size:200% 200%;
background-position:50% ${({show})=>show ? "50":"100"}%;

width:100%;
z-index:1000;
display:flex;
justify-content:space-around;
align-items:center;
flex-direction:row;
flex-wrap:nowrap;
background:var(--background-111);
gap:10px;
transition:all 1.5s ease-out;
@media screen and (max-width:900px){
  width:100%;
      min-height:80vh;
      background-size:120% 100%;
      justify-content:center;
      flex-direction:column;
      align-items:center;
      gap:10px;
}
@media screen and (max-width:600px){
  width:100%;
      /* height:100%; */
      justify-content:center;
      flex-direction:column;
      gap:10px;
      height:50vh;
}
`;
const WeGrow = ({growOpacityText,growDownText}) => {
  const showRef=React.useRef();
  const {staticImage}=React.useContext(GeneralContext);
  const [show,setShow]=React.useState(false);
    const black = `${staticImage}/black.png`;
    const thirtie=`${staticImage}/30.png`;
    const knowHow=`${staticImage}/knowHow.png`;
    const systems=`${staticImage}/systems.png`;

React.useEffect(()=>{
  let setThreshold= window.innerWidth < 900 ? 0.5 :0.7;
  
  const observer=new IntersectionObserver((entries)=>{
      let entry=entries[0];
      if(entry.isIntersecting){
        setShow(true);
      }
        
  },{threshold:setThreshold});
  if(showRef.current){
    observer.observe(showRef.current);
    return () => {
      observer.disconnect();
    };
  }
},[]);
  return (
    <div className={styles.thirtyYearsMain}>
    <CustSection 
    bgimage={black}
    show={show}
    ref={showRef}
    >
      
        <div style={{opacity:growOpacityText,transform:`translateY(${growDownText})`,position:"relative"}}>
          
          <CardMedia component="img" src={thirtie} 
          sx={{width:"230px",height:"195px",zIndex:"1000",padding:"0px",borderRadius:"50%"}}
          alt="www.masterconnect.ca"
           />
        </div>
        <div style={{opacity:growOpacityText,transform:`translateY(${growDownText})`,position:"relative"}}>
        <CardMedia component="img" src={knowHow} 
          sx={{width:"320px",height:"200px",zIndex:"1000",padding:"0px",borderRadius:"50%"}}
          alt="www.masterconnect.ca"
           />
        </div>
        <div style={{opacity:growOpacityText,transform:`translateY(${growDownText})`}}>
        <CardMedia component="img" src={systems} 
          sx={{width:"320px",height:"200px",zIndex:"1000",padding:"0px",borderRadius:"50%"}}
          alt="www.masterconnect.ca"
           />
        </div>
      </CustSection>
      </div>
  )
}

export default WeGrow;