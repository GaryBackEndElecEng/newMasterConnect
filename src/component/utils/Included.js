import React, { useState } from 'react';
import { Box, Typography,  Stack, Paper, Fab,Container } from '@mui/material';
import styled from 'styled-components';
import {useTheme} from '@mui/material';
import IncludedServices from './IncludedServices';
import IncludedPostServices from './IncludedPostServices';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { DesignServicesOutlined } from '@mui/icons-material';
import { theme } from '../../context/theme';

const CustStack = styled(Stack)`
margin:1rem auto;
justify-content:flex-start;
align-items:center;
width:100%;
position:relative;
`;
const Included = ({ product,staticImage }) => {
    const theme=useTheme();
    const test=product ? product:null;
    const servLength = (test && test.services) ? ((test.services.length>0)? true:false) : false;
    const postServLength = (product && product.postServices) ? ((test.postServices.length>0)? true:false) : false;
    const [activateServ, setActivateServ] = useState({ loaded: false, id: null, length: servLength,services:null, icon: <ArrowUpwardIcon sx={{ ml: 1, mr: 1, color: "red" }} /> });
    const [activatePostServ, setActivatePostServ] = useState({ loaded: false, id: null,postServices:null, length: postServLength, icon: <ArrowUpwardIcon sx={{ ml: 1, mr: 1, color: "red" }} /> });


    const handleService = (e, product) => {
        if (!activateServ.loaded && servLength) {
            setActivateServ({ loaded: true, id: product.id, title: product.name,services:product.services, length: servLength, icon: <ArrowDownwardIcon sx={{ ml: 1, mr: 1, color: "red" }} /> })
        } else {
            setActivateServ({ loaded: false, id: null, title: "", length: servLength,services:null, icon: <ArrowUpwardIcon sx={{ ml: 1, mr: 1, color: "red" }} /> })
        }
    }
    const handlePostService = (e, product) => {
        if (!activatePostServ.loaded && postServLength) {
            setActivatePostServ({ loaded: true, id: product.id, title: product.name,postServices:product.postServices, length: postServLength, icon: <ArrowDownwardIcon sx={{ ml: 1, mr: 1, color: "red" }} /> })
        } else {
            setActivatePostServ({ loaded: false, id: null, title: "", length: postServLength,postServices:null, icon: <ArrowUpwardIcon sx={{ ml: 1, mr: 1, color: "red" }} /> })
        }
    }
    // console.log(activateServ.length,servLength,activateServ)
    return (
        <Container maxWidth="md">
            <DesignServicesOutlined sx={{width:"100%",borderBottom:"1px solid black",margin:"1rem auto"}}/>
            <Typography component="h1" variant="h4" sx={{textAlign:"center",color:theme.palette.common.blueGrey}}>Included Services and Post services</Typography>
        <CustStack direction="column" spacing={{ xs: 0, sm: 1 }}>
            <Paper elevation={10} sx={{ margin: ".5rem auto", width: "100%",padding:"1rem" }}>
                <Stack direction="column" sx={{ justifyContent: "center", alignItems: "center", margin: "auto" }}>
                    <Box sx={{margin:"auto",textAlign:"center"}}>
                        {servLength &&
                            <>
                                <Typography component="h1" variant="h5">Service packages</Typography>
                                <Fab variant="extended" size="small" color="primary"
                                    onClick={(e) => handleService(e, product)}
                                >
                                    {(activateServ.loaded && activateServ.id === product.id && activateServ.length) ?
                                        <>{activateServ.icon} Hide Service</>
                                        :
                                        <>{activateServ.icon} Show Service</>
                                    }
                                </Fab>
                            </>
                        }
                        {(activateServ.loaded && activateServ.id === product.id) &&
                            <IncludedServices
                                services={activateServ.services}
                                title={activateServ.title}
                                staticImage={staticImage}
                            />
                        }
                        {postServLength &&
                            <>
                                <Typography component="h1" variant="h5">Post Service Packages</Typography>
                                <Fab variant="extended" size="small" color="primary"
                                    onClick={(e) => handlePostService(e, product)}
                                >
                                    {(activatePostServ.loaded && activatePostServ.id === product.id && activatePostServ.length) ?
                                        <>{activatePostServ.icon} Hide Post Services</>
                                        :
                                        <>{activatePostServ.icon} Show Post Services</>
                                    }
                                </Fab>
                            </>
                        }
                        {(activatePostServ.loaded && activatePostServ.id === product.id && activatePostServ.length) &&
                            <IncludedPostServices
                                postServices={activatePostServ.postServices}
                                title={activatePostServ.title}
                                staticImage={staticImage}
                            />
                        }
                    </Box>
                </Stack>
            </Paper>
        </CustStack>
        </Container>
    )
}

export default Included