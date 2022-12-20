import React, { useContext,} from 'react';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Grid, Card, CardContent, Avatar,Fab } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import styled from 'styled-components';
import apiProtect from '../axios/apiProtect';
import { useEffect } from 'react';

const CustCard=styled(Card)`
position:absolute;
margin:auto;
top:40%;
margin-left:25%;
background:${({bg})=>bg};
color:white;
z-index:10000;
max-width:50%;
animation: growIn 1.5s ease-in-out;
@keyframes growIn {
    from {opacity:0;}
    to {opacity:1;}
}
@media screen and (max-width:600px){
    max-width:100%;
    margin-left:0px;
    top:70%;
}

`;

const CheckOutExtra = ({ usersExtraService,staticImage }) => {
    const theme = useTheme();
    const { user_id,setUsersExtraInvoice,loggedIn,usersExtraInvoice } = useContext(TokenAccessContext);
    const { serverUrl,} = useContext(GeneralContext);
    const logo = "https://new-master.s3.ca-central-1.amazonaws.com/static/logo.png";
    const getUsersExtraServices = usersExtraService.loaded ? usersExtraService.data : null;
    const getUsersExtraInvoice = usersExtraInvoice.loaded ? usersExtraInvoice.data : null;
    const getUser_id=localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")):user_id;
    const getLoggedIn=localStorage.getItem("loggedIn") ? JSON.parse(localStorage.getItem("loggedIn")):loggedIn;

    useEffect(()=>{
        const getFinaleExtraInvoice= async()=>{
            try {
                const res= await apiProtect.post("account/getExtraInvoiceForCheckOut/",{"user_id":getUser_id});
                 const user_extraInvoice= res.data;
                 setUsersExtraInvoice({loaded:true,data: user_extraInvoice});

            } catch (error) {
                console.error(error.message)
            }
        }
        if(getLoggedIn){
            getFinaleExtraInvoice();
        }
    },[]);

    return (
        <CustCard bg={theme.palette.primary.dark} elevation={20} sx={{boxShadow:"1px 1px 18px 8px grey"}}>
            <Stack direction="column" spacing={{xs:1,sm:2,md:3}}
                sx={{ justifyContent: "center", alignItems: "center", width: "100%", position: "relative", margin: "1rem auto" }}
            >
                <Avatar src={logo} alt="www.master-connect.ca" sx={{ width: "20%",height:"20%" ,margin: "auto" }} />
                <Typography component="h1" varaint="h3" sx={{ textAlign: "center", fontWeight: "bold", margin: "auto" }}>Your Choosen Extras</Typography>

            </Stack>

            <form method="POST" action={`${serverUrl}/account/extraService/checkout/${user_id}/`} >
                <CardContent>
                    <Grid container spacing={{ xs: 0, sm: 1, md: 1 }}>
                        {getUsersExtraServices && getUsersExtraServices.map(obj => (

                            <Grid item xs={12} sm={6} key={`${obj.key}-${Math.ceil(Math.random() * 1000)}`}
                                sx={{ margin: " 1rem auto" }}>
                                    <Stack direction="row" spacing={{xs:0,sm:1,md:2}} sx={{alignItems:"flex-start"}}>
                                    <Avatar src={`${staticImage}/${obj.image}`} alt="www.master-connect.ca" sx={{ width: "20%",height:"20%" ,margin: "auto" }} />
                                    <Typography component='h1' variant="h5"> Extra: {obj.name}</Typography>
                                    </Stack>
                                
                            </Grid>
                        ))}
                        {getUsersExtraInvoice &&
                            <Grid item xs={12} sm={12} sx={{justifyContent:"center",alignItems:"center", display:"flex"}}>
                                <Typography component="h1" variant="h5">total:<AttachMoneyIcon />{getUsersExtraInvoice.totalMonthly}.<sup>00</sup>  monthly</Typography>
                            </Grid>
                        }

                    </Grid>

                </CardContent>
                <Stack direction="column" sx={{ adjustContent: "center", alignItems: "center", width: "50%", margin: "1rem auto" }}>
                    <Fab variant="extended" color="primary" type="submit" sx={{ margin: "auto" }}>
                        Purchase <ShoppingCartCheckoutIcon sx={{ color: "red", ml: 1 }} />
                    </Fab>
                </Stack>
            </form>
        </CustCard>
    )
}

export default CheckOutExtra