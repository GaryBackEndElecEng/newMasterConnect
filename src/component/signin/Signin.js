import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { useTheme } from '@mui/material/styles';
import { Typography, Grid, Container, Paper, FormControl, InputLabel, FormHelperText, Input, FormLabel, Card, CardContent, Fab, CardMedia, ButtonBase } from '@mui/material';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import styles from './signin.module.css';
import NavigationIcon from '@mui/icons-material/Navigation';
import apiProtect from '../axios/apiProtect';
import RegisterPage from '../RegisterPage';
import SigninGoogle from './SigninGoogle';
import GetRegisterPages from '../utils/GetRegisterPages';
import SigninHelmet from './SigninHelmet';

const SignInContainer = styled(Container)`
animation: clearIn 1s ease-in-out;
min-height:70vh;
@keyframes clearIn {
  from {opacity:0;}
  to {opacity:1;}
}
`;
const Signin = () => {
    const theme = useTheme();
    const MyRef = useRef();
    const { staticImage, email, setEmail, setChangePage, setTitle, setStyleName, setActivate, register, setRegister, getPathLocation } = useContext(GeneralContext);
    const { setLoggedIn, setSignin, setTokenIsValid, loginError, setLoginError, setSignout, setGoToSignin, setViewAccount,loggedIn } = useContext(TokenAccessContext)
    const [validEmail, setValidEmail] = useState(false);
    const [validUsername, setValidUsername] = useState(false);
    const [infoOkay, setInfoOkay] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const cardImg = `${staticImage}/GreatMountain.png`;
    const clientUsername = localStorage.getItem("username") ? localStorage.getItem("username") : "";
    const clientEmail = localStorage.getItem("email") ? localStorage.getItem("email") : "";
    const tokenIsValid = localStorage.getItem("tokenIsValid") ? JSON.parse(localStorage.getItem("tokenIsValid")) : false;
    const [getCustom, setGetCustom] = useState({ loaded: false, data: {} });

    useEffect(() => {
        //SELECTED CUSTOM TEMPLATE
        let testCustom = localStorage.getItem("custTemplate") ? JSON.parse(localStorage.getItem("custTemplate")) : null;
        if (testCustom) {
            setGetCustom({ loaded: true, data: { id: testCustom.id, pathname: testCustom.path } });
        }
    }, [setGetCustom]);


    useEffect(() => {
        setChangePage(false);
        if (!tokenIsValid || !loggedIn) {
            localStorage.removeItem('username');
            localStorage.removeItem('email');
            localStorage.removeItem('user_id');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('csrftoken');
            localStorage.removeItem('page');
            localStorage.removeItem("tokenIsValid");
            localStorage.removeItem("loggedIn");
            localStorage.removeItem("goToSignin");
            localStorage.removeItem("userAccount");
            localStorage.removeItem("reducedProduct");
            localStorage.removeItem("usersProduct");
            localStorage.removeItem("extraSession_id");
            setSignout(false);
            setActivate(false);
            setLoggedIn(false);
            setGoToSignin(true);
        }
        if (window.scrollY) {
            window.scroll(0, 0);

        }
    }, [tokenIsValid, setLoggedIn, setGoToSignin, setActivate, setSignout, setChangePage]);

    useEffect(() => {
        const postSignin = async () => {
            const getUUID = localStorage.getItem("UUID") ? JSON.parse(localStorage.getItem("UUID")) : null;
            const getpackageId = localStorage.getItem("buypackage") ? JSON.parse(localStorage.getItem("buypackage")) : null;
            let params={};
            try {
                if (getCustom.loaded) {
                    params = {
                        username: register.data.username,
                        email: register.data.email,
                        password: register.data.password,
                        UUID: getUUID,
                        customId: getCustom.data.id,
                        packageId:getpackageId
                    }
                } else {
                    params = {
                        username: register.data.username,
                        email: register.data.email,
                        password: register.data.password,
                        UUID: getUUID,
                        customId:null,
                        packageId:getpackageId
                    }
                }
                const res = await apiProtect.post(`/account/login/`, params)
                const data = res.data
                if (data && data.status !== 503) {
                    setSignin(true);
                    setLoggedIn(true);
                    setTokenIsValid(true);
                    localStorage.setItem('username', JSON.stringify(data.username));
                    localStorage.setItem('email', JSON.stringify(data.email));
                    localStorage.setItem('user_id', JSON.stringify(data.user_id));
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('refresh_token', data.refresh_token);
                    localStorage.setItem('tokenIsValid', true);
                    localStorage.setItem("loggedIn", true);
                    localStorage.setItem("goToSignin", false)
                    setViewAccount(true);
                    setTimeout(() => { setSignin(false) },0);
                    navigate("/", setChangePage(true));
                    setRegister({ loaded: false, data: { 'username': data.username, "email": data.email, "password": "" } });
                    localStorage.removeItem("buypackage");
                } else {
                    setError(true);
                    new Error(data.error)
                }

            } catch (error) {
                setLoginError(true);
                console.error(error.message)

            }
        }
        if (register.loaded && register.data) {
            postSignin();
        }
    }, [register.loaded, navigate, register.data, setChangePage, setLoginError, setRegister, setLoggedIn, setSignin, setTokenIsValid, setViewAccount,getCustom.loaded,getCustom.data.id]);

    useEffect(() => {
        const email_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const username_REGEX = /(^[A-Za-z]{6,16})/;
        let emailValid = email_REGEX.test(email);
        let usernameValid = username_REGEX.test(username);
        setValidEmail(emailValid); setValidUsername(usernameValid);
    }, [setValidUsername, setValidEmail, email, username,]);

    useEffect(() => {
        if (validEmail && validUsername) {
            setInfoOkay(true)


        }
    }, [validEmail, validUsername, setInfoOkay]);

    useEffect(() => {
        setTitle("Signin");
        setStyleName("Welcome Back")
    }, [setStyleName, setTitle]);


    const handleSubmit = (e) => {
        e.preventDefault();

        const postSignin = async () => {
            const getpackageId = localStorage.getItem("buypackage") ? JSON.parse(localStorage.getItem("buypackage")) : null;
            let params={};
            try {
                if (getCustom.loaded) {
                params = {
                    username: username,
                    email: email,
                    password: password,
                    UUID: "",
                    customId:getCustom.data.id,
                    packageId:getpackageId
                    }
                }else{
                    params = {
                        username: username,
                        email: email,
                        password: password,
                        UUID: "",
                        customId:null,
                        packageId:getpackageId
                        }
                }
                const res = await apiProtect.post(`/account/login/`, params)
                const data = res.data
                if (data && data.status !== 503) {
                    setSignin(true);
                    setLoggedIn(true);
                    setTokenIsValid(true);
                    localStorage.setItem('username', JSON.stringify(data.username));
                    localStorage.setItem('email', JSON.stringify(data.email));
                    localStorage.setItem('user_id', JSON.stringify(data.user_id));
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('refresh_token', data.refresh_token);
                    localStorage.setItem('tokenIsValid', true);
                    localStorage.setItem("loggedIn", true);
                    localStorage.setItem("goToSignin", false)
                    setRegister({ loaded: false, data: { 'username': data.username, "email": data.email, "password": "" } });
                    setViewAccount(true);
                    setTimeout(() => { setSignin(false) }, 6000);
                    navigate("/", setChangePage(true));
                } else {
                    setError(true);
                    new Error(data.error)
                }

            } catch (error) {
                setLoginError(true);
                console.error(error.message)

            }
        }
        if (e) { postSignin(); }

    }
    return (
        <SignInContainer maxWidth="xl" sx={{ margin: "3rem auto" }} >
            <SigninHelmet
                getPathLocation={getPathLocation.loaded ? getPathLocation.data : ""}
            />
            <GetRegisterPages />
            <RegisterPage />
            <Container maxWidth={"sm"}
                sx={{
                    marginTop: "3rem",
                }}
            >
                <Paper elevation={8}
                    sx={{

                    }}
                >
                    <Card sx={{ position: "relative" }}>
                        <SigninGoogle />
                        <CardMedia component={"img"} image={cardImg} height="100%" alt="www.master-connect.ca" />
                        <Typography component="h1" variant="h5" className={styles.contactMsg} ref={MyRef}
                            sx={{
                                fontFamily: "Roboto", justifySelf: "center", alignSelf: "center",
                                fontSize: { sm: "26px", xs: "26px" }, top: { xs: "22%", sm: "22%" }, left: { xs: "5%", sm: "10%" }, position: "absolute"
                            }}
                        >
                            "Sign in and view your Account"
                        </Typography>
                        <CardContent>
                            <form style={{ margin: "auto", width: "100%", flexGrow: 1, background: theme.palette.common.lighter }}>
                                <FormLabel component="div" color="primary"
                                    sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "column", padding: "1rem", width: "100%" }}
                                >
                                    <FormControl size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative" }}>
                                        <InputLabel htmlFor="email">Email Address</InputLabel>
                                        <Input
                                            id="email"
                                            name="email"
                                            aria-describedby="valid email"
                                            value={email ? email : clientEmail}
                                            onChange={(e) => setEmail(e.target.value)}
                                            aria-invalid={validEmail ? "false" : "true"}
                                        />
                                        {validEmail ? <span className={validEmail ? styles.validEmail : styles.not}><CheckCircleOutlineIcon /></span>
                                            : <span className={validEmail ? styles.not : styles.notValidEmail}><CloseIcon /> </span>}
                                        <FormHelperText id="valid-email">We'll never share your email.</FormHelperText>
                                    </FormControl>
                                    <FormControl size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative" }}>
                                        <InputLabel htmlFor="username">username</InputLabel>
                                        <Input
                                            id="username"
                                            name="username"
                                            aria-describedby="Your full name"
                                            value={username ? username : clientUsername}
                                            onChange={(e) => setUsername(e.target.value)}
                                            aria-invalid={validUsername ? "false" : "true"}
                                        />
                                        {validUsername ? <span className={validUsername ? styles.validUsername : styles.not}><CheckCircleOutlineIcon /></span>
                                            : <span className={validUsername ? styles.not : styles.notValidName}><CloseIcon /></span>}
                                        <FormHelperText id="username">your username is more than 5 characters long</FormHelperText>

                                    </FormControl>
                                    <FormControl size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative" }}>

                                        <Input
                                            sx={{ width: "100%" }}
                                            id="password"
                                            name="password"
                                            placeholder=" password"
                                            aria-describedby="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />

                                        <FormHelperText id="password">enter your password.</FormHelperText>
                                    </FormControl>

                                </FormLabel>
                                <Grid container spacing={1} sx={{ justifyContent: "center" }}>
                                    {infoOkay ? <Fab color="primary" type={"submit"} variant="extended" onClick={(e) => handleSubmit(e)}>
                                        <NavigationIcon sx={{ mr: 1 }} />
                                        Signin
                                    </Fab> : <div>"submit pending"</div>}
                                </Grid>
                            </form>
                            {error &&
                                <Container maxWidth="xs" sx={{ margin: "2rem", cursor: "pointer" }}>
                                    <Paper component="h3" elevation={10}>

                                        <ButtonBase component="a" href="/register">
                                            Sorry could not find your account.
                                            click here</ButtonBase>
                                    </Paper>
                                </Container>
                            }
                            {loginError &&
                                <Container maxWidth="xs" sx={{ margin: "2rem", cursor: "pointer" }}>
                                    <Paper component="h3" elevation={10}>

                                        <ButtonBase onClick={() => window.location.reload()}>
                                            Sorry you have to refresh to page -server thinks you are someone else-Click here!</ButtonBase>
                                    </Paper>
                                </Container>
                            }
                        </CardContent>
                    </Card>
                </Paper>
            </Container>
        </SignInContainer>
    )
}

export default Signin