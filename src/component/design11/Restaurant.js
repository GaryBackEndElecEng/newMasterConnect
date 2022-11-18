import React, { useState, useContext, useEffect,  } from 'react';
import { Stack, Typography, Container, Grid, Button } from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider';
// import { TokenAccessContext } from '../../context/TokenAccessProvider';
// import { PriceContext } from '../../context/PriceContextProvider';
import UserSignedInPurchaseBtn from '../utils/UserSignedInPurchaseBtn';
import CoverPage from './CoverPage';
import styled from 'styled-components';
// import styles from './design11.module.css'
// import Design11Helmet from './Design11Helmet';
// import jsonArray from './JsonArray.json';
import RegisterPage from '../RegisterPage';
import GetRegisterPages from '../utils/GetRegisterPages';
import PageFeedback from '../utils/PageFeedback';
import { useTheme } from '@mui/material/styles';
// import MidBanner from './MidBanner';
// import BannerGetQuote from './BannerGetQuote';
import ModalContainer from '../utils/ModalContainer';
import StarIcon from '@mui/icons-material/Star';

const MainRestaurant = styled.div`
width:100vw;
margin:auto;
margin-top:0px;
display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:center;
position:relative;
@media screen and (max-width:900px){
    margin-top:10px;
}
@media screen and (max-width:800px){
    margin-top:10px;
}
@media screen and (max-width:600px){
    margin-top:20px;
}
@media screen and (max-width:500px){
    margin-top:-50px;
    
}

`;

const Restaurant = () => {
    const theme = useTheme();
    const { setTitle, setStyleName } = useContext(GeneralContext);
    let lastPos = 0, ticking = 0;
    const [opacity, setOpacity] = useState(1);
    const [scrollPos, setScrollPos] = useState(0);
    const [showPurchaseBtn, setShowPurchaseBtn] = useState(false);

    useEffect(() => {
        setTitle("Restaurant Design");
        setStyleName(" Great for a restaurant owner");
        if (window.scrollY) {
            window.scroll(0, 0);
        }
        const getUser_id = localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")) : null;
        if (getUser_id) {
          setShowPurchaseBtn(true);
        }
    }, []);
    // SCROLL FUNCTION
    const scrollActivate = (lastPos) => {

        if (lastPos < 800) {
            setScrollPos(lastPos);
            setOpacity(1);
        } else { setOpacity(0); setScrollPos(0) }

        if (lastPos > 1400) {
            setOpacity(0);
        } else { setOpacity(1) }
    }
    // SCROLL EVENT LISTENER
    const getScroll = async (e) => {
        document.addEventListener("scroll", (e) => {
            lastPos = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (lastPos > 0) {
                        scrollActivate(lastPos);

                    }
                    ticking = false;
                });
                // setOpacity(0);
                ticking = true;
            }
        });
    }
    // getScroll();
    //  END SCROLL
    // COUNT TIMER


    // COUNT TIMER

    return (
        <MainRestaurant
        >
            <RegisterPage/>
            <GetRegisterPages/>
            <Container maxWidth="xl" sx={{ margin: "2rem auto", }}>
                <hr />
                <Grid container spacing={{ xs: 1, sm: 2 }}>
                    <Grid item xs={12} sm={8}>
                        <Stack direction="row" spacing={1} sx={{ flex: "6" }}>
                            <Button > Menu</Button>
                            <Button > Register</Button>
                            <Button > Extras</Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Stack direction="row" spacing={1} sx={{ flex: "6" }}>
                            <Button> log-in</Button>
                        </Stack>
                    </Grid>
                </Grid>
                <hr style={{ marginBottom: "2rem" }} />
            </Container>
            <Grid container spacing={{ xs: 0, md: 0 }}
                sx={{ overflow: "hidden", marginTop: { md: "-50px", xs: "60px", sm: "0px" }, margin: "1rem auto", }}
            >
                <Grid item xs={12} md={2} sx={{padding:"1rem"}} >
                    <Grid container spacing={0} >
                        <Grid item xs={12}  >
                            <Typography component="h1" variant="h1" sx={{ fontFamily: "great vibes" }}>La Cuisine</Typography>
                            <Stack direction="row">
                                <StarIcon sx={{ ml: 1, color: theme.palette.common.orangeFade2, fontSize: "26px" }} />
                                <StarIcon sx={{ ml: 1, color: theme.palette.common.orangeFade2, fontSize: "26px" }} />
                                <StarIcon sx={{ ml: 1, color: theme.palette.common.orangeFade2, fontSize: "26px" }} />
                                <StarIcon sx={{ ml: 1, color: theme.palette.common.orangeFade2, fontSize: "26px" }} />
                                <StarIcon sx={{ ml: 1, color: theme.palette.common.orangeFade2, fontSize: "26px" }} />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} >
                            <Typography component="h1" variant="h5">Great Tasting!</Typography>
                            <Typography component="h1" variant="h6">123 my address, city, Country</Typography>


                        </Grid>
                    </Grid>

                </Grid>
                <Grid item xs={12} md={10}

                >
                    <Container maxWidth="xl" sx={{ overflow: "hidden", marginTop: { md: "-50px", xs: "60px", sm: "0px" }, maxHeight: "100vh", position: "relative",margin:"2rem auto" }}>
                        <CoverPage scrollPos={scrollPos} />
                    </Container>
                </Grid>


            </Grid>
            <Container maxWidth="lg">
            <PageFeedback />
                    <Stack direction="column" sx={{ margin: "1rem auto" }}>
                        {showPurchaseBtn ? <UserSignedInPurchaseBtn />
                            :
                            <ModalContainer />}
                    </Stack>
            </Container>


        </MainRestaurant>
    )
}

export default Restaurant