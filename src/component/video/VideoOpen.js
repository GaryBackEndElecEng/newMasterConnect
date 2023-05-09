import React from 'react';
import { CardMedia,} from '@mui/material';
import {GeneralContext} from '../../context/GeneralContextProvider';
import styled from 'styled-components';
import styles from './video.module.css';

const CustPlayer=styled(CardMedia)`
width:100%;
height:100%;
@media screen and (max-width:900px){

}
@media screen and (max-width:600px){
;
border:1px solid red;
}
`;
const PlayerHolder=styled.div`
position:absolute;
top:0%;
left:0%;
width:100%;
height:100%;
max-height:80vh;
z-index:2000;
background:background:var(--background-color-video);
opacity:1;
animation:"bringIn" 1s ease-in-out;
@keyframes bringIn {
    from {opacity:0; transform:scale(0.5);}
    to {opacity:1; transform:scale(1);}
}
@media screen and (max-width:900px){

}
@media screen and (max-width:600px){

}

`;

const VideoOpen = ({src,getWidth}) => {
    const {openvideo, setOpenvideo}=React.useContext(GeneralContext);


    const handlePlay=(e)=>{
        e.preventDefault();
        if(e.currentTarget && openvideo.loaded){
            e.currentTarget.play();
        }
        
    }
    
  return (
    <PlayerHolder  getWidth={`${getWidth/2}px`}>
    <CustPlayer component="video"
    src={src}
    type="video/mp4"
    loop={false}
    onClick={(e)=>handlePlay(e)}
    openvideo={openvideo.loaded}
    />
    <div className={styles.msgClickToPlay}>
      <p className={styles.fontStyleMsg}> Click to Play !</p>
    </div>
    </PlayerHolder>
  )
}

export default VideoOpen