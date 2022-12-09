import React, { useContext, useEffect, useState, useMemo } from 'react'
// import { GeneralContext } from '../../context/GeneralContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { useTheme } from '@mui/material/styles';
import {  Stack, Container,  Typography, Grid,  Fab, Card, CardContent, FormLabel, FormControl, InputLabel, Input, FormHelperText, Select, MenuItem } from '@mui/material';
import styles from './account.module.css';
// import styled from 'styled-components';
import apiProtect from '../axios/apiProtect';
import api from '../axios/api';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import NavigationIcon from '@mui/icons-material/Navigation';
import MsgFillOutForm from './MsgFillOutForm';

const InfoCompleteForm = () => {
    const { setUserAccount, user_id, setAddress, address, setCell, cell, setName, name,setWebsite,website,setCDN,CDN, setFormComplete, formComplete,
        provState, setProvState,country, setCountry,postal, setPostal,industry,setIndustry,setCo,co } = useContext(TokenAccessContext);
    const theme = useTheme();
    const [error, setError] = useState('');
    const [issue, setIssue] = useState(false);
    const [isInfoOk, setIsInfoOk] = useState(false);
    const [validName, setValidName] = useState(false);
    const [validCell, setValidCell] = useState(false);

    const [validAddress, setValidAddress] = useState(false);
    const [validCountry, setValidCountry] = useState(false);
    const [validPostal, setValidPostal] = useState(false);
    const [validProvState, setValidProvState] = useState(false);
    const [validCDN,setValidCDN] = useState(false);
    const [validCo,setValidCo]=useState(false);
    const [validIndustry,setValidIndustry]=useState(false);
    const [validWebsite,setValidWebsite]=useState(false);
    const [msgFillOutForm, setMsgFillOutForm] = useState(true);

    const [region, setRegion] = useState({
        loaded: false,
        data: []
    });
    
    const [requestInfo, setRequestInfo] = useState({
        loaded: false,
        data: {
            name: "",
            cell: "",
            address: "",
            country:"",
            provState:"",
            CDN:"",
            industry:"",
            co:""
        }
    });
useMemo(()=>{
    if(name ==="newuser"){
        setMsgFillOutForm(true);
    }
},[name])
    

    useMemo(() => {
        const getRegion = async () => {
            try {
                const res = await api.get('/region/');
                const body = res.data;
                setRegion({
                    loaded: true,
                    data: body
                });
            } catch (error) {
                console.error(error.message)
            }
        }
        if(!formComplete){
            getRegion();
        }
    }, [setRegion,formComplete])

    useEffect(() => {
        if (isInfoOk) {
            setRequestInfo({ data:
                 { name: name, cell: cell, address:address,country:country,provState:provState,postal:postal,website:website,CDN:CDN,industry:industry,co:co },
                  loaded: true });
        }

    }, [isInfoOk,name,cell,address,country,provState,postal,website,CDN,industry,co]);

    

    useEffect(() => {
        // VALIDATION EMAIL
        const GENERIC_REGEX = /(^[a-zA-Z0-9]{1,8})/;
        const COUNTRY_REGEX = /(^[a-zA-Z0-9]{0,2})/;
        const fullName_REGEX = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
        const cell_REGEX = /^[0-9]{10}|[0-9]{3}-[0-9]{3}-[0-9]{4}/;
        const address_REGEX = /(^[0-9]{0,10})([ ]{0,1})([A-Za-z]{1,36})/;
        setValidName(fullName_REGEX.test(name))
        setValidCell(cell_REGEX.test(cell));
        setValidAddress(address_REGEX.test(address));
        setValidCountry(COUNTRY_REGEX.test(country));
        setValidProvState(COUNTRY_REGEX.test(provState));
        setValidPostal(GENERIC_REGEX.test(postal));
        setValidCDN(GENERIC_REGEX.test(CDN));
        setValidCo(GENERIC_REGEX.test(co));
        setValidWebsite(GENERIC_REGEX.test(website));
        setValidIndustry(GENERIC_REGEX.test(industry));


    }, [ address, cell,name,country,postal,provState,]);

    useEffect(()=>{
        if (validName && validCell && validAddress && validPostal && validProvState && validCountry && validCDN && validCo && validWebsite & validIndustry) {
            setIsInfoOk(true)
        } 
    },[validName,validCell,validAddress,validPostal,validProvState,validCountry,validWebsite,validCDN,validCo,validIndustry]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const params = { "user_id": user_id, "name": requestInfo.data.name, "cell": requestInfo.data.cell, 
                        "address": requestInfo.data.address,"country":requestInfo.data.country,
                        "provState":requestInfo.data.provState,"postal":requestInfo.data.postal,"website":requestInfo.data.website,"CDN":requestInfo.data.CDN,"industry":requestInfo.data.industry,"comp":requestInfo.data.co}
        const sendServer = async () => {
            try {
                const res = apiProtect.post("/account/userAccountComplete/", params);
                const body = await res.data;
                if (body) {
                    setUserAccount({ loaded: true, data: body });
                    localStorage.setItems("userAccount",JSON.stringify(body))
                }
                setFormComplete(true);
                localStorage.setItem("formComplete",true)
            } catch (error) {
                if (error.response) {
                    setIssue(true);
                    setError(error.response.message)
                    localStorage.setItem("formComplete",false)
                } else { 
                    console.error(error.message); 
                    setIssue(true); setError(error.message);
                    localStorage.setItem("formComplete",false);
                 }
            }

        }
        if (requestInfo.loaded) {
            sendServer();
        }
    }

    return (
        <Container maxWidth="sm" className={formComplete ? styles.closeForm : styles.form}>
            <Card sx={{ maxWidth: "100%",position:"relative" }}>
                <CardContent>
                    <form style={{ margin: "auto", width: "100%", flexGrow: 1, background: theme.palette.common.light }}>

                        <FormLabel className={styles.formLabel} component="div" color="primary" filled={true}>Full Name</FormLabel>
                        <FormControl className={styles.formControl} size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative" }}>
                            <InputLabel htmlFor="name">Full Name</InputLabel>
                            <Input
                                id="name"
                                name="name"
                                aria-describedby="Your name please"
                                placeholder="first last"
                                value={name ? name :""}
                                onChange={(e) => setName(e.target.value)}
                                aria-invalid={validName ? "false" : "true"}
                            />
                            {validName ? <span className={styles.validName }><CheckCircleOutlineIcon /></span>
                                : <span className={styles.not }><CloseIcon /> </span>}
                            <FormHelperText id={styles.extraInfo}>Full name (first and last)</FormHelperText>
                        </FormControl>
                        <FormLabel className={styles.formLabel} component="div" color="primary" filled={true}>Cell Phone</FormLabel>
                        <FormControl className={styles.formControl} size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative" }}>
                            <InputLabel htmlFor="cell">Cell</InputLabel>
                            <Input
                                id="cell"
                                name="cell"
                                aria-describedby="Your Cell number"
                                placeholder="1234567899 or 123-456-7899"
                                value={cell ? cell :""}
                                onChange={(e) => setCell(e.target.value)}
                                aria-invalid={validCell ? "false" : "true"}
                            />
                            {validCell ? <span className={styles.validCell}><CheckCircleOutlineIcon /></span>
                                : <span className={styles.not}><CloseIcon /></span>}
                            <FormHelperText id={styles.extraInfo}>starting format:"xxx-xxx-xxxx"</FormHelperText>

                        </FormControl>
                        <FormLabel className={styles.formLabel} component="div" color="primary" filled={true}>Your Address </FormLabel>
                        <FormControl className={styles.formControl} size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative" }}>
                            <InputLabel id="Your Address" htmlFor="address">Address</InputLabel>
                            <Input
                                id="address"
                                name="address"
                                aria-describedby="valid address"
                                placeholder="12 street,city"
                                value={address ? address :""}
                                onChange={(e) => setAddress(e.target.value)}
                                aria-invalid={validName ? "false" : "true"}
                            />
                            {
                                validAddress ? <span className={styles.validAddress }><CheckCircleOutlineIcon /></span>
                                : 
                                <span className={ styles.not }><CloseIcon /> </span>
                            }
                            <FormHelperText id={styles.extraInfo}>"111 street, city"</FormHelperText>
                        </FormControl>
                        <FormLabel className={styles.formLabel} component="div" color="primary" filled={true}>Your Country & State/Prov & PO/ZIP </FormLabel>
                        <Grid container spacing={0} sx={{marginBottom:"1rem"}} >
                            <Grid item xs={6} md={4}>
                                <FormControl className={styles.formControl} size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative" }}>
                                    <InputLabel id="your_country" htmlFor="country" component="div" color="primary" filled={true} className={styles.inputLabel}>Country </InputLabel>
                                    <Select
                                        label_id="your_country"
                                        name="country"
                                        label="Country"
                                        defaultValue="CA"
                                        aria-describedby="valid Country"
                                        onChange={(e) => setCountry(e.target.value)}
                                        aria-invalid={validCountry ? "false" : "true"}
                                    >
                                        <MenuItem disabled value="CA">country</MenuItem>
                                        {region.loaded && region.data.map(obj => (
                                            <MenuItem key={obj.id} value={obj.country}>{obj.country}</MenuItem>
                                        ))}
                                        <MenuItem disabled={true} defaultValue="" value={""}>{"NO_OPTIONS_LABEL"}</MenuItem>
                                    </Select>
                                    {
                                        validCountry ? <span className={styles.validCountry}><ThumbUpIcon sx={{fontSize:"20px"}} /></span>
                                            : 
                                        <span className={styles.not }><CloseIcon /> </span>
                                    }
                                    <FormHelperText className={styles.addProvPost}>"To help with your Design"</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={4}
                            sx={{justifyContent:"flex-start"}}
                            >
                                <FormControl className={styles.formControl} size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative" }}>
                                    <InputLabel htmlFor="Your State/Province" className={styles.inputLabel}>Prov/State</InputLabel>
                                    <Select
                                        label_id="Your State/Province"
                                        label="provState"
                                        defaultValue={"ON"}
                                        aria-describedby="valid State/ or Province"
                                        onChange={(e) => setProvState(e.target.value)}
                                        aria-invalid={validProvState ? "false" : "true"}
                                    >
                                         <MenuItem disabled value="ON">province/State</MenuItem>
                                        {
                                        region.loaded && region.data.map(obj => (
                                            <MenuItem key={obj.id} value={obj.provState}>{obj.provState}</MenuItem>
                                        ))
                                        }
                                    </Select>
                                    {
                                        validProvState ? <span className={styles.validProvState }><ThumbUpIcon sx={{fontSize:"20px"}} /></span>
                                        :
                                         <span className={styles.not }><CloseIcon /> </span>
                                    }
                                    <FormHelperText className={styles.addProvPost}>"To help use determine the theme"</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <FormControl className={styles.formControl} size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative" }}>
                                    <InputLabel htmlFor="Your Postal" className={styles.inputLabel}>Postal Code/Zip-Code</InputLabel>
                                    <Input
                                        label_id="Your Postal"
                                        name="postal"
                                        placeholder="XXX-XXX or XXXXXX"
                                        aria-describedby="Postal Code"
                                        value={postal ? postal :""}
                                        onChange={(e) => setPostal(e.target.value)}
                                        aria-invalid={validPostal ? "false" : "true"}
                                    />
                                    {
                                        validPostal ? <span className={styles.validPostal }><ThumbUpIcon sx={{fontSize:"20px"}} /></span>

                                        :
                                         <span className={styles.not}><CloseIcon /> </span>
                                    }
                                    <FormHelperText className={styles.addProvPost}>"eg:A#A#A#/#######"</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <FormControl className={styles.formControl} size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative" }}>
                                    <InputLabel htmlFor="website" className={styles.inputLabel}>website</InputLabel>
                                    <Input
                                        label_id="website"
                                        name="website"
                                        placeholder="www.site.com"
                                        aria-describedby="Postal Code"
                                        value={website ? website :""}
                                        onChange={(e) => setWebsite(e.target.value)}
                                        aria-invalid={validPostal ? "false" : "true"}
                                    />
                                    {
                                        website !=="" ? <span className={styles.validPostal }><ThumbUpIcon sx={{fontSize:"20px"}} /></span>

                                        :
                                         <span className={styles.not}><CloseIcon /> </span>
                                    }
                                    <FormHelperText className={styles.addProvPost}>"www.yoursite.com"</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <FormControl className={styles.formControl} size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative" }}>
                                    <InputLabel htmlFor="DNS" className={styles.inputLabel}>Your DNS</InputLabel>
                                    <Input
                                        label_id="DNS"
                                        name="DNS"
                                        aria-describedby="DNS"
                                        placeholder="amazon,AWS,etc or none"
                                        value={CDN ? CDN :""}
                                        onChange={(e) => setCDN(e.target.value)}
                                        aria-invalid={validPostal ? "false" : "true"}
                                    />
                                    {
                                        CDN !=="" ? <span className={styles.validPostal }><ThumbUpIcon sx={{fontSize:"20px"}} /></span>

                                        :
                                         <span className={styles.not}><CloseIcon /> </span>
                                    }
                                    <FormHelperText className={styles.addProvPost}>"eg:AWS,Google,etc"</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <FormControl className={styles.formControl} size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative" }}>
                                    <InputLabel htmlFor="industry" className={styles.inputLabel}>Your Industry</InputLabel>
                                    <Input
                                        label_id="industry"
                                        name="industry"
                                        aria-describedby="industry"
                                        placeholder="paint or hightech or,,"
                                        value={industry ? industry :""}
                                        onChange={(e) => setIndustry(e.target.value)}
                                        aria-invalid={validPostal ? "false" : "true"}
                                    />
                                    {
                                        industry !=="" ? <span className={styles.validPostal }><ThumbUpIcon sx={{fontSize:"20px"}} /></span>

                                        :
                                         <span className={styles.not}><CloseIcon /> </span>
                                    }
                                    <FormHelperText className={styles.addProvPost}>"Area of expertise"</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <FormControl className={styles.formControl} size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative" }}>
                                    <InputLabel htmlFor="co" className={styles.inputLabel}>Co name</InputLabel>
                                    <Input
                                        label_id="co"
                                        name="co"
                                        placeholder="company_name ltd or company_name"
                                        aria-describedby="co"
                                        value={co ? co :""}
                                        onChange={(e) => setCo(e.target.value)}
                                        aria-invalid={validPostal ? "false" : "true"}
                                    />
                                    {
                                        co !=="" ? <span className={styles.validPostal }><ThumbUpIcon sx={{fontSize:"20px"}} /></span>

                                        :
                                         <span className={styles.not}><CloseIcon /> </span>
                                    }
                                    <FormHelperText className={styles.addProvPost}>"Co Name"</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container spacing={1} sx={{ justifyContent: "center" }}>
                            {isInfoOk ? <Fab color={"secondary"} type={"submit"} variant="extended" onClick={(e) => handleSubmit(e)}>
                                <NavigationIcon sx={{ mr: 1 }} />
                                send request
                            </Fab> : <div>"submit pending"</div>}
                            <>
                                {issue &&
                                    <Stack container spacing={1} sx={{ justifyContent: "center" }}
                                        className={styles.formError}
                                    >
                                        <Typography component="h1" variant="body1">
                                            There was an issue {error}
                                        </Typography>
                                    </Stack>
                                }
                            </>
                        </Grid>

                    </form>
                </CardContent>
                { msgFillOutForm && <MsgFillOutForm/>}
            </Card>
        </Container>
    )
}

export default InfoCompleteForm
