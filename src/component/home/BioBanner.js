import React, { useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {GeneralContext} from '../../context/GeneralContextProvider';
import styled from "styled-components";
import {Paper,Typography,Stack,Fab} from '@mui/material';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';

const MainBanner = styled(Paper)`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
min-height:30vh;
position:relative;
width:100vw;
background-image:url(${({bg_image})=>bg_image});
background-size: 100% 100%;
animation:swipeIn 1.5s ease-in-out;
@keyframes swipeIn {
from { opacity:0;}
to {opacity:1;}
}
`;
const LogoImg = styled.img`
position:absolute;
top: 0%;
left:20%;
width:20%;
animation:crossIn 2.5s ease-in-out;
@keyframes crossIn {
    from { opacity:0;transform:translate(-100%,-150%) scale(0);}
    to { opacity:1;transform:translate(0%,0%)scale(1);}
}
@media screen and (max-width:900px){
    top:0%;
    left:0%;
    width:26%;
}
@media screen and (max-width:600px){
top:0%;
left:0%;
width:20%;
}
@media screen and (max-width:400px){
top:0%;
left:-2%;
width:30%;
z-index:-0;
}
`;
const CustTypo=styled(Typography)`
animation:crossIn 2.5s ease-in-out;
z-index:100;
@keyframes crossIn {
    from { opacity:0;transform:translate(-100%,-150%) scale(0);}
    to { opacity:1;transform:translate(0%,0%)scale(1);}
}

`;

const BioBanner = () => {
    const navigate = useNavigate();
    const {setChangePage}=useContext(GeneralContext);
    const url="https://new-master.s3.ca-central-1.amazonaws.com/static/images";
    const bannerBioLogo=`${url}/bannerBioProfile.png`;
    const bannerBio=`${url}/bannerBio.png`;
    // const initiateMain= activate ? "swipeIn":"";
    // const initiateImg= activate ? "crossIn":"";

    const handleChangePage=(e)=>{
            e.preventDefault();
        navigate("/bio",setChangePage(true));

    }
  return (
    <MainBanner
    bg_image={bannerBio}
    // swipeIn={initiateMain}
    elevation={10}
    >
       
         <LogoImg  src={bannerBioLogo} alt="www.masterconnect.ca"/>
        <Stack direction="column"spacing={{xs:0,sm:1}}>
            <CustTypo component="h1" variant="h5" sx={{color:"white", margin:"1rem auto"}}>about the developer</CustTypo>
            <Fab variant="extended" color="info" size="medium" onClick={(e)=>handleChangePage(e)} >
                intriqued <CallMissedOutgoingIcon sx={{ml:1,color:"red"}} />
            </Fab>
        </Stack>
       

    </MainBanner>
  )
}

export default BioBanner