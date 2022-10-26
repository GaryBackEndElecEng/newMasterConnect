import React, {  useMemo, useState } from 'react';
import {  Paper, Typography, Grid, } from '@mui/material';
// import { TokenAccessContext } from '../../context/TokenAccessProvider';
// import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import styles from './consult.module.css';
// import styled from 'styled-components';


const AmountOneTimeMonthly = ({ usersInvoice }) => {
    const theme = useTheme();
    // const { usersInvoice, } = useContext(TokenAccessContext);
    const [getUsersInvoice, setGetUsersInvoice] = useState(null);
    const getUsersInvoice1 = usersInvoice.loaded ? usersInvoice.data : null;
    useMemo(() => {
        if (getUsersInvoice1) {
            // console.log(getUsersInvoice1)
            setGetUsersInvoice(getUsersInvoice1);
        }
    }, [getUsersInvoice1])
    return (
        <Paper elevation={10} component="div" sx={{ margin: "1rem 5px", padding: "1rem 5px", width: "100%" }}>
            <Typography component="h1" variant="h5"
                sx={{
                    textAlign: "center", margin: " 1rem auto", color: theme.palette.common.teal
                }}>
                One Time
            </Typography>
            <Grid container spacing={0} sx={{ margin: "1rem auto", padding: "0.5rem" }}>
                <Grid item xs={12} sm={6} sx={{ width: "100%", textAlign: "center" }}>
                    <Typography component="div" variant="h6">
                        <span style={{ fontSize: "50%", color: "blue" }}>subTot:</span><AttachMoneyIcon sx={{ ml: 0, color: "green", fontSize: "90%" }} />{getUsersInvoice && getUsersInvoice.subTotal}.<sup>00</sup>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ width: "100%", textAlign: "center" }}>
                    <Typography component="div" variant="h6">
                        <span style={{ fontSize: "50%", color: "blue", }}>total:</span><AttachMoneyIcon sx={{ ml: 0, color: "green", fontSize: "90%" }} />{getUsersInvoice && getUsersInvoice.total}.<sup>00</sup>
                    </Typography>
                    <Typography component="h1" variant="subtitle1"> tax included</Typography>
                </Grid>
            </Grid>
            <Typography component="h1" variant="h5"
                sx={{
                    textAlign: "center", margin: " 1rem auto", color: theme.palette.common.blueGrey
                }}>
                Monthly
            </Typography>
            <Grid container spacing={0} sx={{ margin: "1rem auto", padding: "0.5rem", color: theme.palette.common.teal }}>
                <Grid item xs={12} sm={6} sx={{ width: "100%", textAlign: "center" }}>
                    <Typography component="div" variant="h6">
                        <span style={{ fontSize: "50%", color: "blue" }}>subTot:</span><AttachMoneyIcon sx={{ ml: 0, color: "red", fontSize: "90%" }} />{getUsersInvoice && getUsersInvoice.subTotalMonthly}.<sup>00</sup>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ width: "100%", textAlign: "center" }}>
                    <Typography component="div" variant="h6">
                        <span style={{ fontSize: "50%", color: "blue", }}>total:</span><AttachMoneyIcon sx={{ ml: 0, color: "red", fontSize: "90%" }} />{getUsersInvoice && getUsersInvoice.totalMonthly}.<sup>00</sup>
                    </Typography>
                    <Typography component="h1" variant="subtitle1"> tax included</Typography>
                </Grid>
            </Grid>

        </Paper>
    )
}

export default AmountOneTimeMonthly