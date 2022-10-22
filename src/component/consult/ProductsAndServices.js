import React, { useContext, useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import {  Stack, Container, Paper, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import styles from './consult.module.css'

const ProductsAndServices = () => {
    const theme = useTheme();
    const {  usersProduct, usersService, } = useContext(TokenAccessContext);
    const { setChangePage,staticImage } = useContext(GeneralContext);
    const [show,setShow]=useState(false);
    const getUsersProducts = usersProduct.loaded ? usersProduct.data : JSON.parse(localStorage.getItem("usersProducts"));
    const getUsersServices = usersService.loaded ? usersService.data : JSON.parse(localStorage.getItem("usersServices"));

        let observer=new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if(entry.isIntersecting){
                    setShow(true)
                    // console.log("show",show)
                }else{setShow(false)};
            });
        },{threshold:0.5})

    const getTarget=(ele)=>{
        if(ele){
        observer.observe(ele);
        }
    }
  return (
    <Container maxWidth="lg"
                sx={{
                    marginTop: "4rem", margin: "2rem auto", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",
                }}>

                <Typography component="h1" variant="h4"
                    sx={{
                        textAlign: "center", margin: "2rem auto",
                    }}>
                    Your Product's and Services
                </Typography>
                <Paper elevation={10}
                    sx={{
                        margin: " 1rem auto", minHeight: "10vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",
                    }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} sx={{ flexGrow: 1 }}>
                            <Typography component="h1" variant="h4"
                                sx={{
                                    textAlign: "center", margin: "1rem auto",
                                }}>
                                Your Product(s)
                            </Typography>
                            <Paper elevation={10} sx={{ margin: "0.5rem auto" }}>
                                {getUsersProducts && getUsersProducts.map(obj => (
                                    <Card key={obj.id} sx={{ padding: "1rem", margin: "0.5rem auto" }}>
                                        <Typography component="h1" variant="h5" className={show ? styles.show : styles.showHide}  ref={(e)=>getTarget(e)} sx={{position:"relative"}}>
                                            {obj && obj.name}
                                        </Typography>
                                        <CardMedia component="img" image={`${staticImage}/${obj.imageName}`} alt="www.master-connect.ca" height="150px" sx={{ margin: "2rem auto" }} />
                                        <CardContent sx={{ margin: "auto", padding: "0.5rem" }}>
                                            <Typography component="h1" variant="subtitle1">
                                                {obj.desc}
                                            </Typography>
                                            <Stack direction="row" spacing={1}>
                                                <Typography component="h1" variant="h6">
                                                    <span style={{ fontSize: "80%", color: "blue" }}>price:</span><AttachMoneyIcon sx={{ ml: 2, color: "green" }} />{obj.price}.<sup>00</sup>
                                                </Typography>
                                                <Typography component="h1" variant="h6">
                                                    <span style={{ fontSize: "80%", color: "blue" }}> monthly:</span> <AttachMoneyIcon sx={{ ml: 2, color: "green" }} />{obj.monthly}.<sup>00</sup>
                                                </Typography>
                                            </Stack>

                                        </CardContent>
                                    </Card>

                                ))}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ flexGrow: 1 }}>
                            <Typography component="h1" variant="h4"
                                sx={{
                                    textAlign: "center", margin: "auto",
                                }}>
                                Your Service(s)
                            </Typography>
                            <Paper elevation={10} sx={{ margin: "0.5rem auto" }}>
                                {getUsersServices && getUsersServices.map(obj => (
                                    <Card key={obj.id} sx={{ padding: "1rem", margin: "0.5rem auto" }}>
                                        <Typography component="h1" variant="h5" className={show ? styles.show : styles.showHide}  ref={(e)=>getTarget(e)} sx={{position:"relative"}}>
                                            {obj && obj.name}
                                        </Typography>
                                        <CardContent sx={{ margin: "auto", padding: "0.5rem" }}>
                                            <Typography component="h1" variant="subtitle1">
                                                {obj.desc}
                                            </Typography>
                                            <Stack direction="row" spacing={1}>

                                                <Typography component="h1" variant="h6">
                                                    <span style={{ fontSize: "80%", color: "blue" }}>price:</span><AttachMoneyIcon sx={{ ml: 2, color: "green" }} />{obj.price}.<sup>00</sup>
                                                </Typography>
                                                <Typography component="h1" variant="h6">
                                                    <span style={{ fontSize: "80%", color: "blue" }}>monthly:</span> <AttachMoneyIcon sx={{ ml: 2, color: "green" }} />{obj.monthly}.<sup>00</sup>
                                                </Typography>

                                            </Stack>

                                        </CardContent>
                                    </Card>

                                ))}
                            </Paper>
                        </Grid>
                    </Grid>

                </Paper>

            </Container>
  )
}

export default ProductsAndServices