import React, { useState,  useEffect,} from 'react';
import {  Container, Grid } from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider';
import styled from 'styled-components';
import styles from './design11.module.css';

const CustMainCover=styled.div`
margin:0;
position:relative;
inset:0;
padding-inline:1rem;
height:100%;
width:100%;
width:100%;
display:flex;
justify-content:flex-start;
align-items:center;
flex-direction:column;
// border:1px solid red;
@media screen and (max-width:900px){
left:-2%;
}
@media screen and (max-width:600px){}
`;

const CoverRestaurant=styled.div`
height:100%;
opacity:${({opacity})=>opacity};
opacity:1;
inset:0;
width:100%;
background-image:url(${({bgimage})=>bgimage});
background-size:100% 100%;
background-position: 50% 50%;
filter:saturate(1.5);
display: flex;
align-items:center;
justify-content:center;
flex-direction:column;
animation: ${({animation})=>animation};
@keyframes sweepIn {
    from {opacity:0;transform:skew(45deg) ;backround-size:300% 200%; background-position:0% 0%;}
    to {opacity:1;transform:skew(0deg) ;backround-size:100% 100%; background-position:50% 50%;}
}
@keyframes fadeOut {
    from {opacity:1;}
    to {opacity:0;}
}
@media screen and (max-width:900px){
    min-height:50vh;
}
@media screen and (max-width:600px){
    min-height:120vh;
    background-size:300% 100%;
background-position: 50% 50%;
@keyframes sweepIn {
    from {opacity:0;transform:skew(45deg) ;backround-size:300% 200%; background-position:0% 0%;}
    to {opacity:1;transform:skew(0deg) ;backround-size:300% 100%; background-position:50% 50%;}
}
}
`;

const ImageDisplay=styled.img`
margin:0;padding:0;
width:100%;
height:85%;
animation: rotateIn 3s ease-in-out;
@keyframes rotateIn {
    from {transform:rotateY(180deg);}
    to {transform:rotateY(0deg);}
}
@media screen and (max-width:900px){
    height:100%;
}

`;




const CoverPage = ({ arr }) => {
    const {staticImage}=React.useContext(GeneralContext);
    const menu1=`${staticImage}/images/Restaurant/menu1.png`;
    const menu2=`${staticImage}/images/Restaurant/menu2.png`;
    const mainCover=`${staticImage}/images/Restaurant/mainCover.png`;
    const logo2=`${staticImage}/images/Restaurant/logo.png`;
    const counterRef=React.useRef(null);
    const [counter, setCounter] = useState(null);
    const [start,setStart]=React.useState(null);
    const [start2,setStart2]=React.useState(null);
    
    React.useEffect(()=>{
        setTimeout(()=>{setStart(true)},7000);
        setTimeout(()=>{ if(start) return setStart2(true)},2000);
    },[start]);
    

        React.useEffect(()=>{
            setCounter(0);
            counterRef.current=0;
        },[]);

   

    return (
        <CustMainCover>
            {!start2 ?
            <CoverRestaurant
            bgimage={mainCover}
            animation={!start ? "sweepIn 7s ease-in-out":"fadeOut 2s ease-in-out"}
            opacity={!start ? "1":"0"}
            >
            <p className={styles.restoFontEffect}> Eitvell</p>
            <p className={styles.restoFontEffect2}> Fine Cuisine</p>
            </CoverRestaurant>
            :
            <Grid container spacing={0} className={styles.gridFadeIn}>
                <Grid item md={6} sm={6} xs={12} sx={{padding:"0",margin:"0"}}>
                    <ImageDisplay src={menu1} alt="www.masterconnect.ca"/>
                </Grid>
                <Grid item md={6} sm={6} xs={12} sx={{padding:"0",margin:"0"}}>
                    <ImageDisplay src={menu2} alt="www.masterconnect.ca"/>
                </Grid>
            </Grid>
            }

        
        </CustMainCover>

    )
}

export default CoverPage