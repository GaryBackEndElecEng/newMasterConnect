import React from "react";
import { GeneralContext } from "../../context/GeneralContextProvider";
import styles from "./blog.module.css";
// import { Stack, Grid, Typography } from "@mui/material";
import styled from "styled-components";

const CustCover = styled.section`
margin:0;
padding:0;
display:flex;
width:100%;
justify-content:center;
align-items:center;
flex-direction:column;
min-height:100vh;
text-align:center;
filter:saturate(2);
background-image:url(${({ bgimage }) => bgimage});
background-position 50% 50%;
background-size:100% 100%;
animation: growInOut ${({ growtime }) => growtime}s linear;
@keyframes growInOut{
    0% {opacity:0;background-size:400% 400%;background-position:60% 60%;filter:saturate(0.5);}
    15% {opacity:1;background-size:350% 350%;background-position:60% 60%;filter:saturate(1);}
    100% {opacity:1;background-size:100% 100%;background-position:50% 50%;filter:saturate(2);}
}
@media screen and (max-width:900px){
    padding:auto 0.5rem;
    background-position 70% 50%;
    background-size:200% 100%;
    @keyframes growInOut{
        0% {opacity:0;background-size:400% 400%;background-position:60% 60%;filter:saturate(0.5);}
        15% {opacity:1;background-size:350% 350%;background-position:70% 60%;filter:saturate(1);}
        100% {opacity:1;background-size:200% 100%;background-position:70% 50%;filter:saturate(2);}
    }
}
@media screen and (max-width:600px){
    background-position 70% 50%;
    background-size:200% 100%;
    @keyframes growInOut{
        0% {opacity:0;background-size:400% 400%;background-position:60% 60%;filter:saturate(0.5);}
        15% {opacity:1;background-size:400% 350%;background-position:70% 60%;filter:saturate(1);}
        100% {opacity:1;background-size:200% 100%;background-position:70% 50%;filter:saturate(2);}
    }
}
`;
const CustTitle = styled.p`
  font-size: 700%;
  background-clip:text;
  -webkit-background-clip:text;
  color:transparent;
  -webkit-text-stroke:1px white;
  background-image:url(${({bgimage})=>bgimage});
  background-size:400% 400%;
  background-position:50% 50%;
  opacity: ${({ turnon }) => (turnon ? "1" : "0")};
  ${({animate})=>animate};
  @keyframes comeIn {
    from {
      opacity: 0;
      transform: translateY(-900%);
    }
    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }
  @keyframes textEffect {
    from {
      background-position:0% 0%;
    }
    to {
        background-position:100% 100%;
    }
  }
  @media screen and (max-width: 900px) {
    font-size: 500%;
  }
  @media screen and (max-width: 600px) {
    font-size: 320%;
  }
`;
const CustSubTitle = styled.p`
  font-size: 300%;
  opacity: ${({ turnon }) => (turnon ? "1" : "0")};
 ${({animate})=>animate};
  @keyframes comeIn2 {
    from {
      opacity: 0;
      transform: translate(-100%, -900%);
    }
    to {
      opacity: 1;
      transform: translate(0%, 0%);
    }
  }
  @media screen and (max-width: 900px) {
    font-size: 200%;
    padding:1rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 175%;
  }
`;
const CustSubSubTitle = styled.p`
  font-size: 200%;
  margin-top:1rem;
  color:pink;
  opacity: ${({ turnon }) => (turnon ? "1" : "0")};
 ${({animate})=>animate};
  @keyframes comeIn2 {
    from {
      opacity: 0;
      transform: translate(100%, 800%);
    }
    to {
      opacity: 1;
      transform: translate(0%, 0%);
    }
  }
  @media screen and (max-width: 900px) {
    font-size: 150%;
    padding:auto 0.5rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 120%;
  }
`;

const BlogCover = ({ getWidth }) => {
  const {  staticImage,sectionBlog } = React.useContext(GeneralContext);
  const setH = getWidth < 900 ? (getWidth < 600 ? "h3" : "h2") : "h1";
  const setSubH = getWidth < 900 ? (getWidth < 600 ? "h4" : "h3") : "h2";
  const growtimestart =!sectionBlog.loaded ? 10 :0;
  const growtimeTitle =!sectionBlog.loaded ? 10 :0;
  const china = `${staticImage}/extra/china.png`;
  const goldDesign = `${staticImage}/extra/goldDesign.png`;
  const [turnon, setTurnon] = React.useState(false);
  const [turnon2, setTurnon2] = React.useState(false);
  const animateSub= turnon && `animation: comeIn2 ${growtimestart}s ease-in-out` ;
  const growtimeTitleanimateSwitch= turnon2 ? `animation: textEffect ${growtimeTitle + 40}s linear infinite`:`animation: comeIn ${growtimeTitle}s ease-in-out`;
  const animateSubSub= turnon && `animation: comeIn2 ${growtimestart}s ease-in-out` ;

  React.useEffect(() => {
    if(sectionBlog.loaded){
      setTurnon(true);
      setTurnon2(true);
    }else{
    setTimeout(() => {
      setTurnon(true);
    }, 4000);
  }
  }, [sectionBlog.loaded]);

  React.useEffect(() => {
    if (turnon && !sectionBlog.loaded) {
      setTimeout(() => {
        setTurnon2(true);
      }, growtimestart*1000);
    }
  }, [turnon,sectionBlog.loaded]);

  return (
    <CustCover
      bgimage={china}
      growtime={growtimestart}
      classname={styles.custCover}
    >
      <CustTitle
        turnon={turnon}
        bgimage={goldDesign}
        animate={growtimeTitleanimateSwitch}
        className={styles.custTitle}
      >
        Blogs and articles
      </CustTitle>
      <CustSubTitle
        turnon={turnon2}
        growtime={10}
        className={styles.custTitle}
        animate={animateSub}
      >
        "Beauty is symetrically aligned information overload" - 'awwh, is the absorbtion time'
      </CustSubTitle>
      <CustSubTitle
        turnon={turnon2}
        growtime={10}
        className={styles.custTitle}
        animate={animateSub}
      >
        -Einstein
      </CustSubTitle>
      <CustSubSubTitle
        turnon={turnon2}
        growtime={10}
        className={styles.custTitle}
        animate={animateSubSub}
      >
        Much time has been spent on giving you the solid info. Please send a thanks. 
      </CustSubSubTitle>
      <CustSubSubTitle
        turnon={turnon2}
        growtime={10}
        className={styles.custTitle}
        animate={animateSubSub}
      >
        -Much appreciated
      </CustSubSubTitle>
    </CustCover>
  );
};

export default BlogCover;
