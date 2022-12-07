import React, { useContext, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import {  Stack, Typography, Container, Avatar, Card,  CardMedia, IconButton } from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';


const Profile = () => {
    const navigate=useNavigate();
    const {setChangePage}=useContext(GeneralContext);
    const [widthLarge,setWidthLarge]=useState(false);
    const profilePic = `https://new-master.s3.ca-central-1.amazonaws.com/static/logo.png`;
    const Bcard="https://new-master.s3.ca-central-1.amazonaws.com/BusinessCard4_New.png";
    const enlarge= widthLarge ? "scale(1)":"scale(0.5)";

    const handleEnlarge =()=>{
        if(widthLarge===false){
        setWidthLarge(true);
        // console.log("true")
        }else{
            // console.log(false)
            setWidthLarge(false)}
    }
    const handleLink=(e)=>{
        e.preventDefault();
        navigate("/contact",setChangePage(true));
        if(window.scrollY){
            window.scroll(0,0);
          }
    }
    return (
        <Container maxWidth="md" >
            <Card elevation={10} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%",transform:{xs:enlarge,md:enlarge}  }}
            
            >
                <CardMedia component="img" src={Bcard} alt="www.master-connect.ca" height="100%"
                onClick={(e)=>handleEnlarge(e)}
                />
                <Stack direction="row" sx={{justifyContent:"center"}}>
                    <Typography component="h1" variant="h5">Gary</Typography>
                    <Avatar src={profilePic} alt="www.master-connect.ca" sx={{ boxShadow: "1px 1px 9px 3px white", width: "50px", height: "55px", margin: "0.25rem 6px" }} />
                    <Typography component="h1" variant="h5">Wallace</Typography>
                </Stack>
                <Typography component="h1" variant="h6">
                    For more
                    <IconButton onClick={(e)=>handleLink(e)} sx={{ ml: 2,borderRadius:"10%" }}>
                        Contact <CallMissedOutgoingIcon sx={{ml:1,color:"red"}}/>
                    </IconButton>
                </Typography>

            </Card>
        </Container>
    )
}

export default Profile