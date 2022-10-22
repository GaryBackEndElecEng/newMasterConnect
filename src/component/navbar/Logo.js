import { Box } from '@mui/material';
import React ,{useContext} from 'react';
import {GeneralContext} from '../../context/GeneralContextProvider';
//"https://master-connect.s3.ca-central-1.amazonaws.com/static/logoNewSmall.png"
const Logo = () => {
  const {staticImage}=useContext(GeneralContext);
  const logo=`${staticImage}/logo.png`;
  return (
    <Box sx={{position:"relative",width:"35px",height:"35px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
    <img src={logo} style={{width:"100%",height:"100%",borderRadius:"50%"}} alt=" master-connect"/>
    </Box>
  )
}

export default Logo