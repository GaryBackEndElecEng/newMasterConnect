import React from 'react'

// import { PriceContext } from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import {  Typography, Grid, ListItem, Fab, } from '@mui/material';
// import styles from './account.module.css';
// import styled from 'styled-components';
// import InvoiceTotal from './InvoiceTotal';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';




const ParticularsPaidTotals = ({ invoicePaid, postInvoicePaid,extraInvoicePaid,largeFormat }) => {
    //NOTE: invoicePaid and postInvoicePaid is trigger on usersInvoice.loaded=True and usersPostInvoice.loaded=True. invoicePaid.loaded and postInvoicePaid.loaded DOES NOT EXIST
    //invoicePaid,postInvoicePaid => false if not created
    const theme = useTheme();
    const getInvoice =(invoicePaid && invoicePaid.paid) ? invoicePaid : false;
    const getPostInvoice =(postInvoicePaid && postInvoicePaid.paid) ? postInvoicePaid : false;
    const activate = postInvoicePaid.paid ? true : false;
    const isExtraInvoice =(extraInvoicePaid && extraInvoicePaid.paid) ? 3 : 6;
    const adjustGrid = activate ? isExtraInvoice : 12;

    const dateFormat=(date)=>{
        let newDate= new Date(date);
        let fullYear=newDate.getFullYear();
        let day=newDate.getDate();
        let month=newDate.getMonth();
        return `${fullYear}/${month}/${day}`
    }

    return (
        <Grid container spacing={{ xs: 0, sm: 1, md: 2 }}
            sx={{margin:"1rem auto"}}
        >
            {getInvoice &&

                    <Grid item xs={12} sm={adjustGrid} lg={largeFormat} key={`${getInvoice.id}${Math.ceil(Math.random() * 1000)}`}
                    sx={{ background: theme.palette.common.blueGreyFade, color: "white",boxShadow:"1px 1px 14px 8px lightgrey",pading:"0.25rem",margin:"1rem auto" }}
                    >
                        <Typography component="h1" variant="h5" sx={{borderBottom:"1px solid white",width:"100%",padding:" 0.5rem"}}>
                        Paid account
                    </Typography>
                        <ListItem>SubTotal:  <AttachMoneyIcon sx={{ ml: 1, color: "green" }} /> {getInvoice.subTotal}</ListItem>
                        <ListItem>Total:  <AttachMoneyIcon sx={{ ml: 1, color: "green" }} /> {getInvoice.total}</ListItem>
                        <ListItem>SubTotal Monthly:  <AttachMoneyIcon sx={{ ml: 1, color: "green" }} /> {getInvoice.subTotalMonthly}</ListItem>
                        <ListItem>Total Monthly:  <AttachMoneyIcon sx={{ ml: 1, color: "green" }} /> {getInvoice.totalMonthly}</ListItem>
                        <ListItem>savings:  <AttachMoneyIcon sx={{ ml: 1, color: "green" }} /> {getInvoice.savings}</ListItem>
                        <ListItem>Number of Payments:{getInvoice.numPayment} </ListItem>
                        <ListItem>Start Date: {dateFormat(getInvoice.dateStart)}</ListItem>
                        <ListItem>End Date: {dateFormat(getInvoice.dateEnd)}</ListItem>
                    </Grid>
                
            }
            {getPostInvoice &&
                    <Grid item xs={12} sm={adjustGrid} lg={largeFormat} key={`${getPostInvoice.id}${Math.ceil(Math.random() * 1000)}`}
                    sx={{ background: theme.palette.common.blueGrey, color: "white",boxShadow:"1px 1px 14px 8px lightgrey",pading:"0.25rem",margin:"1rem auto" }}
                    >
                    <Typography component="h1" variant="h5" sx={{borderBottom:"1px solid white",width:"100%",padding:" 0.5rem"}}>
                        Paid Post account
                    </Typography>
                        <ListItem>SubTotal Monthly:  <AttachMoneyIcon sx={{ ml: 1, color: "green" }} /> {getPostInvoice.subTotalMonthly}</ListItem>
                        <ListItem>Total Monthly:  <AttachMoneyIcon sx={{ ml: 1, color: "green" }} /> {getPostInvoice.totalMonthly}</ListItem>
                        <ListItem>Number of Payments:60</ListItem>
                        <ListItem>Start Date:{dateFormat(getPostInvoice.dateStart)} </ListItem>
                        <ListItem>End Date:{dateFormat(getPostInvoice.dateEnd)} </ListItem>
                    </Grid>
            }
            {extraInvoicePaid &&
                    <Grid item xs={12} sm={adjustGrid} lg={largeFormat} key={`${extraInvoicePaid.id}${Math.ceil(Math.random() * 1000)}`}
                    sx={{ background: theme.palette.common.blueGrey, color: "white",boxShadow:"1px 1px 14px 8px lightgrey",pading:"0.25rem",margin:"1rem auto" }}
                    >
                    <Typography component="h1" variant="h5" sx={{borderBottom:"1px solid white",width:"100%",padding:" 0.5rem"}}>
                        Paid Post account
                    </Typography>
                        <ListItem>SubTotal Monthly:  <AttachMoneyIcon sx={{ ml: 1, color: "green" }} /> {extraInvoicePaid.subTotalMonthly}</ListItem>
                        <ListItem>Total Monthly:  <AttachMoneyIcon sx={{ ml: 1, color: "green" }} /> {extraInvoicePaid.totalMonthly}</ListItem>
                        <ListItem>Number of Payments:60</ListItem>
                        <ListItem>Start Date:{dateFormat(extraInvoicePaid.dateStart)} </ListItem>
                        <ListItem>End Date:{dateFormat(extraInvoicePaid.dateEnd)} </ListItem>
                    </Grid>
            }
        </Grid>


    )
}

export default ParticularsPaidTotals