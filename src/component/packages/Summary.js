import React, { useState } from 'react';
import {  Box, Typography,  } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {useTheme} from '@mui/material/styles';
import styled from 'styled-components';

const CustEffect=styled.span`
animation:slideDown 1s ease-in-out;
@keyframes slideDown {
    from {opacity:0;}
    to {opacity:1;}
}
`;
const Summary = ({ obj,title }) => {
    const theme=useTheme();
    const [activate, setActivate] = useState({ loaded: false, id: null, icon: <KeyboardArrowUpIcon sx={{ ml: 1,color:"red" }} /> });
    const changeColor= activate.loaded ? theme.palette.common.blueGrey: "black";
    const underline=activate.loaded ? "underline":"none";

    const handleExtend = (e, obj) => {
        if (!activate.loaded) {
            setActivate({ loaded: true, id: obj.id, icon: <KeyboardArrowDownIcon sx={{ ml: 1,color:"blue" }} /> });
        } else { setActivate({ loaded: false, id: null, icon: <KeyboardArrowUpIcon sx={{ ml: 1,color:"red" }} /> }); }
    }
  
    return (
        <Box>
            <Typography component="h1" variant="h5" sx={{ margin: "0.5rem auto",color:changeColor,textDecoration:underline }}>{title} {activate.icon}</Typography>
            <Typography component="h1" variant="body1" sx={{ margin: "0.5rem auto", cursor: "pointer" }}
                onClick={(e) => handleExtend(e, obj)}
            >
                    {
                (activate.loaded && activate.id === obj.id) ?
                <CustEffect> {obj.summary}</CustEffect>
                       
                        :
                        <CustEffect style={{color:theme.palette.common.blueGreyDark}}> {obj.summary.slice(0, 100)}... </CustEffect>
                       
                }  
                
            </Typography>


        </Box>
    )
}

export default Summary