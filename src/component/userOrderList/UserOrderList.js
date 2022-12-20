import React, { useContext, useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import RegisterPage from '../RegisterPage';
import GetRegisterPages from '../utils/GetRegisterPages';
import styled from 'styled-components';
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';
import { Container, Grid, Typography, Checkbox, Paper,Stack,Fab } from '@mui/material';
import CoverPage from './CoverPage';
// import {useTheme} from '@mui/material/styles';
import api from '../axios/api';
import { Navigate } from 'react-router-dom';

const MainOrderForm = styled.div`
margin:auto;
display:flex;
justify-content:flex-start;
align-items:center;
flex-direction:column;
min-height:36vh;
`;
const UserOrderList = () => {
    const navigate=useNavigate();
    const coverImage = "https://new-master.s3.ca-central-1.amazonaws.com/static/images/orderForm.png";
    const { setTitle, setStyleName,setChangePage } = useContext(GeneralContext);
    const { user_id, usersPostInvoice, usersExtraInvoice, loggedIn } = useContext(TokenAccessContext);
    const [taskService, setTaskService] = useState({ loaded: false, data: [] });
    const [taskProduct, setTaskProduct] = useState({ loaded: false, data: [] });
    const [taskExtraService, setTaskExtraService] = useState({ loaded: false, data: [] });
    const [taskPostService, setTaskPostService] = useState({ loaded: false, data: [] });
    const [notLoaded, setNotLoaded] = useState(false);
    const getLoggedIn = localStorage.getItem("loggedIn") ? JSON.parse(localStorage.getItem("loggedIn")) : loggedIn;
    const getUser_id = localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")) : user_id;

    useEffect(() => {
        setTitle("Order List");
        setStyleName(" filling out needed stuff")
        if (window.scrollY) {
            window.scroll(0, 0);
        }
    }, [setTitle, setStyleName]);

    useEffect(() => {
        const url = (process.env.NODE_ENV === "production") ? "https://newmasterconnect.herokuapp.com/adminHome/tracker/" : "http://localhost:8000/adminHome/tracker/";
        const getCompleteTasks = async (user_id) => {
            try {
                const res = await api.get(url);
                const body = res.data;
                let matchUserId = body.filter(obj => (parseInt(obj.user) === parseInt(user_id)))[0]
                let getUsersServices = matchUserId.service.filter(obj => parseInt(obj.user_id) === parseInt(user_id))
                let getUsersPostServices = matchUserId.postService.filter(obj => parseInt(obj.user_id) === parseInt(user_id))
                let getUsersExtraServices = matchUserId.extraService.filter(obj => parseInt(obj.user_id) === parseInt(user_id))
                let getUsersProducts = matchUserId.product.filter(obj => parseInt(obj.user_id) === parseInt(user_id))
                setNotLoaded(false)
                if (getUsersProducts) {
                    setTaskProduct({ loaded: true, data: getUsersProducts });
                }
                if (getUsersServices) {
                    setTaskService({ loaded: true, data: getUsersServices });
                }
                if (getUsersPostServices && (usersPostInvoice.loaded && usersPostInvoice.data.paid)) {
                    setTaskPostService({ loaded: true, data: getUsersPostServices });
                }
                if (getUsersExtraServices && (usersExtraInvoice.loaded && usersExtraInvoice.data.paid)) {
                    setTaskExtraService({ loaded: true, data: getUsersExtraServices });
                }

            } catch (error) {
                console.error(error.message)
                setNotLoaded(true)
            }
        }
        if (getLoggedIn) {
            getCompleteTasks(getUser_id);
        }

    }, [setTaskProduct, setTaskService, setTaskPostService, setTaskExtraService, user_id, usersPostInvoice, usersExtraInvoice, getLoggedIn, getUser_id]);

    const handleReturn = (e)=>{
        e.preventDefault();
        navigate("/MyAccount",setChangePage(true))
    }

    return (
        <MainOrderForm>
            <RegisterPage />
            <GetRegisterPages />
            <CoverPage coverImage={coverImage} />
            <Container maxWidth="lg"
                sx={{ margin: "1rem auto" }}
            >
                { notLoaded && <>
                    
                    <Typography component="h1" variant="h4">Sorry your services and project tasks have not been loaded by the developer. Check back later
                    </Typography>

                    <Typography component="h1" variant="h6">If they are loaded means that the developer is working on your site
                    </Typography>
                    <Stack direction="column" sx={{alignItems:"center",justifyContent:"center",margin:"2rem"}}>
                        <Fab variant="extended" color="warning" onClick={(e)=>handleReturn(e)}>
                            return <SubdirectoryArrowLeftIcon sx={{ml:2,color:"red"}}/>
                        </Fab>
                    </Stack>
                </>}
                {!notLoaded && <Typography component="h1" variant="h3">Product(s)</Typography>}
                <Grid container spacing={{ xs: 0, sm: 1, md: 2 }} sx={{ margin: "1rem auto" }}>
                    {taskProduct.loaded && taskProduct.data.map((obj, index) => (
                        <Grid item xs={12} sm={6} md={3} key={`${obj.id}-fuch-${index}`}
                        >
                            <Paper elevation={10} sx={{ padding: "1rem" }}>
                                <Typography component="h1" variant="h5">name:</Typography>
                                <Typography component="h1" variant="h5">{obj.name}</Typography>
                                <Typography component="h1" variant="h5">complete:</Typography>
                                <Checkbox checked={obj.task} />
                            </Paper>

                        </Grid>
                    ))}
                </Grid>
                {!notLoaded && <Typography component="h1" variant="h3">Services(s)</Typography>}
                <Grid container spacing={{ xs: 0, sm: 1, md: 2 }} sx={{ margin: "1rem auto" }}>
                    {taskService.loaded && taskService.data.map((obj, index) => (
                        <Grid item xs={12} sm={6} md={3} key={`${obj.id}-fuch-${index}`}
                        >
                            <Paper elevation={10} sx={{ padding: "1rem" }}>
                                <Typography component="h1" variant="h5">name:</Typography>
                                <Typography component="h1" variant="h5">{obj.name}</Typography>
                                <Typography component="h1" variant="h5">complete:</Typography>
                                <Checkbox checked={obj.task} />
                            </Paper>

                        </Grid>
                    ))}
                </Grid>

                <Typography component="h1" variant="h3">{(usersPostInvoice.loaded && usersPostInvoice.data.paid) && "Post Services(s)"}</Typography>
                <Grid container spacing={{ xs: 0, sm: 1, md: 2 }} sx={{ margin: "1rem auto" }}>
                    {taskPostService.loaded && taskPostService.data.map((obj, index) => (
                        <Grid item xs={12} sm={6} md={3} key={`${obj.id}-fuch-${index}`}
                        >
                            <Paper elevation={10} sx={{ padding: "1rem" }}>
                                <Typography component="h1" variant="h5">name:</Typography>
                                <Typography component="h1" variant="h5">{obj.name}</Typography>
                                <Typography component="h1" variant="h5">complete:</Typography>
                                <Checkbox checked={obj.task} />
                            </Paper>

                        </Grid>
                    ))}
                </Grid>
                <Typography component="h1" variant="h3">{(usersExtraInvoice.loaded && usersExtraInvoice.data.paid) && "Extrat Services(s)"}</Typography>
                <Grid container spacing={{ xs: 0, sm: 1, md: 2 }} sx={{ margin: "1rem auto" }}>
                    {taskExtraService.loaded && taskExtraService.data.map((obj, index) => (
                        <Grid item xs={12} sm={6} md={3} key={`${obj.id}-fuch-${index}`}
                        >
                            <Paper elevation={10} sx={{ padding: "1rem" }}>
                                <Typography component="h1" variant="h5">name:</Typography>
                                <Typography component="h1" variant="h5">{obj.name}</Typography>
                                <Typography component="h1" variant="h5">complete:</Typography>
                                <Checkbox checked={obj.task} />
                            </Paper>

                        </Grid>
                    ))}
                </Grid>
            </Container>
        </MainOrderForm>

    )
}

export default UserOrderList