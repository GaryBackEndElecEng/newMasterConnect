import React, { useContext, useEffect, useState, useMemo, useRef } from 'react'
import { GeneralContext } from '../../context/GeneralContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Container, Paper, Typography, Grid, ListItem, Fab, Card, CardContent,CardActions,} from '@mui/material';
import styled from 'styled-components';
import PaymentsIcon from '@mui/icons-material/Payments';
import apiProtect from '../axios/apiProtect';


const CheckOut = ({getUsersPostInvoice}) => {
    const theme = useTheme();
    const { user_id, } = useContext(TokenAccessContext);
    const {serverUrl} = useContext(GeneralContext);
   

    // console.log(getUsersPostInvoice)


  return (
    <Container maxWidth="lg">
        <Stack direction="column" sx={{textAlign:"center",margin:"1rem auto"}}>
            { getUsersPostInvoice &&  <Paper elevation={20}>
            <form className="form-control" method='POST' action={`${serverUrl}/account/postCheckout/${user_id}`}>
            <Typography component="h1" variant="h6">sub total monthly</Typography>
                <Typography component="h1" variant="h6">${getUsersPostInvoice && getUsersPostInvoice.subTotalMonthly}.<sup>00</sup></Typography>
                <Typography component="h1" variant="h6">total monthly</Typography>
                <Typography component="h1" variant="h6">${getUsersPostInvoice && getUsersPostInvoice.totalMonthly}.<sup>00</sup></Typography>
                <Fab variant="extended" color="success" type="submit">
                    Checkout <PaymentsIcon sx={{ml:1,color:"red"}}/>
                </Fab>
                <Typography component="h1" variant="h5" sx={{margin:"1rem auto"}}>Date End:{getUsersPostInvoice && getUsersPostInvoice.dateEnd}</Typography>
            </form>
            </Paper>}
        </Stack>
    </Container>
  )
}

export default CheckOut