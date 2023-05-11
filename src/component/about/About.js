import React from "react";
import {GeneralContext} from '../../context/GeneralContextProvider';
// import styles from "./about.module.css";
import styled from "styled-components";
import AboutMain from "./AboutMain";
import AboutMainAfter from "./AboutMainAfter";
import Imagery from "./Imagery";
import Longevity from "./Longevity";
import Folder from "./Folder";
import Scroller from "./Scroller";
import DiveIn from './DiveIn';


const MainContainer=styled.div`
margin:0;
padding:0 0.5rem;
width:100vw;
font-family: var(--font-family);
display:flex;
align-items:stretch;
justify-content:center;
flex-direction:column;
height:auto;
background: var(--background-111);
animation:slideLeft 1.5s ease-in-out;
@keyframes slideLeft {
    from {opacity:0.5;transform:translateX(100%);}
    to {opacity:1;transform:translateX(0%);}
}
@media screen and (max-width:900px){
  margin:auto ;
  // border:1px solid red;
}
`;
const About = () => {
  const {contactInfo,open, setOpen,staticImage,generalInfo}= React.useContext(GeneralContext);
  const happyMain = `${staticImage}/happy/happyMain.png`;
  const happyOffice = `${staticImage}/happy/happyOffice.png`;
  const longevity=`${staticImage}/extra/longevity.png`;
  const web=`${staticImage}/extra/web.png`;
  const smart=`${staticImage}/extra/smart.png`;
  const custom=`${staticImage}/extra/custom.png`;
  const partner=`${staticImage}/extra/partner.png`;
  const db=`${staticImage}/extra/db.png`;
  const scale=`${staticImage}/extra/scale.png`;
  const connect=`${staticImage}/folder/connect.png`;
  const ownership=`${staticImage}/folder/ownership.png`;
  const design=`${staticImage}/folder/design.png`;
  // const [showPic, setShowPic] = React.useState({loaded:false,id:0});
  const [close, setClose] = React.useState(null);
  const [slide, setSlide] = React.useState(null);
  const [goText, setGoText] = React.useState(null);
  const [getWidth,setGetWidth]=React.useState(null);
  const [fontSize,setFontSize]=React.useState(null);
  React.useEffect(()=>{
    if(window.scrollY ){
        window.scroll(0,0);
    }
    setGetWidth(window.innerWidth);
    // console.log(window.innerWidth)
  },[]);
  React.useEffect(()=>{
    if(getWidth <900){
      setFontSize("h2");
    }
    if(getWidth < 600){
      setFontSize("h3");
    }else{
      setFontSize("h2");
    }
  },[]);
  
    const arr=[
        {id:1,name:"Longevity",content:"Born in Mississauga , Ontario, served in the Technology hardware and software industry for 30 years, where innovation and problem-solving has always been the forefront to mastering innovative techniques and always with a smile.",image:longevity},
        {id:2,name:"Web Dev & Design Focus",content:"Masterconnect Digital has smart innovative creative design concepts and solid inexpensive development services. We use fundamental coding to give you a truly scalable and custom design and provide options for high scalability that suits growing firms.",image:web},
        {id:3,name:"Smart Design",content:"  Masterconnect Digital progressive designs fit all screen sizes, from a mobile to a desktop and dynamically accommodate all effects. Given our speciality in coding, each screen size can have the same or different effect, bringing improved client experience to the viewer.",image:smart},
        {id:4,name:"Truly Custom",content:" Masterconnect Digital uses fundamental coding schemes to maximize flexibility in providing exactly what the client and or industry desires.  ",image:custom},
        {id:5,name:"partnership & Collaboration ",content:"You can expect to receive clear transparent communication from the beginning of your web design project until completion. Once your project is launched, we have automated features that allow us to effectively maintain your site with no worries. ",image:partner},
        {id:6,name:" Database owner ship",content:" All our customers have their private database so you don't have to worry about information piracy. Your database is locked.",image:db},
        {id:7,name:" Database scalability",content:" All our databases are scalable upto 100 million transactions. So there is no worry about migration for a long time.",image:scale},
    ]
  React.useEffect(() => {
    setTimeout(() => {
      setClose(true);
    }, 6000);
    if (close) {
      setTimeout(() => {
        setSlide(true);
      }, 3000);
    }
    if (slide) {
      setTimeout(() => {
        setGoText(true);
      }, 4000);
    }
  }, [close, slide]);

  const handleClose=(e)=>{
    e.preventDefault();
    if(open ===true){
      setOpen(false);
    }
  }
  
  return (
    <MainContainer onMouseOut={(e)=>handleClose(e)}>
      <AboutMain fontSize={fontSize} getWidth={getWidth}/>
      <Imagery
        slide={slide}
        happyOffice={happyOffice}
        happyMain={happyMain}
        goText={goText}
        getWidth={getWidth}
        fontSize={fontSize}
      />
      <AboutMainAfter  getWidth={getWidth} fontSize={fontSize}/>
      <Longevity arr={arr} getWidth={getWidth} fontSize={fontSize}/>
      <Folder connect={connect} ownership={ownership} design={design} getWidth={getWidth} fontSize={fontSize}/>
      <DiveIn getWidth={getWidth} />
      <Scroller contactInfo={generalInfo} getWidth={getWidth} fontSize={fontSize}/>
    </MainContainer>
  );
};

export default About;
