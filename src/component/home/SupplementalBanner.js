import React,{useState,useEffect,useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {GeneralContext} from '../../context/GeneralContextProvider';
import {Stack,Fab,Box} from '@mui/material';
import styled from 'styled-components';


const CustBanner=styled.div`
width:100%;
margin: 1rem auto;
min-height:30vh;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
background-image:url(${({bg_image})=>bg_image});
background-position:50% 50%;
background-size:100% 100%;

`;
const SupplementalBanner = ({staticImage}) => {
    const {setChangePage}=useContext(GeneralContext);
    const navigate=useNavigate();

    const handleNavPackage=(e)=>{
        e.preventDefault();
        navigate('/packages',setChangePage(true));
    }
    const handleNavVideo=(e)=>{
        e.preventDefault();
        navigate('/video',setChangePage(true));
    }
    const handleNavDesign=(e)=>{
        e.preventDefault();
        navigate('/works',setChangePage(true));
    }
  return (
    <CustBanner
    bg_image={`${staticImage}/bg_whiteBlue.png`}
    >
        <Stack direction={{xs:"column",sm:"row"}} spacing={3} sx={{alignItems:"center"}}>
        <Fab variant="extended" size="medium" color="primary"
        onClick={(e)=>handleNavPackage(e)}
        >
            Packages
        </Fab>
        <Fab variant="extended" size="medium" color="primary"
        onClick={(e)=>handleNavVideo(e)}
        >
            Videos
        </Fab>
        <Fab variant="extended" size="medium" color="primary"
        onClick={(e)=>handleNavDesign(e)}
        >
            designs
        </Fab>
        </Stack>
    </CustBanner>
  )
}

export default SupplementalBanner