import React, { useState } from 'react';
import { Box, Typography, Grid, Card, Avatar, Stack, Paper, CardMedia } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import Services from './Services';
import PostServices from './PostServices';

const CustBox = styled(Box)`
animation:slideDown 1s ease-in-out;
@keyframes slideDown {
    from {opacity:0;transform:translateY(-50%);}
    to {opacity:1;}
}
`;
const Products = ({ mainProducts, title, staticImage }) => {
    const theme = useTheme();
    const [activate, setActivate] = useState({ loaded: false, id: null, icon: <KeyboardArrowUpIcon sx={{ ml: 1 }} /> });
    const [activate1, setActivate1] = useState({ loaded: false, id: null, icon: <KeyboardArrowUpIcon sx={{ ml: 1 }} /> });
    const changeColor = activate.loaded ? theme.palette.common.blueGrey : "black";
    const underline = activate.loaded ? "underline" : "none";
    // const services=mainProduct ? mainProduct.services:null;
    // const postServices=mainProduct ? mainProduct.postServices:null;

    const handleExtend1 = (e, obj1) => {
        if (!activate.loaded) {
            setActivate({ loaded: true, id: obj1.id, icon: <KeyboardArrowDownIcon sx={{ ml: 1 }} /> });
        } else { setActivate({ loaded: false, id: null, icon: <KeyboardArrowUpIcon sx={{ ml: 1 }} /> }); }
    }
    const handleExtend2 = (e, obj1) => {
        if (!activate1.loaded) {
            setActivate1({ loaded: true, id: obj1.id, icon: <KeyboardArrowDownIcon sx={{ ml: 1 }} /> });
        } else { setActivate1({ loaded: false, id: null, icon: <KeyboardArrowUpIcon sx={{ ml: 1 }} /> }); }
    }

    return (
        <CustBox sx={{width:"100%"}}>
            <Typography component="h1" variant="h4" sx={{ margin: "0.5rem auto", color: changeColor, textDecoration: underline }}>{title} </Typography>
            {mainProducts && mainProducts.map((product, index) => (
                <Box key={`${product.id}--ProductHere--${index}`}>
                    <Typography component="h1" variant="h4" sx={{ margin: "0.5rem auto", color: changeColor, textDecoration: underline }}>Product </Typography>
                    <Stack direction={{xs:"column"}} spacing={{xs:0,sm:1}}>
                        <CardMedia component="img" src={`${staticImage}/${product.imageName}`} alt="www.master-connect.ca"
                        height="125px"
                        
                        />
                    <Typography component="h1" variant="h5" sx={{ margin: "0.5rem auto", color: changeColor, textDecoration: underline }}>{product.name} </Typography>
                    </Stack>
                    {
                        (product.services && product.services.length) > 0 &&

                        <Paper elevation={0} sx={{ margin: "0.5rem auto", cursor: "pointer", padding: "1rem"}}
                            onClick={(e) => handleExtend1(e, product)}
                        >
                            {
                                (activate.loaded && activate.id === product.id) ?
                                    <>
                                        <Typography component="h1" variant="h6" sx={{ margin: "0.5rem auto" }}>{activate.icon} Product included services</Typography>
                                        <Services staticImage={staticImage} services={product.services} title={product.name} />
                                    </>
                                    :
                                    <Stack direction="column" sx={{ alignItems: "center" }}>
                                        <Typography component="h1" variant="h6" sx={{ margin: "0.5rem auto" }}>{activate.icon} Product included services</Typography>
                                        <Typography component="h1" variant="h6"
                                            sx={{ color: "white", background: theme.palette.common.fadeCharcoal3, padding: "1rem", boxShadow: "1px 1px 8px 4px grey" }}
                                        >
                                            {product.name}
                                        </Typography>
                                    </Stack>

                            }

                        </Paper>

                    }
                    {
                        (product.postServices && product.postServices.length > 0) &&

                        <Paper elevation={0} sx={{ margin: "0.5rem auto", cursor: "pointer", padding: "1rem" }}
                            onClick={(e) => handleExtend2(e, product)}
                        >
                            {/* shows Post Services */}
                            {
                                (activate1.loaded && activate1.id === product.id) ?
                                    <>
                                        <Typography component="h1" variant="h6" sx={{ margin: "0.5rem auto" }}>{activate1.icon}Product included Post Service</Typography>
                                        <PostServices staticImage={staticImage} postServices={product.postServices} />
                                    </>
                                    :
                                    <Stack direction="column" sx={{ alignItems: "center" }}>
                                        <Typography component="h1" variant="h6" sx={{ margin: "0.5rem auto" }}>{activate1.icon}Product included Post Service</Typography>
                                        <Typography component="h1" variant="h6"
                                            sx={{ color: "white", background: theme.palette.common.fadeCharcoal3, padding: "1rem", boxShadow: "1px 1px 8px 4px grey" }}
                                        >
                                            {title}
                                        </Typography>
                                    </Stack>

                            }

                        </Paper>

                    }


                </Box>
            ))}
        </CustBox>
    )
}

export default Products