import React,{useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { Box, Container, Fab, Stack, Typography } from '@mui/material';
import {useTheme} from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';

const CalculateBtn = () => {
    const navigate=useNavigate();
    const { setChangePage } = useContext(GeneralContext);

    const handleTransfer = (e) => {
        e.preventDefault();
        navigate("/calculate", setChangePage(true))
    }
  return (
    <Container maxWidth="sm"
    sx={{ display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",}}
    >
        <Stack direction="column" sx={{margin:"auto",background:"rgba(55,0,55,.7)",zIndex:"999999",position:"absolute",width:"100%",top:{xs:"0%",sm:"40%",md:"42%"},left:{xs:"0%"}}}>
        <Typography component="h1" variant="h5" sx={{margin:"1rem auto",color:"white",padding:"1rem 2rem"}}> there are 26 questions to best choose the services and products in forcasting your desired requirements. </Typography>
        <Fab variant="extended" size="medium" color="info"
        sx={{margin:" auto",marginBottom:"2rem"}}
        onClick={(e)=>handleTransfer(e)}
        >
            I understand <CalculateIcon sx={{ml:1,color:"pink"}}/>
        </Fab>
        </Stack>

    </Container>
  )
}

export default CalculateBtn