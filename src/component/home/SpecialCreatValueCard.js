import React, { useContext, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
// import { PriceContext } from '../../context/PriceContextProvider';
import { Grid, Typography, Stack, Card, CardContent, Avatar, Fab, CardMedia } from '@mui/material';
import apiProtect from '../axios/apiProtect';
import ProductPackageControl from '../packages/ProductPackageControl';
import Summary from '../packages/Summary';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import styles from "./home.module.css";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DoneIcon from '@mui/icons-material/Done';
import ShopIcon from '@mui/icons-material/Shop';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import InfoIcon from '@mui/icons-material/Info';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const HaveAccountStack = styled(Stack)`
display:${({ display }) => display};
animation: growIn 1s ease-in-out;
@keyframes growIn {
    from {transform:scale(0);}
    to {transform:scale(1);}
}
`;

const SpecialCreatValueCard = ({ pointer, getSpecials }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { staticImage, setChangePage } = useContext(GeneralContext);
    const { user_id, loggedIn, setUserAccount, setUsersService, setUsersPostService } = useContext(TokenAccessContext);
    const [activatePopUp, setActivatePopUp] = useState({ loaded: false, id: 0 });
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
                        <Stack direction="column" spacing={0} sx={{ alignItems: "flex-start", marginBottom: "1rem", margin: "0.5rem" }}>
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
                            <Summary
                            obj={obj}
                            title={obj.name}
                            />
                            <Typography component="h1" variant="h5"
                                sx={{ color: theme.palette.common.background, margin: "0px auto", textAlign: "center", width: "100%", }}
                            >
                                Pricing
                            </Typography>
                            <Typography component="h1" variant="h4"
                             sx={{display:"flex",flexDirection:"column",alignItems:"center",}}
                            >

                                <Stack direction="row" sx={{ margin: "0.5rem auto" }} spacing={2}>

                                    <span style={{ color: "red" }}><AttachMoneyIcon sx={{ ml: 1, color: "green" }} />{obj.monthly}.<sup>00</sup></span> -
                                    <span style={{ textDecoration: "line-through", color: "black" }}>
                                        <AttachMoneyIcon sx={{ ml: 1, color: "green" }} />{Math.ceil(obj.monthly * (1 + obj.reducePerc / 100))} </span> -
                                    <span style={{ color: "blue" }}><ArrowDropDownIcon sx={{ mr: 1, color: "red" }} /> {obj.reducePerc}%</span>
                                </Stack>

                            </Typography>
                            <CardMedia component="img" src={`${staticImage}/${obj.image}`} alt="www.masterconnect.ca" />
                            <ProductPackageControl
                                products={obj.products}
                                services={obj.services}
                                postServices={obj.postServices}
                                staticImage={staticImage}
                                mainPackage={obj}
                            />
                        </CardContent>
                    </Card>

                </Grid>
            ))}
        </>
    )


}

export default SpecialCreatValueCard


