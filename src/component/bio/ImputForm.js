import React, { useContext, useEffect, useState,useRef } from 'react'
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import {Typography, Grid, Container, Paper, FormControl,InputLabel, Input, TextareaAutosize, FormControlLabel, Checkbox, FormLabel, Card, CardContent, Fab, CardMedia } from '@mui/material';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import styles from './bio.module.css';
import NavigationIcon from '@mui/icons-material/Navigation';
import api from '../axios/api';

const CustTypography=styled(Typography)`
animation:reveal 1.5s ease-in;
transform:translateX(100px);
@keyframes reveal {
    from{opacity:0;transform:translateY(-150%)}
    to{opacity:1;transform:translateX(100px)}
}
@media screen and (max-width:600px){
    transform:translateX(2px)
}
`;

const ImputForm = () => {
    const theme = useTheme();
    const atForRef=useRef();
    const { email, setEmail, name, setName, content, setContent, requestInfo, setRequestInfo,url,infoOkay,setInfoOkay,setIsRequestInfo,setOpen,open } = useContext(GeneralContext);
    const [validEmail, setValidEmail] = useState(false);
    const [validName, setValidName] = useState(false);
    const [validContent, setValidContent] = useState("");
    const [checked, setChecked] = useState(false);
    const cardImg=`https://master-connect.s3.ca-central-1.amazonaws.com/static/profilePic1.png`
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
        

    }, [setValidEmail, email, name, content, setRequestInfo, checked,  requestInfo,setInfoOkay]);

   useEffect(()=>{
    if (validName && validEmail && validContent) {
        setRequestInfo({ email: email, fullName: name, content: content, promotion: checked })
        setInfoOkay(true)
        localStorage.setItem("requestInfo",JSON.stringify(requestInfo))
    }else{setInfoOkay(false)}
   },[])

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
                setOpen(false);
                
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
                    { open &&
                    <CustTypography component="h1" variant="h5" className={styles.contactMsg} ref={atForRef}
                        sx={{
                            fontFamily: "Roboto", justifySelf: "center", alignSelf: "center",
                            fontSize: {sm:"26px",xs:"26px"}
                        }}
                    >
                        "Great Communication Will Always Find Your Way"
                    </CustTypography>
                    }
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