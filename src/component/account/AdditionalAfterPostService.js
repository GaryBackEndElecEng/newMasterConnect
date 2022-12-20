import React, { useContext, useEffect, useState,useCallback } from 'react'

import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import { Stack, Container, Paper, Typography, Grid, ListItem, Fab, Card, CardActions, } from '@mui/material';
import apiProtect from '../axios/apiProtect';
import AdditionalAfterPostServiceCard from './AdditionalAfterPostServiceCard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
// import styles from './account.module.css';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import CheckOutExtra from './CheckOutExtra';

//extraService will be called once from MyAccount and extraInvoice will be called and sent here.
// This will show on postInvoice.paid from MyAccount
const AdditionalAfterPostService = ({ extraServices }) => {
    const theme = useTheme();
    // const logo = "https://new-master.s3.ca-central-1.amazonaws.com/static/logo.png";
    const { usersExtraInvoice, setUsersExtraInvoice, user_id, loggedIn, setUserAccount } = useContext(TokenAccessContext);
    const {staticImage} =useContext(GeneralContext);
    const [target, setTarget] = useState({ loaded: false, id: null });
    const [checkout, setCheckout] = useState(false);
    const [usersExtraService, setUsersExtraService] = useState({ loaded: false, data: [] });
    const [reducedExtraServices, setReducedExtraServices] = useState({ loaded: false, data: [] });
    const userID = localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")) : user_id;
    const getLoggedIn = localStorage.getItem("loggedIn") ? JSON.parse(localStorage.getItem("loggedIn")) : loggedIn;
    

    useEffect(() => {
        if(extraServices.loaded){
            let arr=extraServices.data;
            arr.forEach((service,index)=>{
                let objExists=usersExtraService.data.filter(obj=>(parseInt(obj.id)===parseInt(service.id)))[0];
                if(objExists){
                    arr.splice(index,1);
                }

            });
            setReducedExtraServices({loaded:true,data:arr})
            localStorage.setItem("extraServices",JSON.stringify(arr));
        }
    }, [extraServices]);


    useEffect(() => {
        const getExtraInvoice = async () => {
            try {
                const res = await apiProtect.post('account/userAllAccounts/', { "user_id": userID });
                const user_account = res.data;
                setUserAccount({ loaded: true, data: user_account })
                if (user_account.extraInvoice) {
                    setUsersExtraInvoice({ loaded: true, data: user_account.extraInvoice });
                }
                setUsersExtraService({ loaded: true, data: user_account.extraService })
                // console.log("BODY",body.extraService)
            } catch (error) {
                console.error(error.message)
            }
        }
        if (userID && getLoggedIn) {
            getExtraInvoice();
        }
    }, [userID, getLoggedIn, setUserAccount, setUsersExtraService, setUsersExtraInvoice]);




    const handleSubmit = (id) => {
        const submitServerAddService = async () => {
            try {
                const res = await apiProtect.post(`/account/extraService/${id}/`, { "user_id": userID });
                const user_account = res.data;
                let extraServiceReduced = reducedExtraServices.data.filter(obj => (parseInt(obj.id) !== parseInt(id)));
                setUserAccount({ loaded: true, data: user_account });
                setUsersExtraService({ loaded: true, data: user_account.extraService });
                setUsersExtraInvoice({ loaded: true, data: user_account.extraInvoice });
                localStorage.setItem("extraServices", JSON.stringify(extraServiceReduced));
                setReducedExtraServices({loaded:true,data:extraServiceReduced});
                
            } catch (error) {
                console.error(error.message)
            }
        }
        submitServerAddService();
    }


    const handleSubmitDelete = (id) => {
        const submitServerAddService = async () => {
            try {
                const res = await apiProtect.post(`/account/extraService/delete/${id}/`, { "user_id": userID });
                const user_account = res.data;
                let getItem = usersExtraService.data.filter(obj => (parseInt(obj.id) === parseInt(id)))[0];
                setUserAccount({ loaded: true, data: user_account });
                setUsersExtraInvoice({ loaded: true, data: user_account.extraInvoice });
                setUsersExtraService({ loaded: true, data: user_account.extraService });
                let isThere = reducedExtraServices.data.filter(obj => (parseInt(obj.id) === parseInt(id)))[0];
                if(isThere)return
                localStorage.setItem("extraServices", JSON.stringify([...reducedExtraServices.data, getItem]));
                setReducedExtraServices({loaded:true,data:[...reducedExtraServices.data,getItem]})
                
            } catch (error) {
                console.error(error.message)
            }
        }
        submitServerAddService();
    }

    const handleTarget = (id) => {
        if (id && target.loaded === false) {
            setTarget({ loaded: true, id: id });
        } else if (window.innerWidth < 900) {
            setTarget({ loaded: false, data: null });
        }
    }

    const checkout2 = (e) => {
        e.preventDefault();
        setCheckout(true);
    }

    return (
        <Container maxWidth="md">
            <Paper elevation={12}
                sx={{ background: theme.palette.common.blueGrey, color: "white", position: "relative" }}
            >
                <Typography component='h1' variant="h4"
                    sx={{ margin: "1rem auto", textAlign: "center" }}
                >
                    ExtraServices
                </Typography>
                <Grid container spacing={{ xs: 0, sm: 1, md: 2 }}>
                    {usersExtraInvoice &&
                        <Grid item xs={12} sm={12}>
                            <ListItem>subTotal Monthly:<AttachMoneyIcon sx={{ ml: 1, color: "green" }} />  {usersExtraInvoice.data.subTotalMonthly}.<sup>00</sup></ListItem>
                            <ListItem>Total Monthly:<AttachMoneyIcon sx={{ ml: 1, color: "green" }} />  {usersExtraInvoice.data.totalMonthly}.<sup>00</sup></ListItem>
                        </Grid>
                    }

                    {reducedExtraServices.loaded && reducedExtraServices.data.map(obj => (
                        <Grid item xs={12} sm={6} key={`${obj.id}-${Math.ceil(Math.random() * 1000)}`}>
                            <Card elevation={20}
                                onMouseOut={() => setTarget({ loaded: false, data: null })}
                                onMouseOver={() => handleTarget(obj.id)}
                                onClick={() => handleTarget(obj.id)}
                                sx={{ position: "relative", "&:hover": { cursor: "pointer" }, margin: "1rem auto" }}
                            >
                                < AdditionalAfterPostServiceCard obj={obj} target={target} staticImage={staticImage} />

                                <CardActions sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                    <Fab variant="extended"
                                        sx={{ background: theme.palette.common.blueGreyDark, color: "white", "&:hover": { color: "black" } }}
                                        onClick={() => handleSubmit(obj.id)}
                                    >
                                        add item <AddCircleOutlineIcon sx={{ ml: 1, color: "blue" }} />
                                    </Fab>
                                </CardActions>

                            </Card>
                        </Grid>
                    ))}

                </Grid>
                <Typography component='h1' variant="h4"
                    sx={{ margin: "1rem auto", textAlign: "center" }}
                >
                    User Selected
                </Typography>
                <Grid container spacing={{ xs: 0, sm: 1, md: 2 }}
                    sx={{ padding: "1rem", background: theme.palette.common.mediumTeal }}
                >

                    {usersExtraService.loaded && usersExtraService.data.map(obj => (

                        <Grid item xs={12} sm={6}
                            key={`${obj.id}-${Math.ceil(Math.random() * 1000)}`}
                        >
                            <Card elevation={20}
                                sx={{
                                    position: "relative", "&:hover": { cursor: "pointer" }, margin: "1rem auto",
                                    background: theme.palette.common.light
                                }}
                            >
                                < AdditionalAfterPostServiceCard obj={obj} target={target} staticImage={staticImage} />
                                <CardActions sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                    <Fab variant="extended"
                                        sx={{ background: theme.palette.common.blueGrey, color: "white", "&:hover": { color: "black" } }}
                                        onClick={() => handleSubmitDelete(obj.id)}
                                    >
                                        remove item <DeleteIcon sx={{ ml: 1, color: "red" }} />
                                    </Fab>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                {checkout && <CheckOutExtra usersExtraService={usersExtraService} usersExtraInvoice={usersExtraInvoice} staticImage={staticImage} />}
            </Paper>
            <Stack direction="column" sx={{ justifyContent: "center", alignItems: "center", margin: "1rem auto" }}>
                <Fab variant="extended" onClick={(e) => checkout2(e)}
                    sx={{ background: theme.palette.common.darkBlue, color: "white", "&:hover": { background: theme.palette.common.fadeCharcoal2, color: "red" }, width: "50%" }}>
                    checkout <ShoppingCartCheckoutIcon sx={{ ml: 1, color: "red" }} />
                </Fab>
            </Stack>
        </Container>
    )
}

export default AdditionalAfterPostService