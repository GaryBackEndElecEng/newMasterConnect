import React from "react";
import styled from "styled-components";
import {
  Stack,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { GeneralContext } from "../../context/GeneralContextProvider";
import styles from "./design2.module.css";


const MainCover = styled.div.attrs({ className: styles.mainCover })`
margin:0;
position:sticky;
position:${({ isLoad }) => (isLoad ? "static" : "sticky")};
overflow:hidden;
opacity:1;
width:${({width})=>width};
background-image:url(${({ bgimage }) => bgimage});
background-position:50% 50%;
background-size:200% 280%;
display:flex;
justify-content:center;
align-items:center;
flex-directIon:column;
filter:saturate(2);
min-height:${({ height }) => height};
animation:${({ animate }) =>animate };

@keyframes animate0 {
    from {opacity:0;background-position:0% 50%;}
    10% {opacity:1;background-position:10% 50%;}
    50% {opacity:1;background-position:50% 50%;}
    to {opacity:0;background-position:100% 50%;}
}
@keyframes animate1 {
    from {opacity:0;background-position:0% 50%;}
    10% {opacity:1;background-position:10% 50%;}
    50% {opacity:1;background-position:50% 50%;}
    to {opacity:0;background-position:100% 50%;}
}
@keyframes endFrame {
    from {opacity:0.1;background-position:0% 50%;}}
    to {opacity:1;background-position:100% 50%;}}
}
@media screen and (max-width:900px){
    background-size:200% 100%;
    background-position:100% 50%;
}
@media screen and (max-width:600px){
    background-size:350% 100%;
    background-position:100% 50%;
}


`;

const Cover = ({getWidth}) => {
  // const countRef = React.useRef(null);
  const { staticImage } = React.useContext(GeneralContext);
  // const stand=`${staticImage}/design2/stand.JPG`;
  const endPic = `${staticImage}/design2/barn_ial.JPG`;
  // const mainPic = `${staticImage}/design2/flowerStand.JPG`;
  // const mainPic1 = `${staticImage2}/design2/mainPic1.png`;
  const mainPic3 = `${staticImage}/design2/mainPic3.png`;
  const logo = `${staticImage}/design2/logoMe.png`;
  const [isStarted,setIsStarted]=React.useState(null);
  const [isStarted2,setIsStarted2]=React.useState(null);
  const [loadObj,setLoadObj]=React.useState({loaded:false,obj:{}});
  
  
React.useEffect(()=>{
  const arr = [mainPic3, endPic];
  if(!isStarted){
    setLoadObj({
      loaded:true,
      obj:{
        id:1,
        image:arr[0],
        animate:`animate${0} 10s linear`,
        isLoad:null,
      }
    });
    setTimeout(()=>{setIsStarted(true)},10000);
  } if(isStarted) {
    setTimeout(()=>{setIsStarted2(true)},10000);
    setLoadObj({
      loaded:true,
      obj:{
        id:2,
        image:arr[1],
        animate:`endFrame 10s ease-in-out`,
        isLoad:true,
      }
    });
  }
  if(isStarted2){
//can add something else here
  }
},[isStarted,isStarted2]);


  return (
    <>
{loadObj.loaded ?
    <MainCover
      height={getWidth < 600 ? "100dvh" : "100dvh"}
      bgimage={loadObj.loaded && loadObj.obj.image }
      count={loadObj.obj.id}
      isLoad={loadObj.obj.isLoad}
      animate={loadObj.obj.animate}
      width={`${getWidth}px`}
      
    >
        <div className={styles.mainCoverGuid}>
      <Card elevation={3} className={loadObj.obj.isLoad ? styles.coverCard :styles.coverCardHide} 
      sx={{background:"rgba(0,0,0,0.2)"}}>
        <Stack
        className={styles.stackTitleLogo}
          direction={{md:"row",xs:"column"}}
          
        >
          <CardMedia
            component="img"
            src={logo}
            alt="www.masterconnect.ca"
            className={styles.avatar}
            
          />
          <Typography component="h1" 
          variant={getWidth <900 ?(getWidth<600 ?  "h3": "h2"):"h1"}
          className={styles.titleEffect}
           >

            HonestHarvest
          </Typography>
        </Stack>
        <CardContent sx={{margin:"auto"}}>
        <Typography component="h1" variant={getWidth <900 ?(getWidth<600 ?  "h4": "h4"):"h2"}>
            CRAFTED BY OUR FAMILY.
          </Typography>
        <Typography component="h1" variant={getWidth <900 ?(getWidth<600 ?  "h5": "h4"):"h2"}>
            LOVED BY NATURALISTS
          </Typography>
        </CardContent>
      </Card>
      </div>
    </MainCover>
    :
    <div><h5>loading....</h5></div>
    }
    </>
  );
};

export default Cover;
