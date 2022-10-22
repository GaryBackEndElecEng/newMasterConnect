import React, { useContext, useEffect, useState } from 'react';
import {useNavigate,useLocation} from 'react-router-dom';
import styles from './utils.module.css';
import styled from 'styled-components';
import { Box, Container, Fab, Grid, Paper, Stack, Typography } from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import apiProtect from '../axios/apiProtect';
import TargetRegister from './TargetRegister';
import Signin from '../signin/Signin';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import BalanceIcon from '@mui/icons-material/Balance';


const ContainerCus = styled(Container).attrs({ className: "ModalRegistration" })`
display:${({ display }) => display}
margin:3rem auto;
position:relative;
top:-100%;
width:100%;
animation: showRegistration 1.5s ease-in-out;
@keyframes showRegistration {
    from {opacity:0;transform:scale(0);}
    to {opacity:1;transform:scale(1);}
}
`;
const InfoBox = styled(Box)`
position:absolute;
top:60%;

width:60%;
animation: showInfo 1.5s ease-in-out;
@keyframes showInfo {
    from {opacity:0;transform:scale(0);}
    to {opacity:1;transform:scale(1);}
}
`;
const Modal = () => {
    const theme = useTheme();
    const location=useLocation();
    const navigate=useNavigate();
    const { url, register, setLoggedIn, error,setError, loggedIn,setChangePage,showRegistration, setShowRegistration,openSignin,setOpenSignin } = useContext(GeneralContext);
    const { priceCatelog } = useContext(PriceContext);
    const [showBlock, setShowBlock] = useState("none");
    const registered = register.username !=="" ? register.data : null;

    useEffect(()=>{
        const handleOpen = (e) => {
            setShowRegistration(true);
            setShowBlock('block');
        }
        handleOpen();
    },[setShowRegistration,setShowBlock])
    
const handleSignin= (e)=>{
    setOpenSignin(true);
    setShowRegistration(false);
}
    
    return (
        <>
            {
            showRegistration &&
                <ContainerCus display={showBlock} maxWidth={"sm"}
                        sx={{
                            display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", position: "relative",

                        }}>
                        <TargetRegister />
                        {error  &&
                            <InfoBox sx={{ margin: "auto" ,background:theme.palette.common.background,color:"white", padding:"1rem"}}>
                                {error &&
                                    <Stack direction="column">
                                        <Typography component="h1" variant="h5" sx={{ fontFamily: "Roboto" }}>
                                            User Name or email already exists
                                        </Typography>
                                        <Stack direction="row" spacing={1}>
                                        <Fab variant="extended" color="primary" onClick={(e)=>handleSignin(e)}>
                                            signin <VpnKeyIcon sx={{ml:1}}/>
                                        </Fab>
                                        <Fab variant="extended" color="secondary" onClick={(e)=>setError(false)}>
                                            Try again <BalanceIcon sx={{ml:1}}/>
                                        </Fab>
                                        </Stack>
                                    </Stack>
                                }
                                
                            </InfoBox>
                            
                        }

                    </ContainerCus>

            }
            {openSignin && <Container maxWidth="sm">

                <Signin/>
            </Container>}
        </>
    )
}

export default Modal