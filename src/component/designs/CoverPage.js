import React from 'react';
import styled from 'styled-components';
import {GeneralContext} from '../../context/GeneralContextProvider';
import styles from './design.module.css';
// import {Typography,Stack} from '@mui/material';

const CustCoverDesign=styled.section`
margin:0;
padding:0;
height:100dvh;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
background-image:url(${({bgimage})=>bgimage});
background-position:50% 50%;
background-size:100% 100%;
animation: growIn 2.5s ease-in-out;
@keyframes growIn { 
    0% {opacity:0; background-size:150% 150%;background-position:0% 50%;}
    100% {opacity:1; background-size:100% 100%;background-position:50% 50%;}
}
@media screen and (max-width:900px){              
    background-position:50% 50%;
    background-size:150% 100%;
    @keyframes growIn { 
    0% {opacity:0; background-size:200% 150%;background-position:0% 50%;}
    100% {opacity:1; background-size:150% 100%;background-position:50% 50%;}
    }
}
@media screen and (max-width:600px){
    background-position:50% 50%;
    background-size:200% 100%;
    @keyframes growIn { 
    0% {opacity:0; background-size:300% 150%;background-position:0% 50%;}
    100% {opacity:1; background-size:200% 100%;background-position:50% 50%;}
    }
}
`;


const CoverPage = ({getWidth}) => {
    const {staticImage,staticImage2,setDesignStart}=React.useContext(GeneralContext);
    const mainDesign=`${staticImage}/designMain.png`;
    const lightEffect2=`${staticImage}/extra/lightEffect2.png`;
    const lightEffect=`${staticImage}/extra/lightEffect.png`;
    const changeImage=window.innerWidth < 600 ? lightEffect: lightEffect2;

    React.useEffect(()=>{
        setTimeout(()=>{
            setDesignStart(true);
        },2000);
    },[]);

  return (
    <CustCoverDesign
    bgimage={mainDesign}
    className={styles.custCoverDesign}
    >
        <div>
        <p className={styles.fontStyleTitle} style={{backgroundImage:`url(${lightEffect2})`}}>
           Sample Designs
        </p>
        <div style={{background:"rgba(255,255,255,0.2)",padding:"0.25rem"}}>
        <p className={styles.fontStyleSubTitle} style={{backgroundImage:`url(${changeImage})`}}>
            Design samples for the Creative mind
        </p>
        </div>
        </div>
    </CustCoverDesign>
  )
}

export default CoverPage