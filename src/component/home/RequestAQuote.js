import React, { useContext, useEffect, useState } from 'react'
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import { Stack, Container, Card, FormControl, InputLabel, FormHelperText, Input, TextareaAutosize, FormControlLabel, Checkbox, FormLabel, Button, CardContent, Fab, Grid, CardMedia, Typography } from '@mui/material';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import styles from '../contact/contact.module.css';
import styles2 from './home.module.css';
import NavigationIcon from '@mui/icons-material/Navigation';
import api from '../axios/api'

const RequestAQuote = () => {
    const theme = useTheme();
    const { email, setEmail, name, setName, content, setContent, setRequestQuote, staticImage, requestQuote, infoOkay, setInfoOkay, issue, setIssue,serverUrl,setCallBackQuoteRequest,setCallBackConfirmed } = useContext(GeneralContext);
    const [cell, setCell] = useState("");
    const [coName, setCoName] = useState("");
    const [coSite, setCoSite] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [validCell, setValidCell] = useState("");
    const [validSite, setValidSite] = useState(false);
    const [validName, setValidName] = useState(false);
    const [validContent, setValidContent] = useState("");
    const [checked, setChecked] = useState(false);
    const manOnMountain = `${staticImage}/manOnMountain.png`
    const btnForm= infoOkay ? "info":"primary";

    //////------------- requestQuote=>requestQuote,(name,cell,coName,coSite,email,content) IS TO BE SENT TO THE SERVER THROUGH Axios-----//////////////////////////////
    //////------------- requestQuote IS TO BE SENT VIA EMAIL,@ SERVER LEVEL-----//////////////////////////////

    useEffect(() => {
        // VALIDATION EMAIL
        const email_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const fullName_REGEX = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
        const site_REGEX = /^[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
        const content_REGEX = /(([a-zA-Z])+\w{4,})/;
        const cell_REGEX = /^[0-9]{10}|[0-9]{3}-[0-9]{3}-[0-9]{4}/;
        let emailValid = email_REGEX.test(email);
        let fullnameValid = fullName_REGEX.test(name);
        let contentValid = content_REGEX.test(content);
        let cellValid = cell_REGEX.test(cell);
        let siteValid = site_REGEX.test(coSite);
        setValidSite(siteValid);
        setValidCell(cellValid);
        setValidName(fullnameValid);
        setValidEmail(emailValid);
        setValidContent(contentValid);

    }, [setValidEmail, email, setValidName, validName, name, setValidContent, content, setRequestQuote, checked, validContent, validEmail, setValidSite, setValidCell, cell, coSite, coName, validSite, validCell, setInfoOkay, infoOkay]);

    useEffect(() => {

        const isInfoOkay = () => {
            if (validName && validEmail && validContent && validCell && validSite) {
                setRequestQuote({ email: email, fullName: name, content: content, promotion: checked, cell: cell, coName: coName, coSite: coSite })
                setInfoOkay(true);
                localStorage.setItem("client", JSON.stringify(requestQuote));
                setIssue(false);
            } else { setInfoOkay(false) }
        }
        isInfoOkay();
    }, [setInfoOkay, validName, validEmail, validContent, validCell, validSite, content, email, checked, cell, coName, coSite, infoOkay, name, setRequestQuote, setIssue, requestQuote]);


    const handleChecked = (e) => {
        if (checked === true) return setChecked(false)
        return setChecked(true)
    }
    const handleSubmit = (e) => {
        e.preventDefault(e);
        const clientRequest = JSON.parse(localStorage.getItem("client"));
        
        const sendQuote = async ()=>{
            try {
                const res= await api.post(`/post/`,requestQuote);
                const callBack= await res.data
                setCallBackConfirmed(true)
                setCallBackQuoteRequest(callBack);
                setEmail("");
                    setName("");
                    setContent("");
                    setCell("");
                    setCoName("");
                    setCoSite("");
                    setContent("");
                if (infoOkay) {
                    setIssue(false);
                } else {
                    return setIssue(true);
                }
            } catch (error) {
                console.error(error.message)
                localStorage.setItem("error",JSON.stringify(error.message))
            }
        }
        sendQuote();
        
    }
    return (
        <Container maxWidth={"sm"}>
            <Card
                sx={{ justifyContent: "flex-start", alignItems: "center",position:"relative",width:"100%" }}
            >
                <CardMedia component="img" height="300" alt="www.master-connect.ca"
                    image={manOnMountain} sx={{ position: "relative" }} />
                <Typography component="h1" variant="h4"
                    className={!issue ? styles2.formMsg : styles2.formMsgIssue}
                    sx={{ fontSize: { xs: "20px", sm: "30px" } }}
                >
                    {!issue ? "We can help - No Hassles!" : " you forgot something below"}
                </Typography>
                <CardContent>
                    <form style={{
                        margin: "auto", width: "100%", flexGrow: 1, background: theme.palette.home.lightBlue, borderRadius: "2%",
                        boxShadow: "1px 2px 10px white,-1px -2px 10px white"
                    }}>
                        <FormLabel component="div" color="primary"
                            sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "column", padding: "1rem", width: "100%" }}
                        >
                            <FormControl className={styles2.formControl} size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative" }}>
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
                            <FormControl className={styles2.formControl} size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative" }}>
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
                            <FormControl className={styles2.formControl} size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative" }}>
                                <InputLabel htmlFor="cell">Cell phone</InputLabel>
                                <Input
                                    id="cell"
                                    aria-describedby="Your cell phone"
                                    value={cell}
                                    onChange={(e) => setCell(e.target.value)}
                                    aria-invalid={validName ? "false" : "true"}
                                />
                                {validCell ? <span className={validCell ? styles.validCell : styles.not}><CheckCircleOutlineIcon /></span>
                                    : <span className={validCell ? styles.not : styles.notValidCell}><CloseIcon /></span>}
                                <FormHelperText id="your-cell">Please type your number</FormHelperText>

                            </FormControl>
                            <FormControl size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative" }}>

                                <TextareaAutosize
                                    sx={{ width: "100%" }}
                                    minRows={3}
                                    id="coName"
                                    placeholder="Company Name?"
                                    aria-describedby="how can know what to ask"
                                    value={coName}
                                    onChange={(e) => setCoName(e.target.value)}
                                    aria-invalid={validContent ? "false" : "true"}
                                />

                                <FormHelperText id="coName-helper">So we know who you are.</FormHelperText>
                            </FormControl>
                            <FormControl className={styles2.formControl} size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative" }}>

                                <TextareaAutosize
                                    sx={{ width: "100%" }}
                                    minRows={3}
                                    id="coSite"
                                    placeholder="Company's or preferred site'?"
                                    aria-describedby="so we know what to do"
                                    value={coSite}
                                    onChange={(e) => setCoSite(e.target.value)}
                                    aria-invalid={validContent ? "false" : "true"}
                                />
                                {validSite ? <span className={validSite ? styles.validSite : styles.not}><CheckCircleOutlineIcon /></span> :
                                    <span className={!validSite ? styles.notValidSite : styles.validSite}><CloseIcon /> </span>}
                                <FormHelperText id="coName-helper">So we know what to do.</FormHelperText>
                            </FormControl>
                            <FormControl className={styles2.formControl} size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative" }}>

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
                            <>
                                {infoOkay ?
                                    <Fab color={btnForm} type={"submit"} variant="extended" onClick={(e) => handleSubmit(e)} >
                                        <NavigationIcon sx={{ mr: 1 }} />
                                        send request
                                        </Fab>
                                        :
                                        <Fab color={btnForm} variant="extended">
                                            pending Submission
                                        </Fab>
                                    }

                       
                    
                        </>
                    </Grid>
                </form>
            </CardContent>
        </Card>
        </Container >
    )
}

export default RequestAQuote