import React from "react";
import styles from "./about.module.css";
// import styled from "styled-components";
import LongevityItem from "./LongevityItem";

import {
  
  Container,
} from "@mui/material";

const Longevity = ({arr,getWidth,fontSize}) => {
    
  return (
    <Container maxWidth="xl" className={styles.mainLongevity}>
        <p className={styles.fontEffect}>
          Why should you choose Us?
        </p>
        { 
        arr.length >0 && arr.map((obj,index)=>(
        <div key={`${obj.id}--${index}`} style={{position:"relative"}}>
                <div className={styles.hrLine} />
                <LongevityItem obj={obj}/>
        </div>
        ))
        }
      </Container>
  )
}

export default Longevity