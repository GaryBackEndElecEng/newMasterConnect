import React, { useContext, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
// import { PriceContext } from '../../context/PriceContextProvider';
import { Grid, Typography, Stack, Card, CardContent, Avatar, Fab, Box } from '@mui/material';
import apiProtect from '../axios/apiProtect';
import SpecialCreatValueCardProduct from './SpecialCreatValueCardProduct';
import SpecialCreatValueCardService from './SpecialCreatValueCardService';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import styles from "./home.module.css";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DoneIcon from '@mui/icons-material/Done';
import ShopIcon from '@mui/icons-material/Shop';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const HaveAccountStack = styled(Stack)`
display:${({ display }) => display};
animation: growIn 1s ease-in-out;
@keyframes growIn {
    from {transform:scale(0);}
    to {transform:scale(1);}
}
`;
const CustStack=styled(Stack)`
margin:1rem auto;
animation: slideDown 1s ease-in-out;
@keyframes slideDown {
    from { opacity:0; transform:translateY(-100%);}
    to { opacity:1; transform:translateY(0%);}
}
`;
const SpecialCreatValueCard = ({ pointer, getSpecials }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { staticImage, setChangePage } = useContext(GeneralContext);
    const { user_id, loggedIn, setUserAccount, setUsersService, setUsersPostService } = useContext(TokenAccessContext);
    const [activatePopUp, setActivatePopUp] = useState({ loaded: false, id: 0 });
    const [showSummary, setShowSummary] = useState({ loaded: false, id: 0, summary: "" });
    const [showServices, setShowServices] = useState({ loaded: false, id: 0, service: "" });
    const get_user_id = localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")) : user_id;
    const get_loggedIn = localStorage.getItem("loggedIn") ? JSON.parse(localStorage.getItem("loggedIn")) : loggedIn;
   
    // const get_packages = getPackages.loaded ? getPackages.data : null;


    const handleBuyPackage = (e, package_id, isSignin) => {
        //dont have account
        e.preventDefault();
        const sendPackageToCart = async (params) => {
            try {
                const res = await apiProtect.post('/account/savePackage/', params);
                const user_account = res.data;
                setUserAccount({ loaded: true, data: user_account });
                if (user_account.service.length > 0) {
                    setUsersService({ loaded: true, data: user_account.service });
                }
                if (user_account.product.length > 0) {
                    setUsersService({ loaded: true, data: user_account.product });
                }
                if (user_account.postService.length > 0) {
                    setUsersPostService({ loaded: true, data: user_account.postService });
                }
                localStorage.removeItem("buypackage");
            } catch (error) {
                console.error(error.message)
            }
        }

        if (get_user_id && get_loggedIn) {
            const params = {
                user_id: user_id,
                packageId: package_id
            }
            sendPackageToCart(params);
            navigate("/MyAccount");
            setChangePage(true);
        } else {
            if (isSignin === true) {
                navigate("/signin")
                setChangePage(true);
            } else {
                navigate("/register");
                setChangePage(true);
            }
        }

    }

    const handleSigninYes = (e, package_id) => {
        e.preventDefault();
        localStorage.setItem("buypackage", package_id)
        handleBuyPackage(e, package_id, true);
        setActivatePopUp({ loaded: false, id: 0 });

    }
    const handleSigninNo = (e, package_id) => {
        e.preventDefault();
        localStorage.setItem("buypackage", package_id)
        handleBuyPackage(e, package_id, false);
        setActivatePopUp({ loaded: false, id: 0 });
    }

    const handleActivatePopUp = (e, id) => {
        e.preventDefault();
        setActivatePopUp({ loaded: true, id: id });

    }

    const handleShowServices = (e,obj) => {
        e.preventDefault();
            if (!showServices.loaded) {
                setShowServices({ loaded: true,id:obj.id });
                
            } else {
                
                setShowServices({ loaded: false,id:null })
            }

    }
    return (
        <>
            {getSpecials.loaded && getSpecials.data.map((obj, index) => (
                <Grid item xs={12} md={4} key={`${obj.id}-${index}`}
                    sx={{
                        display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column",
                        margin: "1rem 0px"
                    }}
                >

                    <Card elevation={3} className={pointer ? styles.growBig : ""}
                        sx={{ padding: "0rem 1rem", position: "relative" }}
                    >
                        <Stack direction="column" spacing={0} sx={{ alignItems: "flex-start", marginBottom: "1rem",margin:"0.5rem" }}>
                            <Avatar src={"https://new-master.s3.ca-central-1.amazonaws.com/static/logo.png"} alt="www.master-connect.ca" variant="circular" sx={{ width: "70px", height: "70px" }} />
                        </Stack>
                        <Typography component="h1" variant="h3"
                            sx={{ color: theme.palette.common.background, margin: "0.5rem auto", textAlign: "center", }}
                        >
                            {obj.name}
                            <DoneIcon className={pointer ? styles.rotateDeal : styles.noRotateDeal} sx={{ ml: 2, fontSize: { xs: "20px", sm: "25px", md: "30px" } }} />
                        </Typography>

                        {(!activatePopUp.loaded && activatePopUp.id !== obj.id) ?

                            <Stack direction="column" spacing={0}
                                sx={{ alignItems: "center", justifyContent: "center" }}
                            >
                                <Fab variant="extended" color="info" size="medium"
                                    // onClick={(e)=>handleBuyPackage(e,obj.id)}
                                    onClick={(e) => handleActivatePopUp(e, obj.id)}
                                >
                                    purchase <ShopIcon sx={{ ml: 1, color: "red" }} />
                                </Fab>

                            </Stack>
                            :
                            <HaveAccountStack display={activatePopUp.id === obj.id ? "block" : "none"} direction="column" spacing={0}
                                sx={{ alignItems: "center", justifyContent: "center", position: "absolute", top: "10%", left: "0%", width: "100%", background: "white", padding: "1rem", boxShadow: "1px 1px 12px 4px grey", zIndex: 1000 }}
                            >
                                <Typography component="h1" variant="h4"> Do you have an account with us?</Typography>
                                <Typography component="h1" variant="h6"> NOTE: if you are signed, pressing either or will take you to your account, with the selected package deposited within your basket</Typography>
                                <Stack direction="row" spacing={{ xs: 1, sm: 2 }} sx={{ margin: "1rem auto" }}>
                                    <Fab variant="extended" color="info" size="medium"
                                        // onClick={(e)=>handleBuyPackage(e,obj.id)}
                                        onClick={(e) => handleSigninYes(e, obj.id)}
                                    >
                                        yes <FactCheckIcon sx={{ ml: 1, color: "red" }} />
                                    </Fab>
                                    <Fab variant="extended" color="info" size="medium"
                                        // onClick={(e)=>handleBuyPackage(e,obj.id)}
                                        onClick={(e) => handleSigninNo(e, obj.id)}
                                    >
                                        no <InfoIcon sx={{ ml: 1, color: "red" }} />
                                    </Fab>
                                </Stack>

                            </HaveAccountStack>

                        }

                        <CardContent>
                            <Typography component="h1" variant="h5"
                                sx={{ color: theme.palette.common.background2, textDecoration: "underline", margin: "0px auto", textAlign: "center", width: "100%", }}
                            >

                                <AttachMoneyIcon sx={{ ml: 1, color: "green" }} />
                                <span style={{ color: "red" }}>{obj.monthly}.<sup>00</sup></span>,
                                <span style={{ textDecoration: "line-through", color: "black" }}>
                                    <AttachMoneyIcon sx={{ ml: 1, color: "green" }} />{Math.ceil(obj.monthly * (1 + obj.reducePerc / 100))} </span>

                            </Typography>
                            <Typography component="h1" variant="h6">{obj.summary.slice(0,75)}...</Typography>



                            <Typography component="h1" variant="h5" sx={{ textDecoration: "underline", textAlign: "center", color: theme.palette.common.teal }}>Product</Typography>
                            <SpecialCreatValueCardProduct products={obj.products} staticImage={staticImage}/>
                            <Typography component="h1" variant="h5" sx={{
                                textDecoration: "underline", textAlign: "center",
                                color: theme.palette.common.teal
                            }}>
                                added services
                            </Typography>
                            <Stack direction="column" spacing={0} sx={{alignItems:"center",margin:"1rem auto"}}>
                            <Fab variant="extended" size="small" color="success"
                                onClick={(e) => handleShowServices(e,obj)}
                            >
                                see services {showServices.loaded && showServices.id === obj.id ?
                                    <ExpandMoreIcon sx={{ ml: 1, color: "red" }} />
                                    :
                                    <ExpandLessIcon sx={{ ml: 1, color: "black" }} />
                                }
                            </Fab>
                            </Stack>
                            {showServices.loaded && showServices.id === obj.id &&
                                <CustStack direction="column" sx={{ alignItems: "center" }}
                                >
                                    <SpecialCreatValueCardService services={obj.services} staticImage={staticImage}/>
                                </CustStack>
                            }




                        </CardContent>
                    </Card>

                </Grid>
            ))}
        </>
    )


}

export default SpecialCreatValueCard


