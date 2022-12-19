import React from 'react';
import {Container, Paper, Grid,  } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import styles from './account.module.css';
// import styled from 'styled-components';

const InvoiceTotal = ({usersProduct,usersService,invoicePaid}) => {
    const theme = useTheme();



    
//    console.log(getTotal[0])

    return (
        <Paper component="div" elevation={3} sx={{ background: theme.palette.common.light,margin:"auto" }}>

            
                <Container maxWidth="md" sx={{padding:"1rem"}}>
                    <Grid container spacing={2} >
                        <Grid item xs={6} md={6}>
                            <span style={{ fontSize: "80%", fontWeight: "bold", margin: "auto 0" }}>
                                Subtotal:
                            </span>
                            ${invoicePaid && invoicePaid.subTotal}<sup>00</sup>
                        </Grid>
                        
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={6}>
                            <span style={{ fontSize: "80%", fontWeight: "bold", margin: "auto 0" }}>
                                Sub-Monthly total:
                            </span>
                            ${invoicePaid && invoicePaid.subTotalMonthly}<sup>00</sup>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <span style={{ fontSize: "80%", fontWeight: "bold", margin: "auto 0" }}>
                                savings:
                            </span>
                            ${invoicePaid && invoicePaid.savings}<sup>00</sup>
                        </Grid>
                        
                    </Grid>
                </Container>
           

        </Paper>
    )
}

export default InvoiceTotal