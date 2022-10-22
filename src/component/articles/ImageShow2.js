import React,{useState,useEffect} from 'react';
import styles from './article.module.css';
import {  Typography, } from '@mui/material';

const ImageShow2 = ({link,show,showOff}) => {
    const [recMax,setRecMax]=useState(false);
    const lastPic= `https://new-master.s3.ca-central-1.amazonaws.com/media/antarcticaShrink/antarcticaShrink${22}.png`

    useEffect(()=>{
        // console.log(link)
        if(parseInt(link.id) >22){
            setRecMax(true)
        }
    },[setRecMax,link])

  return (
    <div style={{position:"relative"}}>
    {(link.link && !show )? <img  src={link.link} alt="www.master-connect.ca" style={{width:"100%"}}/>
        :
        <img  src={lastPic} alt="www.master-connect.ca" style={{width:"100%"}}/>
    }
        { show && <Typography component="h1" variant="body1" className={showOff ? styles.closeImageShow2 :styles.imageShow2}>
            This shows the reader that Antarctica is melting from the warming of its ocean, heat influenced from all four worldly oceans. The circumventing currents are so strong, caused by the coriolas forces ( caused by the rotation of the earth), that the inner currents is eating away the glaciers from the bottom up. From that, there has been a non-linear fracturing of its shelf. The plug- Thwaites Glacier is preventing world castrophic accelerated sea-level rise. Once it goes, an unslot of glacial decay will accelerate the sea-level rise!-Its not if, it's<span style={{fontSize:"24px",color:"yellow"}}> when!</span> 
        </Typography>}
        </div>
  )
}

export default ImageShow2