import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Stack, Container, Paper, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import styles from './consult.module.css';
import styled from 'styled-components';
import apiProtect from '../axios/apiProtect';
import ParticularsPaidTotals from '../account/ParticularsPaidTotals';
import AmountOneTimeMonthly from './AmountOneTimeMonthly';

const MoveImg = styled.img`
display:block;
position:absolute;
top:5%;
left:-90%;
width:calc(${window.innerWidth / 3}px  );
opacity:0.3;
animation:moveInPlace 6s ease-in;

@keyframes moveInPlace {
    from {opacity:0; transform:translateX(50%);}
    50 {opacity:1; transform:translateX(0%);}
    to {opacity:0.3;}
}
@media screen and (max-width:850px){
    opacity:1;
    top:9%;
    left:calc(${window.innerWidth / 2}px - 65%);
    width:calc(${window.innerWidth / 2}px + 1% );

    @keyframes moveInPlace {
        from {opacity:0; transform:translateX(100%);}
        50% {opacity:.75; transform:translateX(0%);}
        to {opacity:1;}
    }
}
@media screen and (max-width:400px){
    opacity:1;
    top:30%;
    left:calc(${window.innerWidth / 2}px - 85%);
    width:calc(${window.innerWidth / 2}px + 15% );

    @keyframes moveInPlace {
        from {opacity:0; transform:translateX(100%);}
        50% {opacity:.75; transform:translateX(0%);}
        to {opacity:1;}
    }
}
`;
const DisplayLeftMsg = styled(Typography)`
display:${({ display }) => display};
transform:translateY(75%);
animation:moveLeftAndShow 1.5s ease-in;
color:white;
@keyframes moveLeftAndShow {
    from {opacity:0; transform:translateY(250%);}
    to {opacity:1; transform:translateY(90%);}
}
`;
const DisplayRightMsg = styled(Typography)`
display:${({ display }) => display};
transform:translateY(90%);
margin:2rem;
animation:moveRightAndShow 1.5s ease-in;
color:white;
@keyframes moveRightAndShow {
    from {opacity:0; transform:translateY(250%);}
    to {opacity:1; transform:translateY(90%);}
}
`;

const Amount = ({ invoicePaid, postInvoicePaid, usersInvoice,extraInvoicePaid }) => {
    const theme = useTheme();
    const { userAccount } = useContext(TokenAccessContext);
    const { staticImage } = useContext(GeneralContext);
    const getUsersInvoice1 = usersInvoice.loaded ? usersInvoice.data : null;
    const [leftActivate, setLeftActivate] = useState(false);
    const [rightActivate, setRightActivate] = useState(false);
    const imgConsult = `${staticImage}/consult.png`;
    const imgConsult1 = `${staticImage}/consult1.png`;
    const imgConsult2 = `${staticImage}/consult2.png`;
    const turnOnLeftPhrase = leftActivate ? "block" : "none";
    const turnOnRightPhrase = rightActivate ? "block" : "none";
    const isExtra= extraInvoicePaid.paid ? 4 : 6;
    const largeFormat =isExtra;

    useEffect(() => {
        setTimeout(() => {
            setLeftActivate(true);
        }, 6000)
        setTimeout(() => {
            setRightActivate(true);
        }, 8000)
    }, []);
 


    return (
        <Container maxWidth="lg"
            sx={{
                margin: " 2rem auto", marginTop: { sm: "2rem", xs: "2rem", md: "3rem" }, background: theme.palette.common.background3, color: theme.palette.common.light,
                display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",
            }}>

            <Typography component="h1" variant="h4"
                sx={{
                    textAlign: "center", margin: "auto",
                }}>
                Account
            </Typography>
            <Stack direction="column">
                <Typography component="h1" variant="body2"
                    sx={{
                        textAlign: "center", margin: "auto",
                    }}>
                    {userAccount.loaded && userAccount.data.name}
                </Typography>
                <Typography component="h1" variant="body2"
                    sx={{
                        textAlign: "center", margin: "auto",
                    }}>
                    {userAccount.loaded && userAccount.data.email}
                </Typography>
                <Typography component="h1" variant="body2"
                    sx={{
                        textAlign: "center", margin: "auto",
                    }}>
                    {userAccount.loaded && userAccount.data.address}
                </Typography>
                <Typography component="h1" variant="body2"
                    sx={{
                        textAlign: "center", margin: "auto",
                    }}>
                    {userAccount.loaded && userAccount.data.cell}
                </Typography>
            </Stack>
            <Grid container spacing={0} sx={{ margin: "0px", padding: "0.5rem ", }}>
                <Grid item xs={12} md={3} sx={{ backgroundImage: `url(${imgConsult1})`, backgroundSize: "100% 100%", minHeight: "20vh", position: "relative" }}>
                    <MoveImg src={imgConsult2} alt="www.master-connect.ca" />
                    <DisplayLeftMsg display={turnOnLeftPhrase} component="h1" variant="h4"
                        sx={{
                            textAlign: "center", margin: "auto", padding: "0 1rem"
                        }}>
                        Your info has been sent to us.
                    </DisplayLeftMsg>

                </Grid>
                <Grid item xs={12} md={6} sx={{ margin: "auto 0px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: { md: "0.25rem", xs: "0px" }, }}>
                    {(usersInvoice.loaded && !usersInvoice.data.paid) && <AmountOneTimeMonthly usersInvoice={usersInvoice} />}
                    {(usersInvoice.loaded && usersInvoice.data.paid) && <ParticularsPaidTotals
                     invoicePaid={invoicePaid}
                      postInvoicePaid={postInvoicePaid} 
                      largeFormat={largeFormat}
                      extraInvoicePaid={extraInvoicePaid}
                      />}
                </Grid>
                <Grid item xs={12} md={3} sx={{ backgroundImage: `url(${imgConsult})`, backgroundSize: "100% 100%", minHeight: "20vh" }}>
                    <DisplayRightMsg display={turnOnRightPhrase} component="h1" variant="h5"
                        sx={{
                            textAlign: "center", margin: "auto", marginTop: { sm: "1rem", xs: "3rem" }, transform: { xs: "translateY(-20%)" }, padding: "0 1rem"

                        }}>
                        Just a few questions, below before we call you.
                    </DisplayRightMsg>
                    <DisplayRightMsg display={turnOnRightPhrase} component="h1" variant="h5"
                        sx={{
                            textAlign: "center", margin: "1rem auto", marginTop: { sm: "2rem", xs: "3rem" }, transform: { xs: "translateY(-10%)" }, padding: "0 1rem"

                        }}>
                        Thank you for your patience.
                    </DisplayRightMsg>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Amount