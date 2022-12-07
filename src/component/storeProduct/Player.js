import React,{useRef,useState,useEffect,useCallback} from 'react';
import styled from 'styled-components';
import {Stack,Grid, Typography} from '@mui/material';
import PausePresentationIcon from '@mui/icons-material/PausePresentation';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopCircleIcon from '@mui/icons-material/StopCircle';

const Video = styled.video`
margin:auto;
display:flex;
justify-content:center;
align-items:center;
position:relative;
flex-direction:column;
width:100%;
height:100%;


`;
const MainPlayer=styled.div`
width:100%;
margin:auto;
display:flex;
background:${({bg})=>bg};
color:${({bg})=>bg==="black" ? "white":"black"};
justify-content:center;
align-items:center;
position:relative;
flex-direction:column;
box-shadow: 1px 1px 12px 5px lightgrey;
// padding:0.15rem;
`;
const Player = ({src,bgChanged}) => {
    const videoRef=useRef();
    const [isPlaying,setIsPlaying]=useState(true);
    const [isAutoPlay,setIsAutoPlay]=useState(true);

    
    const handlePlayPause=(e)=>{
        e.preventDefault();
        if(!videoRef.current)return;
        if(isPlaying && !isAutoPlay){
            videoRef.current.pause();
            setIsPlaying(false);
        }else if(!isPlaying && !isAutoPlay){
            videoRef.current.play();
            setIsPlaying(true)
        }else{
            videoRef.current.play();
        }

    }
    
  return (
    <MainPlayer bg={bgChanged}>
    <Video
    src={src}
    autoPlay ={isAutoPlay}
    ref={videoRef}
    onClick={(e)=>handlePlayPause(e)}
    >
     

    </Video>
    <Stack direction="row" spacing={2}
     sx={{position:"absolute",top:{md:"90%",sm:"85%",xs:"85%"},left:"5%",zIndex:"10000",color:bgChanged}}
     >
        <Typography component="h1" variant="h6">cntrl:</Typography>
        {isPlaying && !isAutoPlay ? <PlayArrowIcon/> : <StopCircleIcon/>}
        {isAutoPlay ? <PausePresentationIcon onClick={()=>setIsAutoPlay(false)}/> : <StopCircleIcon onClick={()=>setIsAutoPlay(true)}/>}
        
     </Stack>
    </MainPlayer>
  )
}

export default Player