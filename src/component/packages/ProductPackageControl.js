import React, { useState } from 'react';
import { Box, Typography,  Stack, Paper, Fab } from '@mui/material';
import styled from 'styled-components';
import Products from './Products';
import Services from './Services';
import PostServices from './PostServices';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const CustStack = styled(Stack)`
margin:1rem auto;
justify-content:flex-start;
align-items:center;
width:100%;
position:relative;
`;
const ProductPackageControl = ({ products, services, postServices, mainPackage, staticImage }) => {
    const prodLength = products.length > 0 ? true : false;
    const servLength = services.length > 0 ? true : false;
    const postServLength = postServices.length > 0 ? true : false;
    const [activateProd, setActivateProd] = useState({ loaded: false, id: null, products: null, length: prodLength, icon: <ArrowUpwardIcon sx={{ ml: 1, mr: 1, color: "red" }} /> });
    const [activateServ, setActivateServ] = useState({ loaded: false, id: null, services: null, length: servLength, icon: <ArrowUpwardIcon sx={{ ml: 1, mr: 1, color: "red" }} /> });
    const [activatePostServ, setActivatePostServ] = useState({ loaded: false, id: null, postServices: null, length: postServLength, icon: <ArrowUpwardIcon sx={{ ml: 1, mr: 1, color: "red" }} /> });


    const handleProduct = (e, mainpackage) => {
        if (!activateProd.loaded && prodLength) {
            setActivateProd({ loaded: true, id: mainPackage.id, products: products, title: mainpackage.name, length: prodLength, icon: <ArrowDownwardIcon sx={{ ml: 1, mr: 1, color: "red" }} /> })
        } else {
            setActivateProd({ loaded: false, id: null, products: null, title: "", length: prodLength, icon: <ArrowUpwardIcon sx={{ ml: 1, mr: 1, color: "red" }} /> })
        }
    }
    const handleService = (e, mainpackage) => {
        if (!activateServ.loaded && servLength) {
            setActivateServ({ loaded: true, id: mainPackage.id, services: services, title: mainpackage.name, length: servLength, icon: <ArrowDownwardIcon sx={{ ml: 1, mr: 1, color: "red" }} /> })
        } else {
            setActivateServ({ loaded: false, id: null, services: null, title: "", length: servLength, icon: <ArrowUpwardIcon sx={{ ml: 1, mr: 1, color: "red" }} /> })
        }
    }
    const handlePostService = (e, mainpackage) => {
        if (!activatePostServ.loaded && postServLength) {
            setActivatePostServ({ loaded: true, id: mainPackage.id, postServices: postServices, title: mainpackage.name, length: postServLength, icon: <ArrowDownwardIcon sx={{ ml: 1, mr: 1, color: "red" }} /> })
        } else {
            setActivatePostServ({ loaded: false, id: null, postServices: null, title: "", length: postServLength, icon: <ArrowUpwardIcon sx={{ ml: 1, mr: 1, color: "red" }} /> })
        }
    }
    return (
        <CustStack direction="column" spacing={{ xs: 0, sm: 1 }}>
            <Paper elevation={10} sx={{ margin: ".5rem auto", width: "100%",padding:"1rem",borderRadius:"5%",paddingBottom:"2rem" }}>
                <Stack direction="column" sx={{ justifyContent: "center", alignItems: "center", margin: "auto" }}>
                    <Box sx={{margin:"auto",textAlign:"center"}}>
                        {activateProd.length &&
                            <>
                                <Typography component="h1" variant="h5">Product Packages</Typography>
                                <Fab variant="extended" size="small" color="primary"
                                    onClick={(e) => handleProduct(e, mainPackage)}
                                >
                                    {(activateProd.loaded && activateProd.id === mainPackage.id && activateProd.length) ?
                                        <>{activateProd.icon} Hide Products</>
                                        :
                                        <>{activateProd.icon} Show Products</>
                                    }
                                </Fab>
                            </>
                        }
                        {(activateProd.loaded && activateProd.id === mainPackage.id && activateProd.length) &&
                            <Products
                                mainProducts={activateProd.products}
                                title={activateProd.title}
                                staticImage={staticImage}
                            />
                        }
                        {activateServ.length &&
                            <>
                                <Typography component="h1" variant="h5">Service packages</Typography>
                                <Fab variant="extended" size="small" color="secondary"
                                    onClick={(e) => handleService(e, mainPackage)}
                                >
                                    {(activateServ.loaded && activateServ.id === mainPackage.id && activateServ.length) ?
                                        <>{activateServ.icon} Hide Service</>
                                        :
                                        <>{activateServ.icon} Show Service</>
                                    }
                                </Fab>
                            </>
                        }
                        {(activateServ.loaded && activateServ.id === mainPackage.id) &&
                            <Services
                                services={activateServ.services}
                                title={activateServ.title}
                                staticImage={staticImage}
                            />
                        }
                        {activatePostServ.length &&
                            <>
                                <Typography component="h1" variant="h5">Post Service Packages</Typography>
                                <Fab variant="extended" size="small" color="info"
                                    onClick={(e) => handlePostService(e, mainPackage)}
                                >
                                    {(activatePostServ.loaded && activatePostServ.id === mainPackage.id && activatePostServ.length) ?
                                        <>{activatePostServ.icon} Hide Post Services</>
                                        :
                                        <>{activatePostServ.icon} Show Post Services</>
                                    }
                                </Fab>
                            </>
                        }
                        {(activatePostServ.loaded && activatePostServ.id === mainPackage.id && activatePostServ.length) &&
                            <PostServices
                                postServices={activatePostServ.postServices}
                                title={activatePostServ.title}
                                staticImage={staticImage}
                            />
                        }
                    </Box>
                </Stack>
            </Paper>
        </CustStack>
    )
}

export default ProductPackageControl