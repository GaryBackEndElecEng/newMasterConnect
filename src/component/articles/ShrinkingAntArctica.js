import React, {  useEffect, useState, } from 'react';
// import { GeneralContext } from '../../context/GeneralContextProvider';
// import { useTheme } from '@mui/material/styles';
import {  Grid,  } from '@mui/material';
import ImageShow2 from './ImageShow2'
// import styled from 'styled-components';




const ShrinkingAntArctica = () => {

    // const {link,setLink}=useContext(GeneralContext);
    const [link,setLink]=useState({id:1,link:null});
    const [show,setShow]=useState(false);
    const [showOff,setShowOff]=useState(false);
  

    useEffect(()=>{
        var count=1;
        const funcCount=()=>{
        if(count < 23){
            // console.log(count)
            setLink({id:count,link:`https://new-master.s3.ca-central-1.amazonaws.com/media/antarcticaShrink/antarcticaShrink${count}.png`})
            setTimeout(()=>{
                count++
                funcCount();
            },1000)
        }else{setShow(true)}
        
    }
    funcCount();
    },[]);

    useEffect(()=>{
      if(show){
        setTimeout(()=>{
          setShowOff(true);
        },30000);
        setTimeout(()=>{
          setShow(false);
        },33000)
      }
    },[setShow,show])
    
    

    
  return(

    <Grid container spacing={{xs:0,sm:1}} 
    
    sx={{position:"relative",
      boxShadow:"1px 1px 18px 5px grey",margin:"1rem auto"
    }}>
    
        <Grid item xs={12} md={12} sx={{width:"100%"}}>
        <ImageShow2 link={link} show={show} showOff={showOff}/>
        </Grid>
    
    </Grid>
  )
}

export default ShrinkingAntArctica