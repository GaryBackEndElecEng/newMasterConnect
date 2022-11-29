import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import { Container, Stack, Card, Grid, Typography, Button, Fab, Paper } from '@mui/material'
import apiProtect from '../axios/apiProtect';
import apiProtectAdminHome from '../axios/apiProtectAdminHome';
import CoverPageDeduct from './CoverPageDeduct';
import styles from './deduction.module.css';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import DeleteIcon from '@mui/icons-material/Delete';
import DeductHelmet from './DeductHelmet';

const MainDeduction = styled.div`
width:100vw;
display:flex;
justify-content:flex-start;
align-items:center;
flex-direction:column;
animation: comeIn 1.5s ease-in-out;
@keyframes comeIn {
    from {opacity:0;}
    to {opacity:1;}
}
`;
const DeductionPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { usersProduct, setUsersProduct, setUsersService, usersService, setUsersPostService, usersPostService,usersExtraService,setUsersExtraService, user_id, loggedIn,setUserAccount,credited, setCredited } = useContext(TokenAccessContext);
    const { setTitle, setStyleName, setChangePage } = useContext(GeneralContext);
    const [servTrackerTaskFalse, setServTrackerTaskFalse] = useState({ loaded: false, data: {} });
    const [prodTrackerTaskFalse, setProdTrackerTaskFalse] = useState({ loaded: false, data: {} });
    const [postServTrackerTaskFalse, setPostServTrackerTaskFalse] = useState({ loaded: false, data: {} });
    const [extraServTrackerTaskFalse, setExtraServTrackerTaskFalse] = useState({ loaded: false, data: {} });
    const [servProdCredit, setServProdCredit] = useState({ loaded: false, data: {} });
    const [message, setMessage] = useState(null);
    const [message1, setMessage1] = useState(null);
    const [message2, setMessage2] = useState(null);
    const [message3, setMessage3] = useState(null);

    useEffect(()=>{
        const sendCredit = async()=>{
            try {
                const res = await apiProtect.post('account/PostDeductService/',servProdCredit.data);
                const body=res.data;
                setCredited({loaded:true,data:body});
                setServProdCredit({loaded:false,data:{}});
            } catch (error) {
                console.error(error.message)
            }
        }
        if(servProdCredit.loaded){ 
            sendCredit();
        }
    },[servProdCredit.loaded,servProdCredit.data,setCredited]);

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage(null);
            }, 16000);
        }
        if (message1) {
            setTimeout(() => {
                setMessage1(null);
            }, 16000);
        }
        if (message2) {
            setTimeout(() => {
                setMessage2(null);
            }, 16000);
        }
        if (message3) {
            setTimeout(() => {
                setMessage3(null);
            }, 16000);
        }
    }, [setMessage, message,setMessage1, message1,setMessage2, message2,setMessage3, message3]);

    useEffect(() => {
        setTitle("Deduction Page");
        setStyleName("to remove items");
        if (window.scroll) {
            window.scroll(0, 0);
        }
    }, [setTitle, setStyleName]);

    useEffect(() => {
        const getCompetedTasks = async () => {
            const params = { "user_id": user_id }
            try {
                const res = await apiProtectAdminHome.post('/trackerAccount/', params);
                const body = res.data;
                let service=body.service.filter(obj => (JSON.parse(obj.task) === false))
                if (service.length > 0) {
                    setServTrackerTaskFalse({ loaded: true, data:service});
                }
                let product=body.product.filter(obj => (JSON.parse(obj.task) === false))
                if (product.length > 0) {
                    setProdTrackerTaskFalse({ loaded: true, data:product });
                }
                let postService=body.postService.filter(obj => (JSON.parse(obj.task) === false))
                if (postService.length > 0) {
                    setPostServTrackerTaskFalse({ loaded: true, data:postService });
                }
                let extraService= body.extraService.filter(obj => (JSON.parse(obj.task) === false))
                if (extraService.length > 0) {
                    setExtraServTrackerTaskFalse({ loaded: true, data:extraService });
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        if (user_id && loggedIn) {
            getCompetedTasks();
        }
    }, [setServTrackerTaskFalse, loggedIn, user_id, setProdTrackerTaskFalse, setPostServTrackerTaskFalse, setExtraServTrackerTaskFalse]);

    const handleRemoveService = (e, id, taskId, name) => {
        e.preventDefault();
        const removeFromService = async () => {
            const params = { "user_id": user_id, serv_id: id }
            try {
                const res = await apiProtect.post('/account/userServicePostDelete/', params);
                const body = res.data;
                console.log(body)
                if (body) {
                    setUsersService({ loaded: true, data: usersService.data.filter(obj => (parseInt(obj.id) !== id)) });
                    setServTrackerTaskFalse({ loaded: true, data: servTrackerTaskFalse.data.filter(obj => (parseInt(obj.id) !== taskId)) });
                    setMessage(`your service ${name} was deleted. please note that, by refreshing the page will make it reappear until the developer opens his admin page. This is to confirm that it's deleted from your list and you have been credited.`);
                    setServProdCredit({loaded:true,data:{user_id:user_id,servProd_id:id}});
                }
            } catch (error) {
                console.error(error.message)
            }
        }
        if (usersService.loaded && servTrackerTaskFalse.loaded && user_id !== 0) {
            removeFromService();
        }
    }
    const handleRemovePostService = (e, postServ_id, taskId, name) => {
        e.preventDefault();
        const removeFromPostService = async () => {
            const params = { user_id: user_id, serv_id: postServ_id }
            try {
                const res = await apiProtect.post('/account/subPostService/', params);
                const body = res.data;
                if (body) {
                    setUsersPostService({ loaded: true, data: usersPostService.data.filter(obj => (parseInt(obj.id) !== postServ_id)) });
                    setPostServTrackerTaskFalse({ loaded: true, data: postServTrackerTaskFalse.data.filter(obj => (parseInt(obj.id) !== taskId)) });
                    setMessage1(`your Post service ${name} was deleted. please note that, by refreshing the page will make it reappear until the developer opens his admin page. This is to confirm that it's deleted from your list and you have been credited.`);
                    setServProdCredit({loaded:true,data:{user_id:user_id,servProd_id:postServ_id}});
                }
            } catch (error) {
                console.error(error.message)
            }
        }
        if (usersPostService.loaded && postServTrackerTaskFalse.loaded && user_id !== 0) {
            removeFromPostService();
        }


    }
    const handleRemoveExtraServices = (e, extraServ_id, taskId, name)=>{
        const submitServerAddService = async () => {
            try {
                const res = await apiProtect.post(`/account/extraService/delete/${extraServ_id}/`, { "user_id": user_id });
                const body = res.data;
                let userExtraServiceReduced = usersExtraService.data.filter(obj => (parseInt(obj.id) !== parseInt(extraServ_id)));
                setExtraServTrackerTaskFalse({ loaded: true, data: extraServTrackerTaskFalse.data.filter(obj => (parseInt(obj.id) !== taskId)) });
                setUserAccount({ loaded: true, data: body });
                setUsersExtraService({ loaded: true, data: userExtraServiceReduced });
                setMessage2(`your Post service ${name} was deleted. please note that, by refreshing the page will make it reappear until the developer opens his admin page. This is to confirm that it's deleted from your list and you have been credited.`);
                setServProdCredit({loaded:true,data:{user_id:user_id,servProd_id:extraServ_id}});
            } catch (error) {
                console.error(error.message)
            }
        }
        if (usersExtraService.loaded && extraServTrackerTaskFalse.loaded && user_id !== 0) {
        submitServerAddService();
        }
    }
    const handleRemoveProduct= (e,prod_id,taskId,name)=>{
        e.preventDefault();
        const deleteProduct= async()=>{
            const params = { "user_id": user_id, "prod_id": prod_id }
            try {
                const res = await apiProtect.post("/account/userProductPostDelete/", params);
                const body=res.data
                if(body){
                    setUsersProduct({loaded:true,data:usersProduct.data.filter(obj=>(parseInt(obj.id) !== parseInt(prod_id)))});
                    setProdTrackerTaskFalse({loaded:true,data:prodTrackerTaskFalse.data.filter(obj=>(parseInt(obj.id) !== parseInt(taskId)))});
                    setMessage3(`your Post service ${name} was deleted. please note that, by refreshing the page will make it reappear until the developer opens his admin page. This is to confirm that it's deleted from your list and you have been credited.`);
                    setServProdCredit({loaded:true,data:{user_id:user_id,servProd_id:prod_id}});
                }
            } catch (error) {
                console.error(error.message)
            }
        }
        if (usersProduct.loaded && prodTrackerTaskFalse.loaded && user_id !== 0) {
            deleteProduct();
        }
    }
    const handleReturn = (e) => {
        e.preventDefault();
        navigate("/MyAccount", setChangePage(true))
    }

    return (
        <MainDeduction>
            <DeductHelmet/>
            <CoverPageDeduct credited={credited.loaded ? credited.data:null} />
            <Container maxWidth="lg"
                sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column", margin: "2rem auto" }}
            >
                {prodTrackerTaskFalse.loaded && <Paper elevation={3} sx={{ margin: "1rem auto" }}>
                    <Typography component="h1" variant="h3" sx={{ padding: "1rem" }}>Products</Typography>
                </Paper>}
                <Grid container spacing={{ xs: 0, sm: 1 }} sx={{ position: "relative" }}>
                    {(prodTrackerTaskFalse.loaded && prodTrackerTaskFalse.data) && prodTrackerTaskFalse.data.map((obj, index) => (
                        <Grid item xs={12} sm={6} md={4} key={`${index}-task-${obj.id}`}>
                            <Card elevation={3}>
                                <Typography component="h1" variant="h4">{obj.name}</Typography>
                                <Fab onClick={(e) => handleRemoveProduct(e, obj.Id, obj.id, obj.name)}  variant="extended" size="small"
                                sx={{margin:"1rem auto"}}
                                >
                                    remove <DeleteIcon sx={{ml:1,color:"red"}}/>
                                </Fab>
                            </Card>
                        </Grid>
                    ))}
                    {message3 && <Stack direction="column" sx={{ position: "absolute", top: "0%", left: "auto", background: theme.palette.home.blueGrey, color: "white" }}
                        className={styles.message}
                    >
                        <Typography component="h1" variant="h5">{message3}</Typography>
                    </Stack>}
                </Grid>
                {servTrackerTaskFalse.loaded && <Paper elevation={3} sx={{ margin: "1rem auto" }}>
                    <Typography component="h1" variant="h3" sx={{ padding: "1rem" }}>Services</Typography>
                </Paper>}
                <Grid container spacing={{ xs: 0, sm: 1 }} sx={{ position: "relative" }}>
                    {(servTrackerTaskFalse.loaded && servTrackerTaskFalse.data) && servTrackerTaskFalse.data.map((obj, index) => (
                        <Grid item xs={12} sm={6} md={4} key={`${index}-task-${obj.id}`}>
                            <Card elevation={3}>
                                <Typography component="h1" variant="h4">{obj.name}</Typography>
                                <Fab onClick={(e) => handleRemoveService(e, obj.Id, obj.id, obj.name)} variant="extended" size="small"
                                sx={{margin:"1rem auto"}}
                                >
                                    remove <DeleteIcon sx={{ml:1,color:"red"}}/>
                                </Fab>
                            </Card>
                        </Grid>
                    ))}
                    {message && <Stack direction="column" sx={{ position: "absolute", top: "0%", left: "auto", background: theme.palette.home.blueGrey, color: "white" }}
                        className={styles.message}
                    >
                        <Typography component="h1" variant="h5">{message}</Typography>
                    </Stack>}
                </Grid>

                {postServTrackerTaskFalse.loaded && <Paper elevation={3} sx={{ margin: "1rem auto" }}>
                    <Typography component="h1" variant="h3" sx={{ padding: "1rem" }}>Post Services</Typography>
                </Paper>}
                <Grid container spacing={{ xs: 0, sm: 1 }} sx={{ position: "relative" }}>
                    <Grid container spacing={{ xs: 0, sm: 1 }} sx={{ position: "relative" }}>
                        {(postServTrackerTaskFalse.loaded && postServTrackerTaskFalse.data) && postServTrackerTaskFalse.data.map((obj, index) => (
                            <Grid item xs={12} sm={6} md={4} key={`${index}-task-${obj.id}`}>
                                <Card elevation={3}>
                                    <Typography component="h1" variant="h4">{obj.name}</Typography>
                                    <Fab onClick={(e) => handleRemovePostService(e, obj.Id, obj.id, obj.name)}  variant="extended" size="small"
                                    sx={{margin:"1rem auto"}}
                                    >
                                        remove <DeleteIcon sx={{ml:1,color:"red"}}/>
                                    </Fab>
                                </Card>
                            </Grid>
                        ))}
                        {message1 && <Stack direction="column" sx={{ position: "absolute", top: "0%", left: "auto", background: theme.palette.home.blueGrey, color: "white" }}
                            className={styles.message}
                        >
                            <Typography component="h1" variant="h5">{message1}</Typography>
                        </Stack>}
                    </Grid>
                </Grid>
                {extraServTrackerTaskFalse.loaded && <Paper elevation={3} sx={{ margin: "1rem auto" }}>
                    <Typography component="h1" variant="h3" sx={{ padding: "1rem" }}>Extra Services</Typography>
                </Paper>}
                <Grid container spacing={{ xs: 0, sm: 1 }} sx={{ position: "relative" }}>
                    <Grid container spacing={{ xs: 0, sm: 1 }} sx={{ position: "relative" }}>
                        {(extraServTrackerTaskFalse.loaded && extraServTrackerTaskFalse.data) && extraServTrackerTaskFalse.data.map((obj, index) => (
                            <Grid item xs={12} sm={6} md={4} key={`${index}-task-${obj.id}`}>
                                <Card elevation={3}>
                                    <Typography component="h1" variant="h4">{obj.name}</Typography>
                                    <Fab onClick={(e) => handleRemoveExtraServices(e, obj.Id, obj.id, obj.name)}  variant="extended" size="small" 
                                    sx={{margin:"1rem auto"}}
                                    >
                                        remove <DeleteIcon sx={{ml:1,color:"red"}}/>
                                    </Fab>
                                </Card>
                            </Grid>
                        ))}
                        {message2 && <Stack direction="column" sx={{ position: "absolute", top: "0%", left: "auto", background: theme.palette.home.blueGrey, color: "white" }}
                            className={styles.message}
                        >
                            <Typography component="h1" variant="h5">{message2}</Typography>
                        </Stack>}
                    </Grid>
                </Grid>
                <Stack direction="column" spacing={2} sx={{ justifyContent: "center", alignItems: "center", margin: "2rem auto" }}>
                    <Fab variant="extended" color="primary" size="large" onClick={(e) => handleReturn(e)}>
                        return <KeyboardReturnIcon sx={{ ml: 1, color: "red" }} />
                    </Fab>
                </Stack>
            </Container>
        </MainDeduction>
    )
}

export default DeductionPage