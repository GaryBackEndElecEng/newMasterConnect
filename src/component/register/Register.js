import React, { useContext, useEffect, useState, useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { useTheme } from '@mui/material/styles';
import {  Typography, Grid, Container, Paper, FormControl, InputLabel, FormHelperText, Input,  FormControlLabel, Checkbox, FormLabel, Card, CardContent, Fab, CardMedia, ButtonBase } from '@mui/material';
// import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import styles from './register.module.css';
import styled from 'styled-components';
import NavigationIcon from '@mui/icons-material/Navigation';
import apiProtect from '../axios/apiProtect';
import RegisterPage from '../RegisterPage';
import RegisterGoogle from './RegisterGoogle';
import GetRegisterPages from '../utils/GetRegisterPages';
import RegisterHelmet from './RegisterHelmet';

const RegContainer=styled(Container)`
animation: clearIn 1s ease-in-out;
@keyframes clearIn {
  from {opacity:0;}
  to {opacity:1;}
}
`;
const Register = () => {
    const theme = useTheme();
    const MyRef = useRef();
    const { register, setRegister, staticImage,setRegisterConfirmed,email, setEmail,setChangePage,setTitle,setStyleName,conical,getPathLocation } = useContext(GeneralContext);
    const {setFormComplete}=useContext(TokenAccessContext);
    const [validEmail, setValidEmail] = useState(false);
    const [validUsername, setValidUsername] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [infoOkay, setInfoOkay] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false);
    const [error,setError]=useState(false);
    const [errorMsg,setErrorMsg]=useState("");
    const navigate=useNavigate();
    const cardImg = `${staticImage}/register.png`;

    useEffect(() => {
        const email_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const username_REGEX = /(^[A-Za-z]{6,16})/;
        const password_REGEX = /(^[a-zA-Z]+\w{5,})([?!_&#$+])/;
        let emailValid = email_REGEX.test(email);
        let usernameValid = username_REGEX.test(username);
        let passwordValid = password_REGEX.test(password);
        setValidEmail(emailValid); setValidUsername(usernameValid); setValidPassword(passwordValid);
    }, [setValidUsername, setValidEmail, setValidPassword, email, username, password]);

    useEffect(() => {
        if (validEmail && validPassword && validUsername) {
            setInfoOkay(true);
            
                setRegister({
                    data: {
                        email: email,
                        username: username,
                        password: password,
                        checked: checked,
                    },
                    loaded:false
                });
            
            localStorage.setItem("formComplete",false);
            setFormComplete(false)

        }
    }, [validEmail, validUsername, validPassword, setInfoOkay, checked,email,password,username,setRegister,setFormComplete]);

    useEffect(()=>{
        setTitle("Register");
        setStyleName("We are Greatful")
        setChangePage(false);
        if(window.scrollY){
            window.scroll(0,0);
            
        }
    },[setStyleName,setTitle,setChangePage]);

    const handleChecked = (e) => {
        if (checked === false) {
            setChecked(true)
            return setChecked(true)
        }
        if (checked === true) {
            setChecked(false)
            return setChecked(false)
        }


    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const postRegister= async ()=>{
            try {
                // console.log(register.data)
                const res = await apiProtect.post(`/account/register/`,register.data)
                const data=res.data
                if(data && data.status !==302){
                    setRegister({loaded:true,data:register.data});
                    setRegisterConfirmed(true);
                    localStorage.setItem('username',data.username);
                    localStorage.setItem('email',data.email);
                    navigate("/signin",setChangePage(true));
                }else{
                    console.log(data.error)
                    setError(true);new Error(data.error);
                }
                
            } catch (error) {
                if(error.response.status===302){
                    setError(true)
                    setErrorMsg(error.response.data.error)
                }
                
            }
        }
        postRegister();
    }
    // console.log(error)
    return (
        <RegContainer maxWidth="xl" sx={{margin:"3rem auto"}} >
            <GetRegisterPages/>
            <RegisterPage/>
            <RegisterHelmet
             conical={conical.loaded ? conical.data:""}
             getPathLocation={getPathLocation.loaded ? getPathLocation.data:""}
            />
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
                        <RegisterGoogle/>
                        <CardMedia component={"img"} image={cardImg} height="100%" alt="www.master-connect.ca" />
                        <Typography component="h1" variant="h5" className={styles.contactMsg} ref={MyRef}
                            sx={{
                                fontFamily: "Roboto", justifySelf: "center", alignSelf: "center",
                                fontSize: { sm: "26px", xs: "26px" },top:{xs:"22%",sm:"32%"},left:{xs:"5%",sm:"10%"},position:"absolute",background:"rgba(0,0,0,.3)"
                            }}
                        >
                            "A start of something is symbiotic"
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
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            aria-invalid={validEmail ? "false" : "true"}
                                        />
                                        {validEmail ? <span className={validEmail ? styles.validEmail : styles.not}><CheckCircleOutlineIcon /></span>
                                            : <span className={validEmail ? styles.not : styles.notValidEmail}><CloseIcon /> </span>}
                                        <FormHelperText id="valid-email">We'll never share your email.</FormHelperText>
                                    </FormControl>
                                    <FormControl size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative" }}>
                                        <InputLabel htmlFor="username">username -- minumum of 6 characters long with no spaces</InputLabel>
                                        <Input
                                            id="username"
                                            name="username"
                                            placeholder="minumum of 6 characters long with no spaces"
                                            aria-describedby="Your username 6-char(s)-nospaces"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            aria-invalid={validUsername ? "false" : "true"}
                                        />
                                        {validUsername ? <span className={validUsername ? styles.validUsername : styles.not}><CheckCircleOutlineIcon /></span>
                                            : <span className={validUsername ? styles.not : styles.notValidName}><CloseIcon /></span>}
                                        <FormHelperText id="username">username should be more than 5 characters with a special character-no spaces</FormHelperText>

                                    </FormControl>
                                    <FormControl size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative" }}>

                                        <Input
                                            sx={{ width: "100%" }}
                                            id="password"
                                            name="password"
                                            placeholder=" minimum 6 characters long with one special character"
                                            aria-describedby="minimum 6 characters long with one special character(!,#,?,,etc)"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            aria-invalid={validPassword ? "false" : "true"}
                                        />
                                        {validPassword ? <span className={validPassword ? styles.validContent : styles.not}><CheckCircleOutlineIcon /></span>
                                            : <span className={validPassword ? styles.not : styles.notValidContent}><CloseIcon /> </span>}
                                        <FormHelperText id="password">minimum 6 characters long with one special character(#,!,?,^,,,etc).</FormHelperText>
                                    </FormControl>
                                    <FormControlLabel
                                        control={<Checkbox defaultValue={false} size="medium" />}
                                        checked={checked}
                                        name="checked"
                                        label="Can we send you promotions?"
                                        labelPlacement="bottom"
                                        value={checked}
                                        onChange={(e) => handleChecked(e)}
                                        sx={{ position: "relative", margin: "auto", color: theme.palette.common.blueGrey }}
                                    >

                                    </FormControlLabel>
                                </FormLabel>
                                <Grid container spacing={1} sx={{ justifyContent: "center" }}>
                                    {infoOkay ? <Fab color="primary" type={"submit"} variant="extended" onClick={(e) => handleSubmit(e)}>
                                        <NavigationIcon sx={{ mr: 1 }} />
                                        Register
                                    </Fab> : <div>"submit pending"</div>}
                                </Grid>
                            </form>
                            {error && 
                            <Container maxWidth="xs" sx={{margin:"2rem",cursor:"pointer"}}>
                              <Paper component="h3" elevation={10}>
                                
                                <ButtonBase component="a" href="/signin">
                                {errorMsg},Try again!!</ButtonBase>
                              </Paper>
                            </Container>
                            }
                        </CardContent>
                    </Card>
                </Paper>
            </Container>
        </RegContainer>
    )
}

export default Register