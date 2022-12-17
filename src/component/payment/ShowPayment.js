import React, { useEffect, useContext, useState, } from 'react';
// import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { Container, Grid, Typography } from '@mui/material';
// import styled from 'styled-components';
import styles from './payment.module.css';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';



const ShowPayment = ({message,getUsersInvoice}) => {
    const { session_id,postSession_id } = useContext(GeneralContext);
  const [showPayment,setShowPayment]=useState(false);
  const [showPostPayment,setShowPostPayment]=useState(false);
const getSession_id= localStorage.getItem("session_id") ? localStorage.getItem("session_id"):session_id;

  useEffect(()=>{
    if(getSession_id && getUsersInvoice){
        setShowPayment(true);
    }
    if(postSession_id && getUsersInvoice){
        setShowPostPayment(true);
    }
  },[getUsersInvoice,getSession_id,postSession_id]);
 
    return (
        <>
            <Typography className={true ? styles.revealMessage : styles.noMessage} component="h1" variant="h3"
             sx={{
                 marginTop: { sm: "4rem", xs: "4rem" }, fontSize: { xs: "100%", sm: "130%", md: "170%" }, padding: "2rem auto",
                  }}>
                {message}<br/> Until we Speak,<br/> <div style={{marginLeft:"2rem"}}>Gary Wallace<br/> c: 416.917.5768</div>
            </Typography>
            
            <Container maxWidth="md" className={styles.summaryPrice} sx={{ margin: "1rem auto", textAlign: "center" }}>

                { (showPayment && getUsersInvoice && !showPostPayment) && <Grid container spacing={0} className={getUsersInvoice ? styles.summaryPaymentGrid:styles.hide} sx={{margin:"2rem auto"}}>
                    <Grid item xs={12} sm={6}
                        sx={{ display: showPayment ? "block" : "none" }}
                    >
                        { (getUsersInvoice  && getUsersInvoice.numPayment > 1) ?
                            <Typography component="h1" variant="h6">
                                Total Monthly:
                                <AttachMoneyIcon sx={{ color: "green", fontSize: "110%" }} />{getUsersInvoice && getUsersInvoice.totalMonthly}.<sup>00</sup></Typography>
                            :
                            <Typography component="h1" variant="h6">
                                Total One Time:
                                <AttachMoneyIcon sx={{ color: "green", fontSize: "110%" }} />{getUsersInvoice && getUsersInvoice.total}.<sup>00</sup></Typography>
                        }
                    </Grid>
                    { showPayment ? 
                    <Grid item xs={12} sm={6} className={styles.summaryPaymentGrid}>
                        <Typography component="h1" variant="h5"> Confirmed payment</Typography>
                    </Grid>
                    :
                    <Grid item xs={12} sm={6}  className={styles.summaryPaymentGridNotConfirmed}>
                        <Typography component="h1" variant="h5"> Payment was not confirmed</Typography>
                    </Grid>
                    
                }
                </Grid>}
                { (showPostPayment && !showPayment && getUsersInvoice) && <Grid container spacing={0} className={getUsersInvoice ? styles.summaryPaymentGrid:styles.hide} sx={{margin:"2rem auto"}}>
                    <Grid item xs={12} sm={6}
                        sx={{ display: showPayment ? "block" : "none" }}
                    >
                        { getUsersInvoice  &&
                            <Typography component="h1" variant="h6">
                                Total Monthly:
                                <AttachMoneyIcon sx={{ color: "green", fontSize: "110%" }} />{getUsersInvoice && getUsersInvoice.totalMonthly}.<sup>00</sup></Typography>

                        }
                    </Grid>
                    { showPostPayment ? 
                    <Grid item xs={12} sm={6} className={styles.summaryPaymentGrid}>
                        <Typography component="h1" variant="h5"> Confirmed payment</Typography>
                        
                    </Grid>
                    :
                    <Grid item xs={12} sm={6}  className={styles.summaryPaymentGridNotConfirmed}>
                        <Typography component="h1" variant="h5"> Payment was not confirmed</Typography>
                    </Grid>
                    
                }
                </Grid>}

            </Container>
        </>
    )
}

export default ShowPayment