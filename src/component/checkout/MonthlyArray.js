import React, { useState, useEffect, useContext,useMemo } from 'react';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import {  Container, Typography, Select, MenuItem, InputLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import styles from './checkout.module.css';
// import styled from 'styled-components';

const MonthlyArray = ({isSelectedOneTime,isSelectedMonthly,loadInv}) => {
    
    const { usersInvoice,selectedPayment,setSelectedPayment } = useContext(TokenAccessContext);
    const [convertArray,setConvertArray]=useState([]);
// console.log(" usersInvoice.data",usersInvoice.data)

useMemo(()=>{
    let array=[];
    if(loadInv.monthlyArray){
        loadInv.monthlyArray.forEach((value,index)=>{
            array.push({"month":index,"value":value})
        });
        setConvertArray(array);
    }
},[setConvertArray,loadInv]);

const handleSelectedValue =(e)=>{
        e.preventDefault();
        const event=e.target.value
        console.log("event",event)
        const numPayment=convertArray.filter(obj=>(parseInt(obj.value)===parseInt(event)))[0].month
        console.log("numPayment",numPayment)
        setSelectedPayment({selected:true,value:event,numPayment:numPayment})
}

    return (
        <Container maxWidth="md"
            sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}
        >
            <InputLabel id="monthlySelect">Select Monthly payments</InputLabel>
            <Select
                type={"number"}
                labelId="monthlySelect"
                id="demo-simple-select"
                value={selectedPayment.value}
                name={selectedPayment.month}
                
                label="Age"
                onChange={(e)=>handleSelectedValue(e)}
            >
                {convertArray && convertArray.map(obj => (
                    <MenuItem key={obj.month} value={obj.value} name={obj.month} >months:{obj.month},<AttachMoneyIcon sx={{ml:2,color:"green"}}/>{obj.value}.<sup>00</sup></MenuItem>
                ))}
                
            </Select>
                    {isSelectedMonthly && !isSelectedOneTime && 
                    <Typography component="h1" varaint="body1" sx={{fontSize:"20px"}}>
                        you have selected {selectedPayment.selected && selectedPayment.numPayment} months of <AttachMoneyIcon sx={{ml:2,color:"green"}}/>{selectedPayment.selected && selectedPayment.value}.<sup>00</sup>
                    </Typography>
                    }
                    { isSelectedOneTime && 
                    <Typography component="h1" varaint="body1" sx={{fontSize:"20px"}}>
                        you have selected One Time purchase <AttachMoneyIcon sx={{ml:2,color:"green"}}/>{usersInvoice.loaded && usersInvoice.data.total}.<sup>00</sup>
                    </Typography>
                    }
        </Container>
    )
}

export default MonthlyArray