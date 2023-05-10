import React from 'react';
import styles from './design3.module.css';
import styled from 'styled-components';
import {Stack,Typography} from '@mui/material';

const MainCover=styled.div`
margin:0;
min-height:100vh;
width:100vw;
display:flex;
justify-content:flex-start;
align-items:center;
flex-direction:column;
background-image:url(${({bgimage})=>bgimage});
background-position:50% 50%;
background-size:100% 100%;
filter:saturate(1);
opacity:${({opacity})=>opacity};
animation:${({animation})=>animation};
@keyframes showBeauty {
    from {opacity:0;background-position:100% 100%;background-size:200% 200%;filter:saturate(2);}
    27% {opacity:0.8;background-position:75% 50%;background-size:200% 200%;filter:saturate(1.5);}
    50% {opacity:1;background-position:75% 50%;background-size:200% 200%;filter:saturate(1.5);}
    100% {opacity:0;background-position:75% 50%;background-size:100% 100%;filter:saturate(.5);}
}
@keyframes showRing {
    from {opacity:0;filter:saturate(1);}
    to{opacity:1;filter:saturate(2);}
}
@media screen and (max-width:900px){
    background-position:80% 50%;
    background-size:200% 100%;
    @keyframes showBeauty {
        from {opacity:0;background-position:100% 100%;background-size:200% 200%;filter:saturate(2);}
        27% {opacity:0.8;background-position:90% 50%;background-size:200% 200%;filter:saturate(1.5);}
        50% {opacity:1;background-position:85% 50%;background-size:200% 200%;filter:saturate(1.5);}
        100% {opacity:0;background-position:80% 50%;background-size:200% 100%;filter:saturate(1);}
    }
}
@media screen and (max-width:600px){}


`;
const ImpactStatement=styled(Stack)`
margin:auto;
position:relative;
justify-content:center;
align-items:center;
flex-direction:column;
padding:0.5rem;
opacity:${({opacity})=>opacity};
transform: translateY(${({transformy})=>transformy});
transition:all 2.5s ease-in-out;
@media screen and (max-width:900px){
    padding:auto 1rem;
    text-align:center;
}
@media screen and (max-width:600px){
    padding:auto 0.5rem;
    
}

`;

const CoverDesign3 = ({coverPic,coverPic2,getWidth}) => {
    const [open,setOpen]=React.useState(null);
    const [open1,setOpen1]=React.useState(null);
    const [open2,setOpen2]=React.useState(null);
    const [open3,setOpen3]=React.useState(null);
    const [loadPic,setLoadPic]=React.useState({loaded:false,data:coverPic2});

    React.useEffect(()=>{
        if(coverPic ){
        setOpen(true);
        setLoadPic({loaded:true,data:coverPic});
        }
       
    },[coverPic]);

    React.useEffect(()=>{
        if(open ){
        setTimeout(()=>{
             setOpen1(true);
             setOpen(false);
             setLoadPic({loaded:true,data:coverPic2});
        },6000);
    }
    
    },[open,coverPic2]);
// console.log(open)
    React.useEffect(()=>{
        if(open1 ){
        setTimeout(()=>{
             setOpen2(true);
        },3000);
    }
    
    },[open1,coverPic2]);

    React.useEffect(()=>{
        if(open2 ){
        setTimeout(()=>{
             setOpen3(true);
        },2000);
        }
    
    },[open2]);

// console.log(open2)

  return (
    <MainCover
    opacity={open1 ? "1":"0"}
    animation={open1 ? `showRing 3s linear`:`showBeauty 6s linear`}
    // open={open }
    bgimage={loadPic.loaded && loadPic.data}
    className={styles.mainCover}
    >
        <ImpactStatement 
        direction="column"
        opacity={open2 ? "1":"0"}
        transformy={open2 ? "0%" : "-100%"}
        >
            <Typography component="h1" variant='h3' className={open3 ? styles.companyOn :styles.companyOff}
            style={{color:"white"}}
            >Corson Well's</Typography>
            <Typography component="h1" variant={getWidth <900 ? (getWidth < 600 ? "h3" :"h3"):"h1"} sx={{marginBottom:"1rem",padding:"0.5rem"}}> A WOMENS BEST FRIEND</Typography>
            <Typography component="h1" variant="h3" sx={{marginBottom:"1rem",padding:"0.5rem"}}
            className={open3 ? styles.manHonorOn : styles.manHonorOff}
            > AND A MAN'S HONOR
            </Typography>
        </ImpactStatement>


    </MainCover>
  )
}

export default CoverDesign3