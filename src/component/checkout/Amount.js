import React, { useContext, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
// import { PriceContext } from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import {  Stack, Container, Typography, Grid, Fab } from '@mui/material';
// import styles from './checkout.module.css';
// import styled from 'styled-components';
import apiProtect from '../axios/apiProtect';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaymentIcon from '@mui/icons-material/Payment';
import ShowAmounts from './ShowAmounts';
import Particulars from './Particulars';
import AddCardIcon from '@mui/icons-material/AddCard';




const Amount = () => {
    const theme=useTheme();
    const { usersInvoice,setUsersInvoice,userAccount,setUserAccount,user_id,setUser_id,loggedIn,selectMonthlyValue,setShowCheckout,selectedPayment,staticImage } = useContext(TokenAccessContext);
    const [clientMustSelectMonthlyPayment,setClientMustSelectMonthlyPayment]=useState(false);
    const [isSelectedOneTime,setIsSelectedOneTime] =useState(false);
    const [isSelectedMonthly,setIsSelectedMonthly] =useState(false);
    const {  url } = useContext(GeneralContext);
    // const imgCheckout2=`${staticImage}/checkout2.png`;
    const imgCheckout2=`https://new-master.s3.ca-central-1.amazonaws.com/static/checkout2.png`;
    const imgCheckout3=`${staticImage}/checkout3.png`;
    const userID= typeof(parseInt(user_id))==='number' ? user_id : parseInt(localStorage.getItem("user_id"));
    const getLoggedIn= loggedIn ? loggedIn: JSON.parse(localStorage.getItem("loggedIn"));
    const getSelectedPayment= selectedPayment ? selectedPayment:null;



    const handleMonthly = (e)=>{
        setUser_id(userID)

        const sendMonthly= async ()=>{
            const params={"user_id":user_id,"totalMonthly":getSelectedPayment.value,"numPayment":getSelectedPayment.numPayment,"total":null};
        try {
           
            const res= await apiProtect.post("/account/payment/",params)
            const body = res.data
            setShowCheckout(true);
            setIsSelectedOneTime(false);
            setIsSelectedMonthly(true);
            localStorage.setItem("userAccount",JSON.stringify(userAccount.data))
        } catch (error) {
            console.error(error.message)
        }
    }
    if((selectedPayment.selected && !isSelectedOneTime) && (user_id && getLoggedIn)){
        sendMonthly();
    }else{
        setClientMustSelectMonthlyPayment(true);
        setIsSelectedOneTime(false);
        setShowCheckout(false);
        setTimeout(()=>{
            setClientMustSelectMonthlyPayment(false)
        },5000)
    }
    }
    const handleOneTime=(e)=>{
        e.preventDefault();
        
        const params={"user_id":user_id,"totalMonthly":null,"numPayment":1 ,"total":usersInvoice.data.total};
        const sendOneTime= async ()=>{
        try {
            //GETTING PUBLICKEY
            const res= await apiProtect.post("/account/payment/",params)
            const body = res.data
            setUserAccount({data:body,loaded:true})
            setUsersInvoice({loaded:true,data:body.invoice})
            setShowCheckout(true);
            setIsSelectedOneTime(true);
            setIsSelectedMonthly(false);
            
        } catch (error) {
            console.error(error.message)
        }
    }
    if((userID && getLoggedIn) && !isSelectedMonthly){
        sendOneTime();
    }

    }
    const handle5Year=(e)=>{
        e.preventDefault();
        
        const params={"user_id":user_id,"numPayment":60 ,"totalMonthly":usersInvoice.data.totalMonthly,"total":null};
        const fiveYearMonthly= async ()=>{
        try {
            //GETTING PUBLICKEY
            const res= await apiProtect.post("/account/payment/",params)
            const body = res.data
            setUserAccount({data:body,loaded:true})
            setUsersInvoice({loaded:true,data:body.invoice})
            // console.log(body.invoice)
            setShowCheckout(true);
            setIsSelectedOneTime(true);
            setIsSelectedMonthly(true);
            
        } catch (error) {
            console.error(error.message)
        }
    }
    if((user_id && getLoggedIn)){
        fiveYearMonthly();
    }

    }
  return (
       <Container maxWidth="lg"
                sx={{
                    margin: " 2rem auto", marginTop: {sm:"2rem",xs:"2rem",md:"3rem"}, background: theme.palette.sand, color: "white",
                    display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",
                }}>

                <Typography component="h1" variant="h4"
                    sx={{
                        textAlign: "center", margin: "auto",
                    }}>
                    Account
                </Typography>

                <Particulars userAccount={userAccount}/>

                <Grid container spacing={0} sx={{ margin: "0px",padding:"1rem " ,}}>
                    <Grid item xs={12} md={4} sx={{  backgroundImage: `url(${imgCheckout2})`, backgroundSize: "100% 100%",minHeight:"20vh",position:"relative",justifyContent:"center",alignItems:"center" }}>
                    
                        <Typography component="h1" variant="h5"
                            sx={{
                                textAlign: "center", margin: "auto",padding:"0 1rem",marginTop:"4rem",color:theme.palette.common.background
                            }}>
                            Onetime purchase.
                        </Typography>
                        <Fab variant="extended" color={"success"} onClick={(e)=>handleOneTime(e)}
                        sx={{position:"absolute",top:{md:"30%",sm:"2%",xs:"2%"},margin:"0.25rem",left:{md:"26%",sm:"40%",xs:"26%"}}}
                        >
                            One time
                                <AttachMoneyIcon sx={{ml:2, color:"red"}}/>
                        </Fab>
                        
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ margin:"auto 0px",display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding:{md:"0.5rem",xs:"0px"},background:theme.palette.aqua }}>

                        <ShowAmounts 
                        usersInvoice={usersInvoice}
                        isSelectedOneTime={isSelectedOneTime}
                        selectedPayment={selectedPayment}
                        isSelectedMonthly={isSelectedMonthly}
                        clientMustSelectMonthlyPayment={clientMustSelectMonthlyPayment}
                        />

                    </Grid>
                    <Grid item xs={12} md={4} sx={{ backgroundImage: `url(${imgCheckout2})`, backgroundSize: "100% 100%",minHeight:"20vh",position:"relative" }}>
                        <Typography  component="h1" variant="h5"
                            sx={{
                                textAlign: "center", margin: "auto",marginTop:{sm:"4rem",xs:"4rem"},transform:{xs:"translateY(-20%)"},padding:"0 1rem",color:theme.palette.common.background

                            }}>
                            Monthly payments
                        </Typography>
                        <Fab variant="extended" color={"success"} onClick={(e)=>handleMonthly(e)}
                         sx={{position:"absolute",top:{md:"30%",sm:"2%",xs:"2%"},margin:"0.25rem",left:{md:"26%",sm:"40%",xs:"26%"}}}
                        >
                            monthly
                                <PaymentIcon sx={{ml:2, color:"red"}}/>
                        </Fab>
                        
                    </Grid>
                </Grid>
                <Stack direction="column" sx={{justifyContent:"center",alignItems:"center",margin:"2rem auto"}}>
                            <Typography component="h1" variant="h5" sx={{margin:"1rem auto"}}>${usersInvoice.data.totalMonthly}.<sup>00</sup> monthly</Typography>
                    <Fab variant="extended" color="success" onClick={(e)=>handle5Year(e)}>
                        5 year monthly <AddCardIcon sx={{ml:1,color:"white"}}/>
                    </Fab>
                </Stack>
                
            </Container>
           
            

  )
}

export default Amount