import React, { useContext, useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { Grid, Container, Typography, Stack, Fab, Card, Box, CardMedia } from '@mui/material';
import CoverPage from './CoverPage';
import styled from 'styled-components';
import Description from './Description';
import Summary from './Summary';
import ProductPackageControl from './ProductPackageControl';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import TotalPrice from './TotalPrice';
import RegisterPage from '../RegisterPage';
import GetRegisterPages from '../utils/GetRegisterPages';
import PageRating from '../utils/PageRating';
import HelmetPrep from './HelmetPrep';
import apiProtect from '../axios/apiProtect';

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
top:70%;
left:0%;
width:100%;
box-shadow:1px 1px 10px 5px grey;
@media screen and (max-width:900px){
    top:70%;
}
@media screen and (max-width:800px){
    top:70%;
}
@media screen and (max-width:400px){
    top:70%;
}
`;
const Package = () => {
    const navigate = useNavigate();
    const { setChangePage, setTitle, setStyleName, staticImage, getPathLocation, pageRatings,average } = useContext(GeneralContext);
    const { getPackages } = useContext(PriceContext);
    const { user_id,loggedIn,setUserAccount,setUsersProduct,setUsersService,setUsersInvoice } = useContext(TokenAccessContext);
    const [isSelected, setIsSelected] = useState(false);
    const specialImg=`${staticImage}/specialImg.png`;
    const getUser_id=localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")):user_id;
    const getLoggedIn=localStorage.getItem("loggedIn") ? JSON.parse(localStorage.getItem("loggedIn")):loggedIn;

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
    const handleRegistration = (e, obj) => {
        e.preventDefault();
        localStorage.setItem("buypackage", obj.id);
        navigate("/register", setChangePage(true))
    }
    const handleSignin = (e, obj) => {
        e.preventDefault();
        localStorage.setItem("buypackage", obj.id);
        navigate("/signin", setChangePage(true))
    }
    const handleAllreadySignedIn=(e,obj)=>{
        e.preventDefault();
        const savePackage=async()=>{
            const params={
                user_id:getUser_id,
                packageId:obj.id

            };
            try {
                const res= await apiProtect.post('/account/savePackage/',params);
                const user_account= res.data;
                setUserAccount({loaded:true,data:user_account});
                setUsersProduct({loaded:true,data:user_account.product});
                setUsersService({loaded:true,data:user_account.service});
                setUsersInvoice({loaded:true,data:user_account.invoice});
                navigate("/MyAccount",setChangePage(true));
            } catch (error) {
                console.error(error.message)
            }
        }
        if(getLoggedIn){
            savePackage();
        }else{
            navigate("/signin",setChangePage(true));
            localStorage.setItem("buypackage", obj.id);
        }

    }
    
    return (

        <MainPackage>
            <RegisterPage />
            <GetRegisterPages />
            <PageRating />
            <HelmetPrep
            getPackages={getPackages}
            staticImage={staticImage}
            image={specialImg}
            average={average}
            getPathLocation={getPathLocation}
            pageRatings={pageRatings.loaded ? pageRatings.data:null}
            />
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
                                {/* PACKAGE CONTROL SECTION- ALL PRODUCTS/SERVS/POSTSERVS FLOW THROUGH */}
                                <ProductPackageControl
                                    products={obj.products ? obj.products :[]}
                                    services={obj.services ? obj.services :[]}
                                    postServices={obj.postServices ? obj.postServices : []}
                                    mainPackage={obj}
                                    staticImage={staticImage}
                                />
                                {/* PRICE SECTION */}
                                <TotalPrice obj={obj} />
                                <Stack direction="column" spacing={0} sx={{ alignItems: "center", margin: "1rem auto", width: "100%" }}>
                                    <Fab variant="extended" color="secondary" size="medium"
                                        onClick={(e) => handleSelectPackage(e, obj)}
                                    >
                                        I want this <ThumbUpIcon sx={{ ml: 1, color: "red" }} />
                                    </Fab>
                                </Stack>
                                {(isSelected.loaded && isSelected.id === obj.id) &&
                                    <CustomBoxPopup>
                                        <Stack direction="column" spacing={1} sx={{ alignItems: "center", padding: "1rem",margin:"auto" }}>
                                            <Typography component="h1" variant="h6">Are you registered with us?</Typography>
                                            <Stack direction="row" spacing={2} sx={{ justifyContent: "center", padding: "1rem" }}>
                                                <Fab variant="extended" size="small" color="primary"
                                                    onClick={(e) => handleSignin(e, obj)}
                                                >
                                                    Yes I am
                                                </Fab>
                                                <Fab variant="extended" size="small" color="warning"
                                                    onClick={(e) => handleRegistration(e, obj)}
                                                >
                                                    no I'm not
                                                </Fab>
                                            </Stack>
                                            <Typography component="h1" variant="h6">All ready signed in</Typography>
                                            <Stack direction="row" spacing={2} sx={{ justifyContent: "center", padding: "1rem" }}>
                                                <Fab variant="extended" size="small" color="primary"
                                                    onClick={(e) => handleAllreadySignedIn(e, obj)}
                                                >
                                                    select package
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

