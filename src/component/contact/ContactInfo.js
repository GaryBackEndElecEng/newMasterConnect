import React, { useContext, useEffect, useState } from 'react'
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import { Box, Stack, AppBar, Typography, Grid, Container, Paper } from '@mui/material';
import { ContainerHomeFluid } from '../../styled/Container.styled';
import Styles from './contact.module.css';


const contactInf = [{ id: Math.ceil(Math.random() * 10000), name: "email", value: "masterconnect919@gmail.com" }, { id: Math.ceil(Math.random() * 1000), name: "tel", value: "416-917-5768" }, { id: Math.ceil(Math.random() * 1000), name: "site", value: "www.master-connect.ca" }, { id: Math.ceil(Math.random() * 100), name: "site", value: "www.master-sale.ca" }]

const ContactInfo = () => {
    const theme = useTheme();
  const { staticImage } = useContext(GeneralContext);
  return (
    <Container maxWidth={"md"}>
    <Paper elevation={2}
            sx={{
              margin: "auto", background: theme.palette.common.blueGrey, color: theme.palette.common.light,
              display: "flex", justifyContent: "center", alignItems: "center",
              flexDirection: "column", width: "100%"
            }}
          >
            <Typography component="h1" variant="h2"
              sx={{ fontFamily: "Roboto", margin: "auto", textAlign: "center" }}
            >
              Our Contact Info
            </Typography>
            {contactInf && contactInf.map(obj => (
              <Grid container spacing={1} key={obj.id} sx={{
                margin: "auto", display: "flex", justifyContent: "flex-start", alignItems: "center",
                flexDirection: { xs: "column", sm: "row" }, padding: "1rem"
              }}>

                <Grid item xs={12} md={6} sx={{ margin: "auto", }}>
                  <Typography component={"h1"} variant={"h5"}>{obj.name}:</Typography>
                </Grid>
                <Grid item xs={12} md={6} sx={{ margin: "auto", }}>
                  <Typography component={"h1"} variant={"h5"}>{obj.value}</Typography>
                </Grid>
              </Grid>
            ))
            }
          </Paper>
          </Container>
  )
}

export default ContactInfo