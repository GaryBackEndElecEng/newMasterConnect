import React, { useContext, useEffect, } from 'react'
// import { GeneralContext } from '../../context/GeneralContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
// import { PriceContext } from '../../context/PriceContextProvider';
import {  Paper, Typography, Grid, } from '@mui/material';
import styles from './postAccount.module.css';
// import styled from 'styled-components';

const Particulars = () => {
    
    const { userAccount, setUserAccount } = useContext(TokenAccessContext);
    const getUserAccount = userAccount.loaded ? userAccount.data : JSON.parse(localStorage.getItem("userAccount"));
    useEffect(()=>{
        if(getUserAccount && !userAccount.loaded ){
            setUserAccount({loaded:true,data:getUserAccount});
        }
    },[getUserAccount,setUserAccount,userAccount.loaded]);
  return (
    <Paper elevation={10} component="div" className={styles.particulars}
                    sx={{ width: "100%", margin: "1rem auto", display: 'flex', justifyContent: "flex-start", alignItems: "center", flexDirection: "column", padding: "0.5rem" ,boxShadow:"1px 1px 13px 10px grey"}}>
                    <Typography component="h1" variant="h2" sx={{ width: "100%", textAlign: "center" }}>
                        Details
                    </Typography>
                    <Grid container spacing={{ xs: 0, sm: 1, lg: 2 }} sx={{ margin: "auto", width: "100%", fontFamily: "Roboto",}}>
                        
                                <Grid item xs={12} sm={6} sx={{textAlign:"center"}}>
                                    <Typography component="h1" variant="h4"
                                        sx={{ textAlign: "center" }}
                                    >
                                        {getUserAccount && getUserAccount.name}
                                    </Typography>
                                    <Typography component="h1" variant="h6"
                                        sx={{ textAlign: "center" }}
                                    >
                                        {getUserAccount && getUserAccount.email},{getUserAccount && getUserAccount.cell}
                                    </Typography>
                                    <Typography component="h1" variant="h6"
                                        sx={{ textAlign: "center" }}
                                    >
                                        {getUserAccount && getUserAccount.address},{getUserAccount && getUserAccount.provState},{getUserAccount && getUserAccount.country},
                                    </Typography>
                                    <Typography component="h1" variant="h6"
                                        sx={{ textAlign: "center" }}
                                    >
                                        {getUserAccount && getUserAccount.postal}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography component="h1" variant="h4"
                                        sx={{ textAlign: "left" }}
                                    >
                                        {getUserAccount && parseInt(getUserAccount.invoice.numPayment)===1 ?
                                        <div><span>Payment:</span><br/>${getUserAccount.invoice.total}<sup>00</sup></div>
                                       
                                    :
                                    <div><span>Monthly Payment:</span><br/>${getUserAccount.invoice.totalMonthly}<sup>00</sup></div>
                                    }
                                    </Typography>
                                    <Typography component="h1" variant="h6"
                                    sx={{textAlign:"left"}}
                                    >
                                    <span>Customer ID:</span><br/> {getUserAccount && getUserAccount.customerID}
                                        </Typography>
                                    <Typography component="h1" variant="h6"
                                        sx={{ textAlign: "left" }}
                                    >
                                        <span>sessionID:</span><br/>{getUserAccount && getUserAccount.sessionID}
                                    </Typography>
                                </Grid>
                        



                    </Grid>
                </Paper>
  )
}

export default Particulars