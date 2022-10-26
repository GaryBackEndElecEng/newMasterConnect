import React, { useContext, useState,useEffect } from 'react';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import {GeneralContext} from '../../context/GeneralContextProvider';
import { Stack, Container, Paper, Typography, Card, CardContent, CardMedia, Fab, ListItem } from '@mui/material';
import styled from 'styled-components';
import apiProtect from '../axios/apiProtect';
import PaymentsIcon from '@mui/icons-material/Payments';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const SpecialContainer = styled(Container)`
animation: growIn 1.5s ease-in-out;
width:100%;
padding:0.5rem;
@keyframes growIn {
    from {transform:scale(0);}
    to {transform:scale(1);}
}

`;
const CheckoutForm = () => {
    // const theme = useTheme();
    // const navigate=useNavigate();
    const { userAccount,user_id, setSentToServer,loggedIn } = useContext(TokenAccessContext);
    const {setChangePage,serverUrl,staticImage}=useContext(GeneralContext);
    const initializegetInvoice={loaded:false,data:{}};
    Object.freeze(initializegetInvoice);
    const [getInvoice,setGetInvoice]=useState(initializegetInvoice);
    const clientProdImgs= userAccount.loaded ? userAccount.data.product.map(obj=>(`${staticImage}/${obj.imageName}`)):null; 
    const clientServices= userAccount.loaded ? userAccount.data.service.map(obj=>(obj.name)):null; 
    const clientProducts= userAccount.loaded ? userAccount.data.product.map(obj=>(obj.name)):null; 
    const getSelectedPayment= getInvoice.loaded ? getInvoice.data:null;
    const getLoggedIn = localStorage.getItem("loggedIn") ? JSON.parse(localStorage.getItem("loggedIn")) :loggedIn;
    

     useEffect(()=>{

        const pullInvoice = async ()=>{
            try {
                const res = await apiProtect.post('/account/invoice/',{"user_id":user_id});
                const body = res.data;
                setGetInvoice({loaded:true,data:body})
            } catch (error) {
                console.error(error.message)
            }
        }
            if(getLoggedIn){
            pullInvoice();
            }
        
    },[getLoggedIn]);
    
    const handleActions= ()=>{
        setSentToServer(true);
        setChangePage(true);
    }

    
    return (
        <SpecialContainer maxWidth="md"
            sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "center",width:"100%" }}
        >
            <Card elevation={10} sx={{ width: "100%",position:"relative" ,display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",padding:"1rem",border:"1px solid black"}}>
               {clientProdImgs && clientProdImgs.map(obj=>(
                
                <CardMedia key={obj} component="img" image={obj} alt="www.master-connect.ca" sx={{width:"50%", height:"50%",margin:"auto"}}/>))}
               <form method="POST" action={`${serverUrl}/account/stripe/payment/${user_id}` } >
                <CardContent>
                <Typography component="h1" varaint="h4" sx={{textAlign:"center",fontWeight:"bold",margin:"1rem auto"}}>Your Products</Typography>
                <Paper elevation={20}>
                    <Stack direction={{xs:"column",sm:"row"}} spacing={1}>
                        
                   {clientProducts && clientProducts.map(obj=>(
                    <ListItem key={obj}
                    sx={{margin:"auto"}}>
                        {obj}
                    </ListItem>
                   ))}
                   </Stack>
                   </Paper>
                <Typography component="h1" varaint="h4" sx={{textAlign:"center",fontWeight:"bold",margin:"1rem auto"}}>Your Services</Typography>
                <Paper elevation={20}>
                    <Stack direction={{xs:"column",sm:"row"}} spacing={1}>
                        
                   {clientServices && clientServices.map(obj=>(
                    <ListItem key={obj}
                    sx={{margin:"auto"}}>
                        {obj}
                    </ListItem>

                   ))}
                   
                   </Stack>
                   </Paper>
                <Stack direction="column">
                    <Stack direction={{xs:"column",sm:"row"}} spacing={1} sx={{display:"flex",justifyContent:"center",marginTop:"1rem",marginBottom:"1rem"}}>
                        {getSelectedPayment && getSelectedPayment.numPayment===1 ? 
                        
                        <div> total:<AttachMoneyIcon/>{getSelectedPayment && getSelectedPayment.total}.<sup>00</sup></div>
                        :
                        <Stack direction="column" spacing={1}>
                        <div>subTotal:<AttachMoneyIcon/>{getSelectedPayment && getSelectedPayment.subTotalMonthly}.<sup>00</sup></div>
                        <div>total:<AttachMoneyIcon/>{getSelectedPayment && getSelectedPayment.totalMonthly}.<sup>00</sup> for {getSelectedPayment && getSelectedPayment.numPayment} months</div>
                        </Stack>

                    }
                    </Stack>
                    <Fab variant="extended" color="primary" type="submit" onClick={()=>handleActions()} >
                        Purchase <PaymentsIcon sx={{color:"red",ml:1}}/>
                    </Fab>
                </Stack>
                
                </CardContent>
                </form>
            </Card>

        </SpecialContainer>
    )
}

export default CheckoutForm