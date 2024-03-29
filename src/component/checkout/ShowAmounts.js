import React from 'react'

import { useTheme } from '@mui/material/styles';
import {  Stack, Container, Paper, Typography, Grid,} from '@mui/material';
import styles from './checkout.module.css';
// import styled from 'styled-components';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NorthIcon from '@mui/icons-material/North';
import MonthlyArray from './MonthlyArray';
import SubMonthlyCalc from './SubMonthlyCalc';


const ShowAmounts = ({loadInv,isSelectedOneTime,selectedPayment,isSelectedMonthly,clientMustSelectMonthlyPayment}) => {
    const theme=useTheme();


  return (
    <Container maxWidth="sm" sx={{ margin:"auto 0px",display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding:{md:"0.5rem",xs:"0px"},background:theme.palette.common.mediumBlue }}>
                        <Paper  elevation={10} component="div" sx={{ margin: "1rem 5px",padding:"1rem 5px",width:"100%",background:"white" ,boxShadow:"1px 3px 15px black,-1px -3px 15px black"}}>
                            <Typography component="h1" variant="h5"
                                sx={{
                                    textAlign: "center", margin: " 1rem auto",color:theme.palette.common.teal
                                }}>
                                One Time
                                </Typography>
                                <Grid container spacing={0} sx={{margin:"1rem auto",padding:"0.5rem"}}>
                                    <Grid item xs={12} sm={6} sx={{width:"100%",textAlign:"center"}}>
                                        <Typography component="div" variant="h6">
                                            <span style={{ fontSize: "50%", color: "blue" }}>subTot:</span><AttachMoneyIcon sx={{ ml: 0, color: "green",fontSize:"90%" }} />{loadInv && loadInv.subTotal}.<sup>00</sup>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} sx={{width:"100%",textAlign:"center"}}>
                                        <Typography component="div" variant="h6">
                                            <span style={{ fontSize: "50%", color: "blue", }}>total:</span><AttachMoneyIcon sx={{ ml: 0, color: "green",fontSize:"90%" }} />{loadInv && loadInv.total}.<sup>00</sup>
                                        </Typography>
                                        <Typography component="h1" variant="subtitle1"> tax included</Typography>
                                    </Grid>
                                </Grid>
                            <Typography component="h1" variant="h5"
                                sx={{
                                    textAlign: "center", margin: " 1rem auto",color:theme.palette.common.blueGrey
                                }}>
                                Monthly
                                </Typography>
                                <Grid container spacing={0} sx={{margin:"1rem auto",padding:"0.5rem",color:theme.palette.common.teal}}>
                                    <Grid item xs={12} sm={6} sx={{width:"100%",textAlign:"center"}}>
                                        <Typography component="div" variant="h6">
                                            <span style={{ fontSize: "50%", color: "blue" }}>subTot:</span><AttachMoneyIcon sx={{ ml: 0, color: "red",fontSize:"90%" }} /><SubMonthlyCalc loadInv={loadInv}/>.<sup>00</sup>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} sx={{width:"100%",textAlign:"center"}}>
                                        <Typography component="div" variant="h6">
                                            <span style={{ fontSize: "50%", color: "blue", }}>total:</span><AttachMoneyIcon sx={{ ml: 0, color: "red",fontSize:"90%" }} />{ selectedPayment.value}.<sup>00</sup>
                                        </Typography>
                                        <Typography component="h1" variant="subtitle1"> tax included</Typography>
                                    </Grid>
                                </Grid>
                                <Stack direction="column">
                                    <MonthlyArray isSelectedOneTime={isSelectedOneTime} isSelectedMonthly={isSelectedMonthly} loadInv={loadInv}/>
                                </Stack>
                                <Stack direction="column" sx={{position:"relative"}}>
                                    {clientMustSelectMonthlyPayment && 
                                    <Typography component="h1" variant="h4" className={styles.selectMonthlyWarning}
                                    sx={{fontFamily:"Roboto"}}>
                                        Please select the monthly payment from the dropdown, above <NorthIcon sx={{fontSize:"40px",color:"red"}}/>
                                    </Typography>
                                    }
                                </Stack>
                            
                        </Paper>
                    </Container>
  )
}

export default ShowAmounts