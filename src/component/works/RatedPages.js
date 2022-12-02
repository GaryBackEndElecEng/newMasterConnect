import React, { useContext, useState, useEffect } from 'react';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import { Stack, Grid, Container, Typography, Fab, Card, Avatar } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SeeReview from './SeeReview';
import { Box } from '@mui/system';
const MainRatedContainer = styled(Container)`
margin:auto;
display:flex;
justify-content:center;
align-items:center;
flex-direction:center;
box-shadow:1px 1px 14px 5px lightgrey;
background:${({ bg }) => bg};
animation: growIN 1s ease-in-out;
@keyframes growIN {
    from{opacity:0;}
    to{opacity:1;}
}
`;

const RatedPages = ({ helmetProduct }) => {
    const { staticImage } = useContext(GeneralContext);
    const theme = useTheme();
    const [seeRev, setSeeRev] = useState({ loaded: false, id: 0 ,review:[]});

    const handleSeeRev = (e, id,review) => {
        e.preventDefault();
        if (seeRev.loaded === false) {
            setSeeRev({ loaded: true, id: id,review:review });
        } else { setSeeRev({ loaded: false, id: 0,review:[] }) }

    }
    
    return (
        <MainRatedContainer
            maxWidth="xl"
            bg={theme.palette.common.blueFade}
        >
            <Grid container spacing={{ xs: 0, sm: 1 }}>
                {helmetProduct.map((obj, index) => (
                        <Grid item xs={12} sm={6} md={3} key={`${obj.id}-ratings-${index}`}
                        onMouseOut={()=>setSeeRev({loaded:false,id:0,review:[]})}
                        >
                            <Card elevation={3} sx={{ padding: "0.5rem" }}>
                                <Avatar src={`${staticImage}/${obj.imageName}`} alt="www.master-connect.ca" sx={{ padding: "5px", background: theme.palette.common.blueGrey, height: "110%" }} />
                                <Typography component="h1" variant="h5">{obj.name}</Typography>
                                <span><span style={{color:"red",marginRight:"5px"}}>count:</span>{obj.review.length}</span>
                                <Typography component="h1" variant="h6">
                                    <AttachMoneyIcon sx={{ ml: 1, color: "green", fontSize: "120%" }} />
                                    {obj.monthly}<sup>00</sup>
                                </Typography>
                                <Stack direction="column" spacing={0} sx={{ textAlign: "center" }}>
                                    <Fab variant="extended" color="warning" size="small" onClick={(e) => handleSeeRev(e, obj.id,obj.review)}>
                                        see review
                                    </Fab>
                                </Stack>
                                {(seeRev.loaded && seeRev.id === obj.id && obj.review.length !== 0) &&
                                 <SeeReview review={seeRev.review} />
                                 }
                            </Card>

                        </Grid>
                       
                ))}
            </Grid>

        </MainRatedContainer>
    )
}

export default RatedPages