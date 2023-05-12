import React from 'react'
import styles from './home.module.css';
import styled from 'styled-components';
import {Stack,Typography,Box} from '@mui/material';


const CustPhrase= styled(Typography)`
margin:auto 3rem;
font-family: var(--font-family);
opacity:${({opacity})=>opacity};
transform:translateY(${({translatey})=>translatey});
transition:all 1.62s ease-in-out;
// border:1px solid red;
`;
const CustStyleEffect= styled.span`
opacity:${({opacity})=>opacity};
font-family: var(--font-family);
background-image: var(--background-image-1-left);
background-size:${({backgroundsize})=>backgroundsize};
transform:translateX(${({translatex})=>translatex}) scale(${({scale})=>scale});
transition:all 2.5s ease-in-out;
-webkit-background-clip: text;
-moz-background-clip: text;
background-clip: text;
color: transparent;
margin-bottom:0.62rem;
`;

const PhraseEffect = ({sizeLet2,generalInfo}) => {
    const paraRef=React.useRef(null);
    const [showIn,setShowIn]=React.useState(null);
    const [showIn2,setShowIn2]=React.useState(null);
    const [cell,setCell]=React.useState("");
    
    React.useEffect(()=>{
        if(generalInfo.loaded){
            setCell(generalInfo.data.cell)
        }
    },[generalInfo.loaded,generalInfo.data]);

    

    React.useEffect(()=>{
        const observer= new IntersectionObserver(entries=>{
                let entry=entries[0];
                    setShowIn(entry.isIntersecting);
        },{threshold:0.5});
        if(paraRef.current){
            observer.observe(paraRef.current);
        }
    },[]);
   
    React.useEffect(()=>{
        if(showIn){
            setTimeout(()=>{
                setShowIn2(true);
            },1500);
        }else{setShowIn2(null);}
    },[showIn]);
   
  return (
    <CustPhrase
    ref={paraRef}
    opacity={showIn ? "1":"0"}
    translatey={showIn ? "0%" : "-200%"}
    component="h1" variant={sizeLet2} style={{marginTop:"3rem"}}
    className={styles.ourwebDesignBg}
    >
        Let us show you who we are - Give Us a Call to show you our
        <CustStyleEffect
        opacity={showIn2 ? "1":"0"}
        backgroundsize={showIn2 ? "50% 50%" : "200% 200%"}
        scale={showIn2 ? "1":"1.2"}
        > Best Side!
        <a href={`tel:${cell}`} style={{marginLeft:"1rem"}} className={styles.ourwebDesignBg}>Call Us ?</a>
        </CustStyleEffect>
         
    </CustPhrase>
  )
}

export default PhraseEffect