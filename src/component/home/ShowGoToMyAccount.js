import React,{useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { GeneralContext } from '../../context/GeneralContextProvider';
import {useTheme} from '@mui/material/styles';
import styled from 'styled-components';
import {Stack,Fab, Typography} from '@mui/material';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import CloseIcon from '@mui/icons-material/Close';

const ShowMain=styled(Stack)`
margin:1rem auto;
display:flex;
justify-content:center;
align-items:center;
flex-direction:center;
position:absolute;
z-index:1000;
top:-40%;
left:40%;
padding:1rem;
box-shadow:1px 1px 10px 8px ${({bs})=>bs};
background-color:${({bg})=>bg};
animation: growIn 1.5s ease-in-out;
@keyframes growIn {
    from {opacity:0; transform:translateX(-150%);}
    to {opacity:1;transform:translateX(0%);}
}
@media screen and (max-width:900px){
  top:-200%;
  left:30%;
}

@media screen and (max-width:600px){
  top:-100%;
  left:15%;
}
`;
const ShowGoToMyAccount = () => {
    const theme=useTheme();
    const navigate=useNavigate();
    const {setChangePage} =useContext(GeneralContext);
    const {setViewAccount}=useContext(TokenAccessContext);

    const handleGoToMyAccount=(e)=>{
      e.preventDefault();
      setViewAccount(false);
      navigate("/MyAccount",setChangePage(true));
      
    }
  return (
    <ShowMain
    direction={{xs:"column"}}
    bg={theme.palette.common.blueFade}
    bs={theme.palette.common.blueGreyFade}
    >
        <Typography component="h1" variant="h6" sx={{marginBottom:"0.5rem"}}> your account</Typography>
        <Fab variant="extended" color="danger" size="medium" sx={{marginBottom:"2rem"}} onClick={(e)=>handleGoToMyAccount(e)}>
            Go to my account <CallMissedOutgoingIcon sx={{ml:1,color:"blue"}} />
        </Fab>
        
        <Fab variant="extended" color="danger" size="medium" onClick={(e)=>setViewAccount(false)}>
            not now <CloseIcon sx={{ml:1,color:"blue"}} />
        </Fab>

    </ShowMain>
  )
}

export default ShowGoToMyAccount