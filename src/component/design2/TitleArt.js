import React from 'react';
import {Typography,Paper} from '@mui/material';

const TitleArt = () => {
  return (
    <Paper elevation={2} sx={{background:"black",color:"white",textAlign:"center",width:"100%",marginTop:{lg:"-2px"}}}>
      <Typography component="h1" variant="h5">Retrospect</Typography>
      </Paper>
  )
}

export default TitleArt