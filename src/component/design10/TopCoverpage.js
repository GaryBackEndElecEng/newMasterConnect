import React from 'react';
import { Stack,Typography, Container } from '@mui/material';
import styled from 'styled-components';
import styles from './design10.module.css';
import TopCoverWord from "./TopCoverWord";
import TopCoverStatement from './TopCoverStatement';

const CustTopCover=styled.div`
width:100vw;
height:100vh;
margin:0;
padding-inline:0rem;
padding-block:0rem;
position:relative;
isolation:isolate;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
height:100vh;
height:100svh;
width:100vw;
z-index:200;


`; 
const CustImgContainer=styled.img`
background-position: 0% 50%;
background-size: 100% 100%;
position:relative;
// opacity:${({open})=>open ? "1":"0"};
// background-image:url(${({bgimage})=>bgimage});
inset:0;
width:100%;
height:100%;

`;

const TopCoverpage = ({coverArr}) => {
  const topCoverRef=React.useRef(null);
  const [open,setOpen]=React.useState(false);
  const [coverPics,setCoverPics]=React.useState({loaded:false,data:[]});
  const threshold=window.innerWidth <900 ? 0.7 :0.95;
  const length=coverArr.length;
  const words=["Measured","Clear","Structured","Natural","Clean","Placed"]
  

  React.useEffect(()=>{
    setTimeout(()=>{setOpen(true);},2000);
  },[]);
  React.useEffect(()=>{
    let tempArr=[];
    if(coverArr){
      coverArr.forEach((image,index)=>{
        tempArr.push({id:index +1,name:words[index],image:image})
      });
      setCoverPics({loaded:true,data:tempArr})
    }
  },[coverArr]);
  
  React.useEffect(()=>{
    const observer=new IntersectionObserver(entries=>{
      let entry=entries[0];
      setOpen(entry.isIntersecting);

    },{threshold:threshold});
    if(topCoverRef.current){
      observer.observe(topCoverRef.current);
      return ()=>observer.disconnect();
    }
  },[]);

  return (
    <CustTopCover
className={styles.custTopCover}
ref={topCoverRef}
    >
      <div className={styles.parent}>
      <div className={styles.wrapper} length={`${(length) *100}%`}>
      { coverPics.loaded ? coverPics.data.map((obj,index)=>(
        <div key={`${obj.id}-coverPic-${index}`} className={styles.imgWrapper}>
          <TopCoverWord word={obj.name}/>
          <TopCoverStatement/>
        
            <img
            src={obj.image}
            alt="www.masterconnect.ca"
            className={styles.image}
            />
            </div>
        ))
      :
          <div><h5>loading,,,,</h5></div>
      }
      </div>
      </div>

    </CustTopCover>
  )
}

export default TopCoverpage