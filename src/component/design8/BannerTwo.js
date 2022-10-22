import React, { useEffect, useContext, useState, useRef } from 'react';
import { Card, CardMedia, Box, Stack, Image, Container, Grid, Typography, Paper, Button, Fab } from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import styles from './design8.module.css';

const MainContainer = styled.div`
margin: 0px auto;
width:100vw;
overflow:hidden;
position:relative;
background-image:url(${({ bg }) => bg});
background-size:100% 100%;
display:flex;
justify-content:center;
min-height:36vh;
align-items:center;
flex-direction:column;
@media screen and (max-width:900px){
    margin-top:-20px;
}
@media screen and (max-width:600px){
margin-top:-20px;
}
`;
const BannerTwo = () => {
    const {staticImage}=useContext(GeneralContext);
    const service = ` ${staticImage}/design8/service.png`;
    const service2 = ` ${staticImage}/design8/service2.png`;
    const service3 = ` ${staticImage}/design8/service3.png`;
    const white = ` ${staticImage}/design8/white.png`;
    const array = [{ id: 0, card: "card one", title: " Services", content: " Express your services",image:service }, { id: 1, card: "card two", title: " Your Products", content: " Express your Products",image:service2 }, { id: 2, card: "card three", title: " Your Specials or extras", content: " Express your Specials here",image:service3 },]
    const theme = useTheme();
    const mountainBg = `${staticImage}/design8/mountainBg.png`;
    const extraImg =` ${staticImage}/design8/successPic.png`;
    
    return (
        <MainContainer bg={mountainBg}>
            <hr style={{ width: "50%", color: theme.palette.common.blueGrey, height: "0.5rem" }} />
            <Container maxWidth="md" >
                <Grid container spacing={{ xs: 0, sm: 1, md: 2 }}
                    sx={{ padding: "1rem" }}
                >
                    <img src={white} alt="www.master-connect.ca" className={styles.white}/>
                    {array && array.map(obj => (
                        <Grid item xs={12}  md={4} key={obj.id}>
                            <Card elevation={20}
                                sx={{ background:theme.palette.home.lightBlueGrey, padding: "1rem",boxShadow:"1px 1px 8px 13px white" ,color:"white"}}
                            >
                                <CardMedia component="img" src={obj.image} alt="www.master-connect.ca"
                                sx={{background:theme.palette.common.light,borderRadius:"50%",padding:"0.5rem",boxShadow:`1px 1px 8px 13px ${theme.palette.common.blueGreyFade}`,width:"100%",height:"100%"}}
                                />
                                <Typography component="h1" variant="h6" sx={{ margin: "1rem auto" }}>{obj.card}</Typography>
                                <Stack spacing={{ xs: 0, sm: 1, md: 2 }} direction="column">
                                    <Typography component="h1" variant="h4" sx={{ margin: "1rem auto" }}>{obj.title}</Typography>
                                    <Typography component="h1" variant="body2" sx={{ margin: "1rem auto" }}>{obj.content}</Typography>
                                </Stack>
                                <hr style={{ width: "100%", color: theme.palette.common.background }} />
                                <Stack direction="column" spacing={{ xs: 0, sm: 1, md: 2 }}
                                    sx={{ alignItems: "center", justifyContent: "center" }}
                                >
                                    <Fab variant="extended"
                                        sx={{ background: theme.palette.common.blueGrey, "@:hover": { background: theme.palette.common.background2 } }}
                                    >
                                        Book <BookmarkAddedIcon sx={{ ml: 1 }} />

                                    </Fab>
                                </Stack>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </MainContainer>
    )
}

export default BannerTwo