import React, { useState, } from 'react';
import { Stack, Box, Typography, Paper, Fab } from '@mui/material';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';
import Expander from './Expander';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const CustBoxEffect=styled(Box)`
animation: slideDown 1s ease-in-out;
@keyframes slideDown {
    from {opacity:0;transform:translate(0%,-100%);z-index:0;}
    to {opacity:1;transform:translate(0%,0%);z-index:1}
}
`;
const MainExpander = ({ obj, staticImage }) => {
    const theme = useTheme();
    const [expandThis, setExpandThis] = useState({ loaded: false, id: null });
    const bgColor = expandThis.loaded ? "red" : "blue";
    const textColor = expandThis.loaded ? "white" : "whitesmoke";

    const handleExpandMain = (e, id) => {
        if (expandThis.loaded) {
            setExpandThis({ loaded: false, id: null });
        } else {
            setExpandThis({ loaded: true, id: id });
        }
    }
    return (
        <>
            <Stack direction="column" spacing={2}>
                <Fab variant="extended"
                    sx={{ background: bgColor, color: textColor,'&:hover':{color:"black"} }}
                    onClick={(e) => handleExpandMain(e, obj.id)}
                >
                    {expandThis.loaded && expandThis.id === obj.id ?
                        <> close dependencies
                            <ExpandMoreIcon sx={{ ml: 1 }} />
                        </>
                        :
                        <> open dependancies
                            <ExpandLessIcon sx={{ ml: 1 }} />
                        </>
                    }
                </Fab>
            </Stack>
            {
                expandThis.loaded && expandThis.id === obj.id &&
                <CustBoxEffect>
                    <Paper elevation={1} sx={{ padding: "0.5rem", background: theme.palette.common.lighter, margin: "1rem auto" }}>

                        {
                            (obj.products && obj.products.length > 0) &&
                            <Typography component="h1" variant="h4"
                                sx={{ margin: "1rem auto", textAlign: "center" }}
                            >
                                Product
                            </Typography>

                        }
                        <Expander id={obj.id} arr={obj.products} staticImage={staticImage} />
                    </Paper>
                    <Paper elevation={1} sx={{ padding: "0.5rem", background: theme.palette.common.lighter, margin: "1rem auto" }}>
                        {(obj.services && obj.services.length > 0) && <Typography component="h1" variant="h4"
                            sx={{ margin: "1rem auto", textAlign: "center" }}
                        >
                            Service
                        </Typography>}
                        <Expander id={obj.id} arr={obj.services} staticImage={staticImage} />
                    </Paper>
                    <Paper elevation={1} sx={{ padding: "0.5rem", background: theme.palette.common.lighter, margin: "1rem auto" }}>
                        {(obj.postServices && obj.postServices.length > 0) && <Typography component="h1" variant="h4"
                            sx={{ margin: "1rem auto", textAlign: "center" }}
                        >
                            Post Service</Typography>}
                        <Expander id={obj.id} arr={obj.postServices} staticImage={staticImage} />
                    </Paper>
                </CustBoxEffect>
            }
        </>
    )
}

export default MainExpander