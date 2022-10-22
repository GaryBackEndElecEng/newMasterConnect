import React, {  useState, useMemo,useCallback } from 'react';
import {Container, Paper, Grid,  } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import styles from './account.module.css';
// import styled from 'styled-components';

const InvoiceTotal = ({usersProduct,usersService}) => {
    const theme = useTheme();
   
    const [total,setTotal]=useState(0);
    const [totalMonthly,setTotalMonthly]=useState(0);


    const getTotal = useMemo(()=>{
        //COMPUTES TOTAL PRODUCT AND SERVICE
        
            const getUsersProduct = usersProduct.loaded ? usersProduct.data:[];
            const getUsersService = usersService.loaded  ? usersService.data:[] ;
            let total1=0,totalMonthly1=0;
            if(getUsersProduct){
                const totalPrice=getUsersProduct.map(obj=>(obj.price)).reduce((a,b)=>(a+b),0);
                const totalMonthPrice=getUsersProduct.map(obj=>(obj.monthly)).reduce((a,b)=>(a+b),0);
                
                total1 = total1 + totalPrice
                totalMonthly1 = totalMonthly1 + totalMonthPrice
            }
            if(getUsersService){
                const totalPrice2=getUsersService.map(obj=>(obj.price)).reduce((a,b)=>(a+b),0);
                const totalMonthPrice2=getUsersService.map(obj=>(obj.monthly)).reduce((a,b)=>(a+b),0);
                
                total1 = total1 + totalPrice2
                totalMonthly1 = totalMonthly1 + totalMonthPrice2
            }
            setTotal(total1);setTotalMonthly(totalMonthly1)
            return [total1,totalMonthly1];
            
           
            
    },[usersProduct.loaded,usersService.loaded,usersProduct.data,usersService.data,setTotal,setTotalMonthly]);

   
    
//    console.log(getTotal[0])

    return (
        <Paper component="div" elevation={3} sx={{ background: theme.palette.common.light,margin:"auto" }}>

            
                <Container maxWidth="md" sx={{padding:"1rem"}}>
                    <Grid container spacing={2} >
                        <Grid item xs={6} md={6}>
                            <span style={{ fontSize: "80%", fontWeight: "bold", margin: "auto 0" }}>
                                Subtotal:
                            </span>
                            ${Math.floor(getTotal[0])}<sup>00</sup>
                        </Grid>
                        
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={6}>
                            <span style={{ fontSize: "80%", fontWeight: "bold", margin: "auto 0" }}>
                                Sub-Monthly total:
                            </span>
                            ${Math.floor(getTotal[1])}<sup>00</sup>
                        </Grid>
                        
                    </Grid>
                </Container>
           

        </Paper>
    )
}

export default InvoiceTotal