import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
// import { PriceContext } from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import { Stack, Container, Paper, Typography, Grid, ListItem, Fab, } from '@mui/material';
import InfoCompleteForm from './InfoCompleteForm';
import ShowInfo from './ShowInfo';
// import InvoiceTotal from './InvoiceTotal';
import styles from './account.module.css';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import apiProtect from '../axios/apiProtect';
import SignpostIcon from '@mui/icons-material/Signpost';
import ParticularsUsersProdsServs from './ParticularsUsersProdsServs';
import ParticularsPaidTotals from './ParticularsPaidTotals';


const Particulars = ({invoicePaid,postInvoicePaid,extraInvoicePaid}) => {
    //NOTE: invoicePaid and postInvoicePaid is trigger on usersInvoice.loaded=True and usersPostInvoice.loaded=True
    const theme = useTheme();
    const navigate = useNavigate();
    const { userAccount, address, cell, name, email, provState, country, postal, formComplete, usersProduct, usersService, usersInvoice, setUsersInvoice, user_id, setUserAccount, setUsersService, setUsersProduct,loggedIn,setFormComplete,usersExtraInvoice } = useContext(TokenAccessContext);
    const { setChangePage } = useContext(GeneralContext);
    const [message,setMessage]=useState(null);
    const [paid,setPaid]=useState(false);
    const [needToChangeAddress,setNeedToChangeAddress]=useState(false);
    const [getMessage,setGetMessage]=useState({loaded:false,data:""});
    const [postPaid,setPostPaid]=useState(false);
    const isExtraInvoice=usersExtraInvoice.loaded ? 4 : 6;
    const largeFormat=isExtraInvoice;
    const getFormComplete= localStorage.getItem("formComplete") ? JSON.parse(localStorage.getItem("formComplete")):formComplete;

    useEffect(()=>{
        setNeedToChangeAddress(formComplete);
        if(invoicePaid){
        setPaid(invoicePaid.paid)
        }else{setPaid(false)}
        setPostPaid(postInvoicePaid.paid)
    },[invoicePaid,postInvoicePaid,formComplete]);


    const handleCheckout = (e) => {
        if(getFormComplete && loggedIn){
            e.preventDefault();
            setMessage(null);
            const calculateCostGetInvoice= async ()=>{
                try {
                    const res= await apiProtect.post('/account/post_invoice/', {"user_id":user_id});
                    const body=res.data;
                    setUsersInvoice({loaded:true,data:body});
                    localStorage.removeItem("formComplete");
                    navigate("/MyAccount/checkout/", setChangePage(true));
                    if(window.scrollY){
                        window.scroll(0,0);
                    }
                } catch (error) {
                    console.error(error.message)
                }
            }
                calculateCostGetInvoice();
        // console.log("calculateCostGetInvoice=>YES")
        }
        if(!getFormComplete){
                setMessage("Please complete the form, so we can better understand what you want.");
                setTimeout(()=>{
                    setMessage(null);
                },10000)
        }if(!loggedIn){navigate("/signin",setChangePage(true))}
       
    };
    
    const handleConsult = (e) => {
        e.preventDefault();
        if (usersService.loaded) {
            localStorage.setItem("usersServices", JSON.stringify(usersService.data))
        }
        if (usersProduct.loaded) {
            localStorage.setItem("usersProducts", JSON.stringify(usersProduct.data))
        }
        const sendConsultCheck = async () => {
            const params = { "user_id": user_id, "consult": true }
            try {

                const res = await apiProtect.post('account/UserCombinedProductServicesConsultCheckPost/', params);
                const body = res.data;
                // console.log("body.invoice",body.invoice)
                setUserAccount({ loaded: true, data: body });
                setUsersService({ loaded: true, data: body.service });
                setUsersProduct({ loaded: true, data: body.product });
                if(body.invoice !== null){
                setUsersInvoice({ loaded: true, data: body.invoice });
                navigate("/MyAccount/consult", setChangePage(true));
                }else {
                        setUsersInvoice({loaded:false,data:[]});
                        setGetMessage({loaded:true,data:"To consult, please select one product and  one service, so we know how to help you"})
                }
                

            } catch (error) {
                console.error(error.message)
            };
        };
        if (loggedIn && formComplete) {
            sendConsultCheck();
        }if(!loggedIn){ navigate("/signin", setChangePage(true)) };
        if(!formComplete){
            setMessage("Please complete the form, so we can better understand what you want.");
            setTimeout(()=>{
                setMessage(null);
            },10000)
        }
    };
    const HandlePostAccount = (e)=>{
        e.preventDefault();
        navigate("/MyAccount/postAccount/",setChangePage(true));
    }

    return (
        <Container maxWidth="lg"
            sx={{
                margin: "2rem auto", marginTop: { xs: "1rem", sm: "1rem" }, minHeight: { xs: "30vh", sm: "" },
                display: 'flex', justifyContent: "flex-start", alignItems: "center", flexDirection: "column", fontFamily: "Roboto"
            }}>
            <Paper elevation={10} component="div"
                sx={{ width: "100%", margin: "1rem auto", display: 'flex', justifyContent: "flex-start", alignItems: "center", flexDirection: "column", padding: "0.5rem",position:"relative" }}>
                <Typography component="h1" variant="h3" sx={{ width: "100%", textAlign: "center" }}>
                    Summary
                </Typography>
                <Grid container spacing={0} sx={{ margin: "auto", width: "100%", fontFamily: "Roboto", }}>

                    <Grid item xs={12} md={6} sx={{ margin: "1rem auto", justifySelf: "center", AlignSelf: "center", background: theme.palette.common.blueGreyLight, color: theme.palette.secondary.dark }}>
                        <Grid container spacing={0} sx={{ margin: "auto", width: "100%", fontFamily: "Roboto", padding: "0.5rem" }}>
                            <Grid item xs={12} md={12}>
                                <Paper elevation={10} sx={{ margin: "1rem auto", padding: "1rem" }}>

                                    <Typography component="h1" variant="body2">
                                        <Grid container spacing={0}>
                                            <Grid item xs={12} sm={6}>
                                                <ListItem component="li"><span style={{color:"blue"}}>n:</span>{name}</ListItem>
                                                <ListItem component="li"><span style={{color:"blue"}}>c:</span>{cell}</ListItem>
                                                <ListItem component="li"><span style={{color:"blue"}}>e:</span>{email}</ListItem>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <ListItem component="li"><span style={{color:"blue"}}>add:</span>{address}</ListItem>
                                                <Stack direction="row" spacing={1}>
                                                    <span><span style={{color:"blue"}}>Co:</span>{country}</span>
                                                    <span><span style={{color:"blue"}}>Prov/St:</span>{provState}</span>
                                                    <span><span style={{color:"blue"}}>PO:</span>{postal}</span>
                                                </Stack>
                                            </Grid>
                                        </Grid>

                                    </Typography>

                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={12} sx={{position:"relative"}}>
                                <Paper elevation={10} sx={{ margin: "1rem auto", padding: "1rem" }}>

                                    <Typography component="h1" variant="h4" sx={{ textAlign: "center",margin:"1rem auto" }}>
                                        <span style={{  fontWeight: "bold", textAlign: "center" }}>product(s) / Services(s)</span>
                                        </Typography>
                                       {!paid ?
                                       <ParticularsUsersProdsServs usersProduct={usersProduct} usersService={usersService}/>

                                           :
                                           
                                           <ParticularsPaidTotals
                                            invoicePaid={invoicePaid}
                                             postInvoicePaid={postInvoicePaid}
                                             largeFormat={largeFormat}
                                             extraInvoicePaid={extraInvoicePaid}
                                             />

                                        }

                                </Paper>
                                <Stack direction="row" spacing={2} sx={{ width: "100%" ,margin:"2rem auto"}} >
                                   {!paid && <Fab variant="extended" color="success" sx={{ fontSize: { xs: "14px", lg: "20px" }, }} onClick={(e) => handleCheckout(e)}>
                                        checkout <ShoppingCartCheckoutIcon sx={{ ml: 2, color: "white" }} />
                                    </Fab>}
                                    <Fab variant="extended" color="info" sx={{ fontSize: { xs: "14px", lg: "20px" }, }} onClick={(e) => handleConsult(e)} >
                                        consult <PhoneForwardedIcon sx={{ ml: 2 }} />
                                    </Fab>
                                    {(userAccount.data.postAccountActivate && !postPaid) && <Fab variant="extended" color={"warning"} onClick={(e)=>HandlePostAccount(e)}>
                                    Post account view <SignpostIcon sx={{ml:2,color:"green"}}/>
                                    </Fab>}
                                </Stack>
                                { message && <Stack direction="row" className={styles.completeFormMessage}>
                                    <Typography  component="h1" variant="h5"><span>You forgot something:</span> {message}</Typography>
                                </Stack>}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}
                        sx={{ margin: "1rem auto", justifySelf: "center", AlignSelf: "center", background: theme.palette.common.light, color: theme.palette.secondary.background, position: "relative" }}
                    >
                        {(!formComplete) && <InfoCompleteForm />}
                        {(formComplete ) && <div className={styles.showInfo}><ShowInfo /></div>}
                    </Grid>
                </Grid>
                {getMessage.loaded && 
                <Typography component="h1" variant="h4" className={styles.getMessage}
                sx={{position:"absolute",top:"20%",margin:"auto"}}
                >

                    {getMessage.data}
                </Typography>
                }
            </Paper>
        </Container>
    )
}

export default Particulars