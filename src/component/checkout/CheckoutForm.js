import React, { useContext, useState, useEffect } from 'react';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { Stack, Container, Paper, Typography, Card, CardContent, CardMedia, Fab, ListItem, Grid, Avatar } from '@mui/material';
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
@media screen and (max-width:900px){
transform:translateX(-0%);
}
@media screen and (max-width:800px){
transform:translateX(-5%);
}
@media screen and (max-width:600px){

}
@media screen and (max-width:400px){
    transform:translateX(1%);
}

`;
const CheckoutForm = () => {
    // const theme = useTheme();
    // const navigate=useNavigate();
    const { user_id, setSentToServer, loggedIn, usersService, usersProduct } = useContext(TokenAccessContext);
    const { setChangePage, serverUrl, staticImage } = useContext(GeneralContext);
    const [getInvoice, setGetInvoice] = useState([]);
    const getSelectedPayment = getInvoice ? getInvoice : null;
    const getLoggedIn = localStorage.getItem("loggedIn") ? JSON.parse(localStorage.getItem("loggedIn")) : loggedIn;
    const serverUrl1 = "http://localhost:8000/api"

    useEffect(() => {

        const pullInvoice = async () => {
            try {
                const res = await apiProtect.post('/account/invoice/', { "user_id": user_id });
                const user_invoice = res.data;
                setGetInvoice(user_invoice);
                
            } catch (error) {
                console.error(error.message)
            }
        }
        if (getLoggedIn) {
            pullInvoice();
        }

    }, []);

    const handleActions = () => {
        setSentToServer(true);
        setChangePage(true);
    }

    return (
        <SpecialContainer maxWidth="md"
            sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "100%" }}
        >
            <Card elevation={10} sx={{ width: "100%", position: "relative", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "1rem", border: "1px solid black", }}>

                <form method="POST" action={`${serverUrl}/account/stripe/payment/${user_id}`} >
                    <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                        <Typography component="h1" varaint="h4"
                            sx={{
                                textAlign: "center", fontWeight: "bold", margin: "1rem auto",
                            }}>
                            Your Products
                        </Typography>

                        <Paper elevation={20} sx={{ padding: "1rem", margin: "auto 2rem", width: "100%", textAlign: "center" }}>

                            <Grid container spacing={{ xs: 0, sm: 1 }}>
                                {(usersProduct.loaded && usersProduct.data !== null) && usersProduct.data.map(obj => (
                                    <Grid item xs={12} sm={6} md={4} key={obj.id}
                                        sx={{ margin: "auto" }}>
                                        <Card sx={{ padding: "0.5rem",border:"1px solid grey" }}>
                                            <Avatar src={`${staticImage}/${obj.imageName}`} alt="www.master-connect.ca" />
                                            <Typography component="h1" variant="h6">{obj.name}</Typography>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>

                        </Paper>

                        <Typography component="h1" varaint="h4" sx={{ textAlign: "center", fontWeight: "bold", margin: "1rem auto" }}>Your Services</Typography>
                        <Paper elevation={20} sx={{ padding: "1rem" }}>
                            <Stack direction={{ xs: "column", sm: "column" }} spacing={1}
                                sx={{ alignItems: "center", justifyContent: "center", padding: "1rem", margin: "auto 2rem" }}
                            >
                                <Grid container spacing={{ xs: 0, sm: 1 }} sx={{ margin: "1rem auto" }}>
                                    {(usersService.loaded && usersService.data !== null) && usersService.data.map(obj => (
                                        <Grid item xs={12} sm={6} md={4} key={obj.id}
                                            sx={{ margin: "auto" }}>
                                            <Card sx={{ padding: "0.5rem",border:"1px solid grey" }}>
                                                <Avatar src={`${staticImage}/${obj.image}`} alt="www.master-connect.ca" />
                                                <Typography component="h1" variant="h6">{obj.name}</Typography>
                                            </Card>
                                        </Grid>

                                    ))}
                                </Grid>

                            </Stack>
                        </Paper>
                        <Stack direction="column">
                            <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ display: "flex", justifyContent: "center", marginTop: "1rem", marginBottom: "1rem" }}>
                                {getSelectedPayment && getSelectedPayment.numPayment === 1 ?

                                    <div> total:<AttachMoneyIcon />{getSelectedPayment && getSelectedPayment.total}.<sup>00</sup></div>
                                    :
                                    <Stack direction="column" spacing={1}>
                                        <div>subTotal:<AttachMoneyIcon />{getSelectedPayment && getSelectedPayment.subTotalMonthly}.<sup>00</sup></div>
                                        <div>total:<AttachMoneyIcon />{getSelectedPayment && getSelectedPayment.totalMonthly}.<sup>00</sup> for {getSelectedPayment && getSelectedPayment.numPayment} months</div>
                                        
                                    </Stack>

                                }
                            </Stack>
                            <Fab variant="extended" color="primary" type="submit" onClick={() => handleActions()} >
                                Purchase <PaymentsIcon sx={{ color: "red", ml: 1 }} />
                            </Fab>
                        </Stack>
                        <small style={{marginTop:"1rem",fontSize:"75%"}}> 3% interest per year is added as industry standard</small>
                        <small style={{marginTop:"1rem",fontSize:"75%"}}> administration duties is not added - our service to you.</small>
                    </CardContent>
                </form>
            </Card>

        </SpecialContainer>
    )
}

export default CheckoutForm