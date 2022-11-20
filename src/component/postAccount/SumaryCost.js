import React, { useContext, useEffect, } from 'react'
import { GeneralContext } from '../../context/GeneralContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
// import { PriceContext } from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import {  Stack, Container, Paper, Typography, Grid,  Card, } from '@mui/material';
import styled from 'styled-components';
// import SummaryDesc from './SummaryDesc';
import apiProtect from '../axios/apiProtect';
import CheckOut from './CheckOut';


const SummaryCostMain = styled(Container)`
margin:2rem 0px;
background:${({ bg }) => bg};
background-size:100% 100%;
min-height:26vh;
max-height:46vh;
overflow-y:scroll;
display:flex;
justify-content:flex-start;
align-items:center;
flex-direction:column;
box-shadow:1px 2px 13px 8px ${({ color }) => color};
display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:center;


`;
const SumaryCost = () => {
    const theme = useTheme();
    
    const {  staticImage, } = useContext(GeneralContext);
    const {  user_id, loggedIn, setUsersPostService, usersPostService, usersPostInvoice, setUsersPostInvoice } = useContext(TokenAccessContext);
    const getUsersPostInvoice = usersPostInvoice.loaded ? usersPostInvoice.data : null;
    const PaperImage = `${staticImage}/homeBg1.png`

    useEffect(() => {
        const getInvoice = async () => {
            try {
                const res = await apiProtect.post('account/userAllAccounts/', { "user_id": user_id });
                const body = res.data
                setUsersPostService({ loaded: true, data: body.postService })
                setUsersPostInvoice({ loaded: true, data: body.postInvoice })
            } catch (error) {
                console.error(error.message)
            }
        }
        if (loggedIn && user_id) {
            getInvoice();
        }
    }, [loggedIn,user_id,setUsersPostService,setUsersPostInvoice])

    return (
        <>
            <SummaryCostMain bg={theme.palette.common.blueGreyLight} color={theme.palette.common.blueGreyLight}>
                <Typography component="h1" variant="h4" sx={{ margin: "1rem auto", textAlign: "center" }}>Post Account summary</Typography>
                <Stack direction={{ xs: "column", sm: "row" }}
                                spacing={{ xs: 0, sm: 1, md: 2 }}
                                sx={{ background: theme.palette.common.light, padding: "1rem",justifyContent:"center" }}>
                                <Typography component="h1" variant="h6">sub total monthly</Typography>
                                <Typography component="h1" variant="h6">${getUsersPostInvoice && getUsersPostInvoice.subTotalMonthly}.<sup>00</sup></Typography>
                                <Typography component="h1" variant="h6">total monthly</Typography>
                                <Typography component="h1" variant="h6">${getUsersPostInvoice && getUsersPostInvoice.totalMonthly}.<sup>00</sup></Typography>
                            </Stack>
                <Grid container spacing={{ xs: 0, sm: 1, md: 2 }}>
                    {usersPostService.loaded && usersPostService.data.map(obj => (
                        <Grid item xs={12} sm={6}
                        key={`${obj.id}-${Math.ceil(Math.random() * 10000)}`}
                        sx={{justifyContent:"center",alignItems:"center", display:"felx",flexDirect:"column"}}
                        >
                        <Card elevation={10} 
                            sx={{
                                margin: "auto", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
                                backgroundImage: `url(${PaperImage})`, backgroundSize: "100% 100%"
                            }}
                        >
                            

                            <Typography component="h1" variant="h4" sx={{ textAlign: "center" }}> selected</Typography>



                            <Paper elevation={20}
                                sx={{
                                    margin: "1rem auto", padding: "1rem", background: theme.palette.common.blueFade,
                                    color: "white"

                                }}>
                                <Stack direction={{ xs: 'column', sm: "row" }} spacing={{ xs: 1, md: 2 }}>
                                    <Typography component="h1" variant="h5" > service</Typography>
                                    <Typography component="h1" variant="h6" > {obj.name}</Typography>
                                    <Typography component="h1" variant="h5" > cost</Typography>
                                    <Typography component="h1" variant="h5" >$ {obj.monthly}.<sup>00</sup></Typography>
                                </Stack>
                                <Stack direction="column">
                                    <Typography component="h1" variant="h5" > description</Typography>
                                    <Typography component="h1" variant="body1" > {obj.desc}</Typography>
                                    <Typography component="h1" variant="h5" > summary</Typography>
                                    <Typography component="h1" variant="body1" > {obj.summary}</Typography>
                                </Stack>
                            </Paper>






                        </Card>
                        </Grid>
                    ))}
                </Grid>
            </SummaryCostMain>
            <CheckOut getUsersPostInvoice={getUsersPostInvoice} />
        </>
    )
}

export default SumaryCost