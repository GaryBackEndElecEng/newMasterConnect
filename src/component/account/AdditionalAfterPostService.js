import React, { useContext, useEffect, useState,  } from 'react'

import { TokenAccessContext } from '../../context/TokenAccessProvider';
// import { PriceContext } from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import { Stack, Container, Paper, Typography, Grid, ListItem, Fab, Card,  CardActions, } from '@mui/material';
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
    const [target, setTarget] = useState({ loaded: false, id: null });
    const [checkout, setCheckout] = useState(false);
    const [usersExtraService, setUsersExtraService] = useState({ loaded: false, data: [] });
    const userID = localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")) : user_id;
    const getLoggedIn = localStorage.getItem("loggedIn") ? JSON.parse(localStorage.getItem("loggedIn")) : loggedIn;
    const getExtraServices = localStorage.getItem("extraServices") ? JSON.parse(localStorage.getItem("extraServices")) : (extraServices.loaded ? extraServices.data : null);


    // console.log("OUTSIDE",usersExtraService.data,)
    useEffect(() => {
        const getExtraInvoice = async () => {
            try {
                const res = await apiProtect.post('account/userAllAccounts/', { "user_id": userID });
                const body = res.data;
                setUserAccount({ loaded: true, data: body })
                if (body.extraInvoice) {
                    setUsersExtraInvoice({ loaded: true, data: body.extraInvoice });
                }
                setUsersExtraService({ loaded: true, data: body.extraService })
                // console.log("BODY",body.extraService)
            } catch (error) {
                console.error(error.message)
            }
        }
        if (userID && getLoggedIn) {
            getExtraInvoice();
        }
    }, [userID, getLoggedIn]);




    const handleSubmit = (id) => {
        const submitServerAddService = async () => {
            try {
                const res = await apiProtect.post(`/account/extraService/${id}/`, { "user_id": userID });
                const body = res.data;
                let extraServiceReduced = getExtraServices.filter(obj => (parseInt(obj.id) !== parseInt(id)));
                let getItem = getExtraServices.filter(obj => (parseInt(obj.id) === parseInt(id)))[0];
                setUserAccount({ loaded: true, data: body });
                setUsersExtraInvoice({ loaded: true, data: body.extraInvoice });
                localStorage.setItem("extraServices", JSON.stringify(extraServiceReduced));
                setUsersExtraService({ loaded: true, data: [...usersExtraService.data, getItem] });
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
                const body = res.data;
                let userExtraServiceReduced = usersExtraService.data.filter(obj => (parseInt(obj.id) !== parseInt(id)));
                let getItem = usersExtraService.data.filter(obj => (parseInt(obj.id) === parseInt(id)))[0];
                setUserAccount({ loaded: true, data: body });
                setUsersExtraInvoice({ loaded: true, data: body.extraInvoice });
                localStorage.setItem("extraServices", JSON.stringify([...getExtraServices,getItem]));
                setUsersExtraService({ loaded: true, data: userExtraServiceReduced });
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

    const checkout2=(e)=>{
        e.preventDefault();
        setCheckout(true);
    }

    return (
        <Container maxWidth="md">
            <Paper elevation={12}
                sx={{ background: theme.palette.common.blueGrey, color: "white",position:"relative" }}
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

                    {getExtraServices && getExtraServices.map(obj => (
                        <Grid item xs={12} sm={6} key={`${obj.id}-${Math.ceil(Math.random() * 1000)}`}>
                            <Card elevation={20}
                                onMouseOut={() => setTarget({ loaded: false, data: null })}
                                onMouseOver={() => handleTarget(obj.id)}
                                onClick={() => handleTarget(obj.id)}
                                sx={{ position: "relative", "&:hover": { cursor: "pointer" },margin:"1rem auto" }}
                            >
                                < AdditionalAfterPostServiceCard obj={obj} target={target} />

                                <CardActions sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                    <Fab variant="extended"
                                        sx={{ background: theme.palette.common.blueGreyDark, color: "white","&:hover":{color:"black"} }}
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
                                sx={{ position: "relative", "&:hover": { cursor: "pointer" },margin:"1rem auto",
                                    background:theme.palette.common.light
                            }}
                            >
                                < AdditionalAfterPostServiceCard obj={obj} target={target} />
                                <CardActions sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                    <Fab variant="extended"
                                        sx={{ background: theme.palette.common.blueGrey, color: "white","&:hover":{color:"black"} }}
                                        onClick={() => handleSubmitDelete(obj.id)}
                                    >
                                        remove item <DeleteIcon sx={{ ml: 1, color: "red" }} />
                                    </Fab>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                {checkout && <CheckOutExtra usersExtraService={usersExtraService} usersExtraInvoice={usersExtraInvoice}/>}
            </Paper>
            <Stack direction="column" sx={{justifyContent:"center",alignItems:"center",margin:"1rem auto"}}>
            <Fab variant="extended" onClick={(e)=>checkout2(e)}
            sx={{background:theme.palette.common.darkBlue,color:"white","&:hover":{background:theme.palette.common.fadeCharcoal2,color:"red"}, width:"50%"}}>
                checkout <ShoppingCartCheckoutIcon sx={{ml:1,color:"red"}}/>
            </Fab>
            </Stack>
        </Container>
    )
}

export default AdditionalAfterPostService