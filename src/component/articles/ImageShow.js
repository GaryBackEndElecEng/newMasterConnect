import React,{useState,useEffect} from 'react';
import styles from './article.module.css';
import {   Typography, } from '@mui/material';

const ImageShow = ({link}) => {
    const [recMax,setRecMax]=useState(false);
    const lastPic= `https://new-master.s3.ca-central-1.amazonaws.com/boltStrike/boltWater14.png`

    useEffect(()=>{
        // console.log(link)
        if(parseInt(link.id) >12){
            setRecMax(true)
        }
    },[setRecMax,link])

  return (
    <div style={{position:"relative"}}>
    {link.link ? <img  src={link.link} alt="www.master-connect.ca" style={{width:"100%"}}/>
        :
        <img  src={lastPic} alt="www.master-connect.ca" style={{width:"100%"}}/>
    }
        { recMax && <Typography component="h1" variant="body1" className={styles.imageShow}>

        This is a positive CG striking a conductive medium -mineralized lake.It struck the lake instead of the land because sand is less conductive than water. The explosion is caused by the breaking of the sound-barrier ( air pressure expansion). This demonstrates the air pressure expansion of a CG <sup>+</sup> bolt.
        </Typography>}
        </div>
  )
}

export default ImageShow