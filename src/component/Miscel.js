import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useTheme} from '@mui/material/styles'
import { Box,Stack,Typography,Fab,Container } from '@mui/material';
import '../App.css'

const Miscel = () => {
    const theme=useTheme();
    const navigate=useNavigate();
    const style={margin:"auto",webkitTextStroke:"3px black",textStroke:"3px black",backgroundClip:"text",webkitBackgroundClip:"text",backgroundImage:"var(--background-image-1-turn)",color:"transparent",backgroundSize:"200% 100%",backgroundPosition:"50% 50%"}

    const handleHome=()=>{
      navigate("/");
    }
  return (
    <Container maxWidth="lg">
    <Stack direction="column" sx={{justifyContent:"center",alignItems:"center"}}>
      <Typography component="h1" variant="h1" sx={style}
      className={"misc"}
      
      >
         SORRY
      </Typography>
      <Typography component="h1" variant="h3" sx={{color:"black",margin:"1rem auto"}}>
        Are you trying to find Home?
      </Typography>
      <Fab color="warning" size="large" variant="extended" onClick={handleHome}>Back!</Fab>
    
    </Stack>
    </Container>
  )
}

export default Miscel