import React from 'react';
import {Stack,CardMedia,Box,Typography,Fab,Container} from "@mui/material";


const VideoIntro = ({staticImage,videoRef}) => {
    const video=`${staticImage}/video/masterMain.mp4`;
    const handlePlay=(e)=>{
        if(e.currentTarget){
            e.currentTarget.play();
        }
    }
  return (
    
        <Stack direction="column" spacing={0}
        sx={{justifyContent:"flex-start",alignItems:"center",position:"relative",cursor:"pointer",width:"100%",boxShadow:"1px 1px 20px 3px black",borderRadius:"2%",border:"3px solid black",padding:"0.25rem"}}
        >
            <CardMedia
            sx={{margin:"auto 0px",minWidth:"370px"}}
            type={"video/mp4"}
            component={"video"}
            loop={false}
            autoPlay={true}
            defer={true}
            src={video}
            ref={videoRef}
            onClick={(e)=>handlePlay(e)}
            />

        </Stack>
    
  )
}

export default VideoIntro