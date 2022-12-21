import React, { useContext, useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import { Grid, Container, Typography, Stack, Fab, Card, Box, CardMedia } from '@mui/material';
import CoverPage from './CoverPage';
import styled from 'styled-components';
import Description from './Description';
import Summary from './Summary';
import Products from './Products';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import TotalPrice from './TotalPrice';

const MainPackage = styled.div`
width:100vw;
margin-top:0px;
animation: clearIn 1s ease-in-out;
@keyframes clearIn {
    from {opacity:0;}
    to {opacity:1;}
}
@media screen and (max-width:900px){
    margin-top:0px;
}
@media screen and (max-width:800px){
    margin-top:0px;
}
@media screen and (max-width:400px){
    margin-top:-52px;
}
`;
const CustomBoxPopup = styled(Box)`
margin:auto;
background:white;
z-index:9999;
position:absolute;
top:85%;
left:0%;
width:100%;
box-shadow:1px 1px 10px 5px grey;
@media screen and (max-width:900px){
    top:80%;
}
@media screen and (max-width:800px){
    top:80%;
}
@media screen and (max-width:400px){
    top:85%;
}
`;
const Package = () => {
    const navigate = useNavigate();
    const { special, setChangePage, setTitle, setStyleName, staticImage } = useContext(GeneralContext);
    const { getPackages } = useContext(PriceContext);
    const [isSelected, setIsSelected] = useState(false);
    useEffect(() => {
        setTitle("Packages");
        setStyleName("packages for you");
        if (window.scrollY) {
            window.scroll(0, 0);
        }
    }, [setTitle, setStyleName]);

    const handleSelectPackage = (e, obj) => {
        e.preventDefault();
        if (obj) {
            setIsSelected({ loaded: true, id: obj.id });
        }
    }
    const handleRegistration=(e,obj)=>{
        e.preventDefault();
        localStorage.setItem("buypackage",obj.id);
        navigate("/register",setChangePage(true))
    }
    const handleSignin=(e,obj)=>{
        e.preventDefault();
        localStorage.setItem("buypackage",obj.id);
        navigate("/signin",setChangePage(true))
    }
    return (

        <MainPackage>
            <CoverPage />
            <Container maxWidth="xl" sx={{ margin: "1rem auto" }}>
                <Grid container spacing={{ xs: 0, sm: 1 }}>
                    {getPackages.loaded && getPackages.data.map((obj, index) => (
                        <Grid item xs={12} sm={6} md={4} key={`${obj.id}--packages-${index}`}>
                            <Card elevation={3} sx={{ display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "flex-start", padding: "0.5rem", position: "relative" }}>
                                <CardMedia component="img" src={`${staticImage}/${obj.image}`} height="300px" alt="www.master-connect.ca" />
                                <Typography component="h1" variant="h3" sx={{ margin: "1rem auto" }}>{obj.name}</Typography>
                                <Summary obj={obj} title={"summary"} />
                                <Description obj={obj} title={"description"} />
                                {/* PRODUCT SECTION */}

                                <Products mainProduct={obj.products[0]} package1={obj} title={obj.name} staticImage={staticImage} />
                                {/* PRICE SECTION */}
                                <TotalPrice obj={obj}/>
                                <Stack direction="column" spacing={0} sx={{ alignItems: "center", margin: "1rem auto", width: "100%" }}>
                                    <Fab variant="extended" color="secondary" size="medium"
                                        onClick={(e) => handleSelectPackage(e,obj)}
                                    >
                                        I want this <ThumbUpIcon sx={{ ml: 1, color: "red" }} />
                                    </Fab>
                                </Stack>
                                {(isSelected.loaded && isSelected.id === obj.id) &&
                                    <CustomBoxPopup>
                                        <Stack direction="column" spacing={1} sx={{ alignItems: "center",padding:"1rem" }}>
                                            <Typography component="h1" variant="h6">Are you registered with us?</Typography>
                                            <Stack direction="row" spacing={2} sx={{ justifyContent: "center",padding:"1rem" }}>
                                                <Fab variant="extended" size="small" color="primary"
                                                onClick={(e)=>handleSignin(e,obj)}
                                                >
                                                    Yes I am
                                                </Fab>
                                                <Fab variant="extended" size="small" color="primary"
                                                onClick={(e)=>handleRegistration(e,obj)}
                                                >
                                                    no I'm not
                                                </Fab>
                                            </Stack>
                                        </Stack>
                                    </CustomBoxPopup>
                                }
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </MainPackage>
    )
}

export default Package

