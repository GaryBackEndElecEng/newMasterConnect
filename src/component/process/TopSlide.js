import React from "react";
import { GeneralContext } from "../../context/GeneralContextProvider";
import styles from "./process.module.css";
import {  Typography, } from "@mui/material";
// import styled from "styled-components";

const TopSlide = ({slideArr}) => {
    const topRef=React.useRef();
    const {staticImage}=React.useContext(GeneralContext);
    const [topOn,setTopOn]=React.useState(false);
    

    React.useEffect(()=>{
        const observer=new IntersectionObserver((entries)=>{
            let entry=entries[0];
            if(entry.isIntersecting){
                setTopOn(true);
            }
        },{threshold:0.8});
        observer.observe(topRef.current);
    },[]);
    
// console.log(slideArr)
  return (
    <div className={topOn ? styles.topOnParent : styles.topOffParent} ref={topRef}>
        {slideArr && slideArr.map((obj,index)=>(
            <div key={`${obj.id}--process--${index}`} id={`${obj.id}-${index}`} style={{backgroundImage:`url(${staticImage}/${obj.webImage})`}}>
                <Typography component={"h1"} variant="h2"
                 className={styles.fontType} 
                style={{margin:"1rem auto",position:"absolute",top:"0%"}}
                >
                    {obj.title}
                </Typography>
                <Typography component={"h1"} variant="h5"
                 className={styles.fontType}
                 style={{margin:"1rem auto",marginTop:"10rem"}}
                >{obj.sectionTitle}</Typography>
                </div>
        ))}
    </div>
  )
}

export default TopSlide