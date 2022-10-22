import React, {  useEffect, useState, } from 'react';
import {  Grid,  } from '@mui/material';
import ImageShow from './ImageShow'
// import styled from 'styled-components';
// import styles from './article.module.css';
// import api from '../axios/api';



const BoltStrike = () => {

    // const {link,setLink}=useContext(GeneralContext);
    const [link,setLink]=useState({id:1,link:null})

    useEffect(()=>{
        var count=1;
        const funcCount=()=>{
        if(count < 15){
            // console.log(count)
            setLink({id:count,link:`https://new-master.s3.ca-central-1.amazonaws.com/boltStrike/boltWater${count}.png`})
            setTimeout(()=>{
                count++
                
                funcCount();
            },1000)
        }
        
    }
    funcCount();
    },[]);
    
    

    
  return(

    <Grid container spacing={{xs:0,sm:1}} 
    
    sx={{position:"relative",
      boxShadow:"1px 1px 18px 5px grey",margin:"1rem auto"
    }}>
    
        <Grid item xs={12} md={12} sx={{width:"100%"}}>
        <ImageShow link={link}/>
        </Grid>
    
    </Grid>
  )
}

export default BoltStrike