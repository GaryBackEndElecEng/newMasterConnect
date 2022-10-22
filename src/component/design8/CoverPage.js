import React, { useEffect, useContext, useState } from 'react';
import {  Stack, Typography,  } from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import styles from './design8.module.css';

const CloudImg=styled.img`
position:absolute;
width:250%;
top:0%;
filter:saturation(150%);
transform:translate(-30%,-30%);
animation transformXY 15s infinite;
opacity:0.3;
@keyframes transformXY {
    from {opacity:0.3,transform:translate(-30%,-30%)};
    50% {opacity:0.7; transform:translate(0%,0%);}
    to {opacity:0.3;transform:translate(-30%,-30%);}
}
@media screen and (max-width:900px){
    
}
@media screen and (max-width:900px){
    top:0%;
    height:400vh;
    filter:saturation(250%);
    @keyframes transformXY {
        from {opacity:0.3,transform:translate(-30%,-30%)};
        50% {opacity:0.7; transform:translate(0%,0%);}
        to {opacity:0.3;transform:translate(-30%,-30%);}
    }
}
`;
const ClimberImg=styled.img`
position:absolute;
width:100%;
top:25%;
transform:translate3d(0%,-${({trans})=>trans}px,${({trans})=>trans}px);
opacity:1;
@media screen and (max-width:900px){
    width:150%;
    height:150%;
    left:-0%;
    top:20%;
    transform:translate3d(0%,-${({trans})=>trans}px,${({trans})=>trans}px); 
}
@media screen and (max-width:600px){
top:40%;
left:-0%;
transform:translate3d(0%,-${({trans})=>trans/1}px,${({trans})=>trans}px);
height:150%;
width:350%;
}
`;
const CoverMain=styled.div`
margin:auto;
width:100vw;
height:105vh;
overflow:hidden;
position:relative;
background-image:url(${({bgImage})=>bgImage});
background-size:100% 100%;
display:flex;
justify-content:center;
align-items:center;
flex-direction:center;
@media screen and (max-width:900px){
    
}
@media screen and (max-width:600px){
margin-top:-50px;
}
`;



const CoverPage = () => {
    const { setTitle, setStyleName, workArr, flowerImg,setChangePage,staticImage,opacity,setOpacity } = useContext(GeneralContext);
    const {getProductList}=useContext(PriceContext);
    const [summary, setSummary] = useState(false);
    const [desc, setDesc] = useState(false);
    const [keywords, setKeywords] = useState(false);
    const [image, setimage] = useState(false);
    const [OBJ, setOBJ] = useState(false);
    const climber=`${staticImage}/design8/climber.png`;
    const clouds=`${staticImage}/design8/clouds.png`;
    const mountainBg=`${staticImage}/design8/mountainBg.png`;
    const [transPos,setTransPos]=useState(0);
    let ticking=false;
    let lastPos=0;

    useEffect(()=>{
        if(getProductList.loaded && getProductList.data){
            let obj=getProductList.data.filter(obj=>(obj.name==="Success"))[0];
            let kewds=obj.desc.split(" ")
            .filter(wd=>(wd !=="the"))
            .filter(wd=>(wd !=="This"))
            .filter((wd)=>(wd !=="a"))
            .filter(wd=>(wd !=="for"))
            .filter(wd=>(wd !=="in"))
            .filter(wd=>(wd !=="is"))
            .filter(wd=>(wd !=="of"))
            .filter(wd=>(wd !=="are"))
            .filter(wd=>(wd !=="and"))
            setSummary(obj.summary);
            setDesc(obj.desc);
            setKeywords(kewds);
            setimage(`${staticImage}/${obj.imageName}`);
            setOBJ(obj)
        }
        if(window.scrollY){
            window.scroll(0,0);
            
        }
    },[getProductList.loaded,getProductList.data,staticImage]);

    const doFunc=(count)=>{
        if(count<102){
        setTransPos(Math.floor(count*8));
        // console.log("count",count/2,"opacity",OpacityThis)
        }else(setOpacity(1))
    }
    
    const getScroll = ()=>{
        document.addEventListener("scroll",(e)=>{
            lastPos = window.scrollY;
            if(!ticking){
                window.requestAnimationFrame(()=>{
                    if(lastPos > 0){
                        let adjust = Math.ceil(lastPos/5);
                        doFunc(adjust);
                    
                    }
                    ticking=false;
                });
                // setOpacity(0);
                ticking=true;
            }
        });
        
        
    }
    getScroll();
  return (
    <CoverMain bgImage={mountainBg}>
    
        <ClimberImg src={climber} trans={transPos} opacity={1} alt="www.master-connect.ca"/>
        <CloudImg src={clouds} alt="www.master-connect.ca"/>
        <Stack direction="column" sx={{textAlign:"center",transform:`translateY(${transPos/3}px)`}} className={opacity===1 ? styles.showStack : styles.hide}>
        <Typography component="h1" variant="h5" sx={{margin:"0.5rem auto"}}>setting small daily goals generate large  </Typography>
        <Typography component="h1" variant="h1" sx={{margin:"0.25rem auto"}}> Success</Typography>
        <Typography component="h1" variant="h5" sx={{margin:"1rem auto"}}> and self fullfilment</Typography>
        </Stack>

    
    </CoverMain>
  )
}

export default CoverPage