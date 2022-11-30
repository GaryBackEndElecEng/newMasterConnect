import React, { useContext, useEffect, useState } from 'react'
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import {  Container, Card, FormControl, InputLabel, FormHelperText, Input, TextareaAutosize, FormControlLabel, Checkbox, FormLabel,  CardContent, Fab, Grid, CardMedia, Typography, Box } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import styles from '../contact/contact.module.css';
import styles2 from './about.module.css';
import NavigationIcon from '@mui/icons-material/Navigation';
import api from '../axios/api'

const GetAQuote = () => {
    const theme = useTheme();
    const { email, setEmail, name, setName, content, setContent, setRequestQuote, requestQuote, infoOkay, setInfoOkay, issue, setIssue,staticImage,setCallBackQuoteRequest,setCallBackConfirmed,setOpenGetQuote } = useContext(GeneralContext);
    const [cell, setCell] = useState("");
    const [coName, setCoName] = useState("");
    const [coSite, setCoSite] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [validCell, setValidCell] = useState("");
    const [validSite, setValidSite] = useState(false);
    const [validName, setValidName] = useState(false);
    const [validContent, setValidContent] = useState("");
    const [validComms, setValidComms] = useState(false);
    const [checked, setChecked] = useState(false);
    const [preferredComms,setPreferredComms]=useState("");
    const manOnMountain = `${staticImage}/manOnMountain.png`

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
        if(preferredComms !==""){setValidComms(true)}

    }, [setValidEmail, email, setValidName, validName, name, setValidContent, content, setRequestQuote, checked, validContent, validEmail, setValidSite, setValidCell, cell, coSite, coName, validSite, validCell, setInfoOkay, infoOkay,preferredComms]);

    useEffect(() => {

        const isInfoOkay = () => {
            if (validName && validEmail && validContent && validCell && validSite && preferredComms) {
                setRequestQuote({ email: email, fullName: name, content: content, promotion: checked, cell: cell, coName: coName, coSite: coSite,preferredComms:preferredComms })
                setInfoOkay(true);
                localStorage.setItem("client", JSON.stringify(requestQuote));
                setIssue(false);
            } else { setInfoOkay(false) }
        }
        isInfoOkay();
    }, [setInfoOkay, validName, validEmail, validContent, validCell, validSite, content, email, checked, cell, coName, coSite, infoOkay, name, setRequestQuote, setIssue, requestQuote,preferredComms]);

    

    const handleChecked = (e) => {
        if (checked === true) return setChecked(false)
        return setChecked(true)
    }
    const handleSubmit = (e) => {
        e.preventDefault(e);
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
                sx={{ justifyContent: "flex-start", alignItems: "center",position:"relative" }}
            >
                <Box 
                sx={{position:"absolute",right:"2.2%",top:"0.25%",zIndex:"1000"}} onClick={()=>setOpenGetQuote(false)}
                ><CloseIcon sx={{color:"red"}}/>
                </Box>
                <CardMedia component="img" height="300" alt="www.master-connect.ca"
                    image={manOnMountain}  />
                <Typography component="h1" variant="h4"
                    className={!issue ? styles2.formMsg : styles2.formMsgIssue}
                    sx={{ fontSize: { xs: "20px", sm: "30px" } }}
                >
                    {!issue ? "We will get is done - No Hassles!" : " We think you forgot something below"}
                </Typography>
                <CardContent>
                    <form style={{
                        margin: "auto", width: "100%", flexGrow: 1, background: theme.palette.common.cyanPale, borderRadius: "2%",
                        boxShadow: "1px 2px 10px 8px lightgrey"
                    }}>
                        <FormLabel component="div" color="primary"
                            sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "column", padding: "1rem", width: "100%",background:theme.palette.common.cyanPale }}
                        >
                            <FormControl size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative",background:"white" }}>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input
                                sx={{background:"white"}}
                                    id="email"
                                    aria-describedby="valid email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    aria-invalid={validEmail ? "false" : "true"}
                                />
                                {validEmail ? <span className={validEmail ? styles.validEmail : styles.not}><CheckCircleOutlineIcon /></span>
                                    : <CloseIcon className={styles.not } sx={{color:"red"}} /> }
                                {/* <FormHelperText id="valid-email">We'll never share your email.</FormHelperText> */}
                            </FormControl>
                            <FormControl size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative",background:"white" }}>
                                <InputLabel htmlFor="name">Full Name</InputLabel>
                                <Input
                                    id="name"
                                    aria-describedby="Your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    aria-invalid={validName ? "false" : "true"}
                                />
                                {validName ? <span className={validName ? styles.validName : styles.not}><CheckCircleOutlineIcon /></span>
                                    : <CloseIcon className={styles.not } sx={{color:"red"}} />}
                                {/* <FormHelperText id="your-full-name">full name</FormHelperText> */}

                            </FormControl>
                            <FormControl size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative",background:"white" }}>
                                <InputLabel htmlFor="cell">Cell phone</InputLabel>
                                <Input
                                    id="cell"
                                    aria-describedby="Your cell phone"
                                    value={cell}
                                    onChange={(e) => setCell(e.target.value)}
                                    aria-invalid={validName ? "false" : "true"}
                                />
                                {validCell ? <span className={validCell ? styles.validCell : styles.not}><CheckCircleOutlineIcon /></span>
                                    : <CloseIcon className={styles.not} sx={{color:"red"}} />}
                                <FormHelperText id="your-cell">Please type your number</FormHelperText>

                            </FormControl>
                            <FormControl className={styles2.formControl} size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative",background:"white" }}>
                                <label htmlFor="comms" style={{padding:"0.5rem"}}>preferred means of communication</label>
                                <select
                                    id="comms"
                                    aria-describedby="Your prefer means of communicating"
                                    value={preferredComms}
                                    onChange={(e) => setPreferredComms(e.target.value)}
                                    style={{margin:"0.5rem auto",padding:"0.25rem"}}
                                >
                                    <option value="">-choose an option-</option>
                                    <option value="email">email</option>
                                    <option value="phone">phone</option>
                                    <option value="text">text</option>
                                </select>
                                {validComms ? <span className={ styles.validCell }><CheckCircleOutlineIcon /></span>
                                    : <CloseIcon className={styles.not } sx={{color:"red"}} />}
                                <FormHelperText id="-comms-" sx={{color:"blue"}}>for respect</FormHelperText>

                            </FormControl>
                            <FormControl size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative",background:"white" }}>

                                <Input
                                    sx={{ width: "100%" }}
                                    id="coName"
                                    placeholder="Company Name?"
                                    aria-describedby="how can know what to ask"
                                    value={coName}
                                    onChange={(e) => setCoName(e.target.value)}
                                    aria-invalid={validContent ? "false" : "true"}
                                />

                                <FormHelperText id="coName-helper">So we know who you are.</FormHelperText>
                            </FormControl>
                            <FormControl size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative",background:"white" }}>
                            <InputLabel htmlFor="coSite">Yours or preferred website</InputLabel>
                                <Input
                                    sx={{ width: "100%" }}
                                    minRows={3}
                                    id="coSite"
                                    placeholder="https://www.yoursOrpreferredSite.com"
                                    aria-describedby="so we know what to do"
                                    value={coSite}
                                    onChange={(e) => setCoSite(e.target.value)}
                                    aria-invalid={validContent ? "false" : "true"}
                                />
                                {validSite ? <span className={validSite ? styles.validSite : styles.not}><CheckCircleOutlineIcon /></span> :
                                    <span className={!validSite ? styles.notValidSite : styles.validSite}><CloseIcon sx={{color:"red"}}  /> </span>}
                                <FormHelperText id="coName-helper">"https://www.example.com"-So we know what to do.</FormHelperText>
                            </FormControl>
                            <FormControl size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative",background:"white" }}>

                                <TextareaAutosize
                                    sx={{ width: "100%" }}
                                    minRows={4}
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
                                    <Fab color="primary" type={"submit"} variant="extended" onClick={(e) => handleSubmit(e)} >
                                        <NavigationIcon sx={{ mr: 1 }} />
                                        send request
                                        </Fab>
                                        :
                                        <Fab color="secondary" variant="extended">
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

export default GetAQuote