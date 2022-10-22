import React, { useContext, useEffect, useState,useRef } from 'react'
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import { Box, Stack, AppBar, Typography, Grid, Container, Paper, FormControl, CheckBox, InputLabel, FormHelperText, Input, TextField, TextareaAutosize, FormControlLabel, Checkbox, FormLabel, Card, CardContent, Fab, CardMedia } from '@mui/material';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import styles from './contact.module.css';
import NavigationIcon from '@mui/icons-material/Navigation';
import api from '../axios/api';

const CustTypography=styled(Typography)`
animation:${({animation})=>animation} 1.5s ease-in;

@keyframes reveal {
    from{opacity:0;transform:translateY(-150%)}
    to{opacity:1;transform:translateX(0%)}
}
`;
const CusPaper=styled(Paper)`
    position:absolute;
    top:10%;
    left:10%;
    width:80%;
    background:${({bg})=>bg};
    padding:1rem;
    animation: showResponse 10s ease-in-out;
    @keyframes showResponse {
        from {opacity:0;transform:translateY(-30%);}
        50% {opacity:1;transform:translateY(20%);}
        to {opacity:0;transform:translateY(-10%);}
    }
`;
const ImputForm = () => {
    const theme = useTheme();
    const atForRef=useRef();
    const { email, setEmail, name, setName, content, setContent, requestInfo, setRequestInfo,url,infoOkay,setInfoOkay,setIsRequestInfo,isRequestInfo,staticImage } = useContext(GeneralContext);
    const [validEmail, setValidEmail] = useState(false);
    const [validName, setValidName] = useState(false);
    const [validContent, setValidContent] = useState("");
    const [checked, setChecked] = useState(false);
    const [atForm,setAtForm]=useState(false);
    const cardImg=`${staticImage}/homeBg1.png`
    const reveal=atForm ? "reveal":"";
    //////------------- requestInfo IS TO BE SENT TO THE SERVER THROUGH Axios-----//////////////////////////////
    //////------------- requestInfo IS TO BE SENT VIA EMAIL,@ SERVER LEVEL-----//////////////////////////////
    useEffect(() => {
        // VALIDATION EMAIL
        const email_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const fullName_REGEX = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
        const content_REGEX = /([a-zA-Z]+\w{3,})/;
        let emailValid = email_REGEX.test(email);
        let fullnameValid = fullName_REGEX.test(name);
        let contentValid = content_REGEX.test(content);
        setValidName(fullnameValid);
        setValidEmail(emailValid);
        setValidContent(contentValid);
        if (validName && validEmail && validContent) {
            setRequestInfo({ email: email, fullName: name, content: content, promotion: checked })
            setInfoOkay(true)
            localStorage.setItem("requestInfo",JSON.stringify(requestInfo))
        }else{setInfoOkay(false)}

    }, [setValidEmail, email, setValidName, validName, name, setValidContent, content, setRequestInfo, checked, validContent, validEmail,requestInfo,setInfoOkay]);
    useEffect(()=>{
        const triggerAtForm =()=>{
            const observer= new IntersectionObserver((entries)=>{
                entries.forEach((entry)=>{
                    let child=entry.target
                    if(entry.isIntersecting && child){
                       return  setAtForm(true);
                    }else{
                        
                    }
                });

            },{threshold:1})
            observer.observe(atForRef.current)
        }
        triggerAtForm();
    },[setAtForm,atForm])

    const handleChecked = (e) => {
        if (checked === true) return setChecked(false)
        return setChecked(true)
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        //call api to send to server
        if( setInfoOkay){
        const objToSend = requestInfo
        const sendRequest= async ()=>{
            try {
                const res= await api.post('postRequest/',objToSend)
                const body= await res.data;
                setEmail("");
                setName("");
                setContent("");
                setChecked(false);
                
                if(body){
                    localStorage.setItem("postRequest",body);
                    setTimeout(()=>{
                        setIsRequestInfo(true);
                    },0);
                    setTimeout(()=>{
                        setIsRequestInfo(false);
                    },10000)
                }
            } catch (error) {
                
            }
        
        }
        sendRequest();
        }
    }

    return (
        <Container maxWidth={"md"}
            sx={{
                marginTop: "2rem", 
                zIndex:"2000",
            }}
        >
            <Paper elevation={8}
                sx={{
                    
                }}
            >
                <Card sx={{position:"relative"}}>
                    <CardMedia component={"img"} image={cardImg} height="300" alt="www.master-connect.ca"/>

                    {isRequestInfo && 
                    <CusPaper CusPaper elevation={10} bg={theme.palette.common.mediumTeal}>
                        <Box sx={{margin:"1rem auto",background:theme.palette.common.mediumTeal,padding:"1rem"}}>
                            <Typography component="h1" variant="h4" sx={{fontFamily:"Roboto"}}>
                                Your request has been recieved. We will responds as soon as possible!
                            </Typography>
                            <Typography component="h1" variant="h3" sx={{fontFamily:"Roboto"}}>
                                Thank you for the request
                            </Typography>
                        </Box>
                    </CusPaper>
                    }

                    <CustTypography animation={reveal} component="h1" variant="h5" className={styles.contactMsg} ref={atForRef}
                        sx={{
                            fontFamily: "Roboto", justifySelf: "center", alignSelf: "center",
                            fontSize: {sm:"26px",xs:"26px"}
                        }}
                    >
                        "Great Communication, Will Always help You Find Your Way"
                    </CustTypography>
                    <CardContent>
                        <form style={{ margin: "auto", width: "100%", flexGrow: 1, background: theme.palette.common.light }}>
                            <FormLabel component="div" color="primary"
                                sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "column", padding: "1rem", width: "100%" }}
                            >
                                <FormControl size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative" }}>
                                    <InputLabel htmlFor="email">Email Address</InputLabel>
                                    <Input
                                        id="email"
                                        aria-describedby="valid email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        aria-invalid={validEmail ? "false" : "true"}
                                    />
                                    {validEmail ? <span className={validEmail ? styles.validEmail : styles.not}><CheckCircleOutlineIcon /></span>
                                        : <span className={validEmail ? styles.not : styles.notValidEmail}><CloseIcon /> </span>}
                                    {/* <FormHelperText id="valid-email">We'll never share your email.</FormHelperText> */}
                                </FormControl>
                                <FormControl size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative" }}>
                                    <InputLabel htmlFor="name">Full Name</InputLabel>
                                    <Input
                                        id="name"
                                        aria-describedby="Your full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        aria-invalid={validName ? "false" : "true"}
                                    />
                                    {validName ? <span className={validName ? styles.validName : styles.not}><CheckCircleOutlineIcon /></span>
                                        : <span className={validName ? styles.not : styles.notValidName}><CloseIcon /></span>}
                                    {/* <FormHelperText id="your-full-name">full name</FormHelperText> */}

                                </FormControl>
                                <FormControl size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative" }}>

                                    <TextareaAutosize
                                        sx={{ width: "100%" }}
                                        minRows={3}
                                        id="content"
                                        placeholder="How can we help?"
                                        aria-describedby="how can we help"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        aria-invalid={validContent ? "false" : "true"}
                                    />
                                    {validContent ? <span className={validContent ? styles.validContent : styles.not}><CheckCircleOutlineIcon /></span>
                                        : <span className={validContent ? styles.not : styles.notValidContent}><CloseIcon /> </span>}
                                    {/* <FormHelperText id="how-can-we-help">How can we help.</FormHelperText> */}
                                </FormControl>
                                <FormControlLabel
                                    control={<Checkbox defaultValue={false} size="medium" />}
                                    checked={checked}
                                    label="Can we send you promotions?"
                                    labelPlacement="bottom"
                                    value={checked}
                                    onChange={(e) => handleChecked(e)}
                                    sx={{ position: "relative", margin: "auto", color: theme.palette.common.blueGrey }}
                                >

                                </FormControlLabel>
                            </FormLabel>
                            <Grid container spacing={1} sx={{ justifyContent: "center" }}>
                                { infoOkay ?<Fab color="primary" type={"submit"} variant="extended" onClick={(e)=>handleSubmit(e)}>
                                    <NavigationIcon sx={{ mr: 1 }} />
                                    send request
                                </Fab>: <div>"submit pending"</div>}
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Paper>
        </Container>
    )
}

export default ImputForm