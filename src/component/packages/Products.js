import React, { useState } from 'react';
import { Box, Typography, Grid, Card, Avatar, Stack,Paper } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import Summary from './Summary';
import Description from './Description';
import Services from './Services';
import PostServices from './PostServices';

const CustGrid = styled(Grid)`
animation:slideDown 1s ease-in-out;
@keyframes slideDown {
    from {opacity:0;}
    to {opacity:1;}
}
`;
const Products = ({mainProduct,package1, title, staticImage}) => {
    const theme = useTheme();
    const [activate, setActivate] = useState({ loaded: false, id: null, icon: <KeyboardArrowUpIcon sx={{ ml: 1 }} /> });
    const [activate1, setActivate1] = useState({ loaded: false, id: null, icon: <KeyboardArrowUpIcon sx={{ ml: 1 }} /> });
    const changeColor = activate.loaded ? theme.palette.common.blueGrey : "black";
    const underline = activate.loaded ? "underline" : "none";
    const services=mainProduct ? mainProduct.services:null;
    const postServices=mainProduct ? mainProduct.postServices:null;

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
        <Box>
            <Typography component="h1" variant="h4" sx={{ margin: "0.5rem auto", color: changeColor, textDecoration: underline }}>{title} {activate.icon}</Typography>
            {
            services &&

             <Paper elevation={3} sx={{ margin: "0.5rem auto", cursor: "pointer" ,padding:"1rem"}}
                onClick={(e) => handleExtend1(e, package1)}
            >
                {
                    (activate.loaded && activate.id === package1.id) ?
                        <Services staticImage={staticImage} services={services}/>

                        :
                        <Stack direction="column" sx={{alignItems:"center"}}>
                            <Typography component="h1" variant="h5" sx={{margin:"0.5rem auto"}}>included services</Typography>
                        <Typography component="h1" variant="h6" 
                        sx={{ color:"blue", background: theme.palette.common.fadeCharcoal2 ,padding:"1rem",boxShadow:"1px 1px 8px 4px"}}
                        >
                           {title} 
                        </Typography>
                        </Stack>

                }

            </Paper>

            }
            {
            postServices  &&

             <Paper elevation={3} sx={{ margin: "0.5rem auto", cursor: "pointer" ,padding:"1rem"}}
                onClick={(e) => handleExtend2(e, package1)}
            >
                {
                    (activate1.loaded && activate1.id === package1.id) ?
                        <PostServices staticImage={staticImage} postServices={postServices}/>

                        :
                        <Stack direction="column" sx={{alignItems:"center"}}>
                            <Typography component="h1" variant="h5" sx={{margin:"0.5rem auto"}}>included Post Service</Typography>
                        <Typography component="h1" variant="h6" 
                        sx={{ color:"blue", background: theme.palette.common.fadeCharcoal2 ,padding:"1rem",boxShadow:"1px 1px 8px 4px"}}
                        >
                             {title} 
                        </Typography>
                        </Stack>

                }

            </Paper>

            }


        </Box>
    )
}

export default Products